#pragma once

#include <vector>
#include <thread>
#include <atomic>
#include <functional>
#include <deque>
#include <mutex>
#include <memory>
#include <chrono>

class Runtime {
public:
    Runtime(int start_threads = 2);
    void start();
    void stop();
    void submit(std::function<void()> task);
    
    enum class SchedulerMode { FIFO = 0, ROUND_ROBIN = 1, PRIO = 2 };
    void set_scheduler_mode(SchedulerMode mode);

    int get_queued_tasks();
    int get_running_tasks() const;
    long long get_completed_tasks() const;
    int get_pool_size() const;

private:
    void worker_loop(int id);
    bool steal_task(int thief_id, std::function<void()>& task);
    void metrics_loop();
    void add_worker();
    void remove_worker();

    int min_threads = 2;
    int max_threads = 16;
    std::atomic<int> current_thread_count;

    std::vector<std::thread> workers;
    std::mutex workers_mutex;
    std::thread metrics_loop_thread;

    std::atomic<bool> running;

    // per-worker queues
    std::vector<std::deque<std::function<void()>>> task_queues;

    // mutex per queue
    std::vector<std::unique_ptr<std::mutex>> queue_mutexes;

    std::atomic<int> active_threads;
    std::atomic<long long> total_tasks_executed;

    std::chrono::steady_clock::time_point start_time;

    std::atomic<int> submit_index;
    std::atomic<SchedulerMode> current_mode_{SchedulerMode::FIFO};
};