#include "runtime.hpp"
#include <iostream>

Runtime::Runtime(int thread_count)
    : thread_count(thread_count),
      running(false),
      active_threads(0),
      total_tasks_executed(0),
      submit_index(0)
{
    task_queues.resize(thread_count);

    for (int i = 0; i < thread_count; i++) {
        queue_mutexes.push_back(std::make_unique<std::mutex>());
    }
}

void Runtime::start() {

    running = true;
    start_time = std::chrono::steady_clock::now();

    for (int i = 0; i < thread_count; i++) {
        workers.emplace_back(&Runtime::worker_loop, this, i);
    }

    metrics_thread = std::thread(&Runtime::metrics_loop, this);
}

void Runtime::submit(std::function<void()> task) {

    int index = submit_index++ % thread_count;

    {
        std::lock_guard<std::mutex> lock(*queue_mutexes[index]);
        task_queues[index].push_back(std::move(task));
    }
}

bool Runtime::steal_task(int thief_id, std::function<void()>& task) {

    for (int i = 0; i < thread_count; i++) {

        if (i == thief_id)
            continue;

        std::lock_guard<std::mutex> lock(*queue_mutexes[i]);

        if (!task_queues[i].empty()) {

            task = std::move(task_queues[i].front());
            task_queues[i].pop_front();

            return true;
        }
    }

    return false;
}

void Runtime::set_scheduler_mode(SchedulerMode mode) {
    current_mode_ = mode;
}

void Runtime::worker_loop(int id) {

    while (running) {

        std::function<void()> task;

        if (current_mode_ == SchedulerMode::ROUND_ROBIN) {
            // For Round Robin, try to steal from everyone including self in a circle
            int start_idx = (id + (total_tasks_executed.load() % thread_count)) % thread_count;
            for (int i = 0; i < thread_count; i++) {
                int target = (start_idx + i) % thread_count;
                std::lock_guard<std::mutex> lock(*queue_mutexes[target]);
                if (!task_queues[target].empty()) {
                    task = std::move(task_queues[target].front());
                    task_queues[target].pop_front();
                    break;
                }
            }
        } else {
            // Default check own queue first
            {
                std::lock_guard<std::mutex> lock(*queue_mutexes[id]);

                if (!task_queues[id].empty()) {
                    if (current_mode_ == SchedulerMode::FIFO) {
                        task = std::move(task_queues[id].front());
                        task_queues[id].pop_front();
                    } else { // PRIO / LIFO
                        task = std::move(task_queues[id].back());
                        task_queues[id].pop_back();
                    }
                }
            }

            if (!task) {
                if (!steal_task(id, task)) {
                    std::this_thread::yield();
                    continue;
                }
            }
        }

        if (!task) {
            std::this_thread::yield();
            continue;
        }

        active_threads++;

        task();

        active_threads--;

        total_tasks_executed++;
    }
}

void Runtime::metrics_loop() {

    while (running) {

        std::this_thread::sleep_for(std::chrono::seconds(1));

        auto now = std::chrono::steady_clock::now();

        double elapsed =
            std::chrono::duration<double>(now - start_time).count();

        double throughput = total_tasks_executed / elapsed;

        std::cout << "\n[METRICS]"
                  << " Active Threads: " << active_threads.load()
                  << " | Total Tasks: " << total_tasks_executed.load()
                  << " | Throughput: " << throughput
                  << " tasks/sec\n";
    }
}

void Runtime::stop() {

    running = false;

    for (auto &worker : workers) {
        if (worker.joinable())
            worker.join();
    }

    if (metrics_thread.joinable())
        metrics_thread.join();
}

int Runtime::get_queued_tasks() {
    int count = 0;
    for (int i = 0; i < thread_count; i++) {
        std::lock_guard<std::mutex> lock(*queue_mutexes[i]);
        count += task_queues[i].size();
    }
    return count;
}

int Runtime::get_running_tasks() const {
    return active_threads.load();
}

long long Runtime::get_completed_tasks() const {
    return total_tasks_executed.load();
}