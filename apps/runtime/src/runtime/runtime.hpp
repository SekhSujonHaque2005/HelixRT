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
    Runtime(int thread_count);
    void start();
    void stop();
    void submit(std::function<void()> task);

private:
    void worker_loop(int id);
    bool steal_task(int thief_id, std::function<void()>& task);
    void metrics_loop();

    int thread_count;

    std::vector<std::thread> workers;
    std::thread metrics_thread;

    std::atomic<bool> running;

    // per-worker queues
    std::vector<std::deque<std::function<void()>>> task_queues;

    // mutex per queue
    std::vector<std::unique_ptr<std::mutex>> queue_mutexes;

    std::atomic<int> active_threads;
    std::atomic<long long> total_tasks_executed;

    std::chrono::steady_clock::time_point start_time;

    std::atomic<int> submit_index;
};