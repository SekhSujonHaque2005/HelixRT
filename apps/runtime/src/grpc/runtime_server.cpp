#include <grpcpp/grpcpp.h>
#include "runtime.grpc.pb.h"
#include <iostream>
#include <thread>

using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::Status;

using helixrt::RuntimeService;
using helixrt::StreamRequest;
using helixrt::RuntimeMetrics;

using helixrt::StartRequest;
using helixrt::StopRequest;
using helixrt::StatusResponse;

#include "../runtime/runtime.hpp"
#include <mutex>
#include <cmath>

class RuntimeServiceImpl final : public RuntimeService::Service {

    std::atomic<bool> is_running_{false};
    std::atomic<int> current_threads_{4};
    std::unique_ptr<Runtime> runtime_;
    std::thread load_generator_;

public:

    ~RuntimeServiceImpl() {
        if (is_running_) {
            is_running_ = false;
        }
        if (load_generator_.joinable()) {
            load_generator_.join();
        }
        if (runtime_) {
            runtime_->stop();
        }
    }

Status StartRuntime(ServerContext* context, const StartRequest* request, StatusResponse* response) override {
    std::cout << "Runtime started with thread count: " << request->thread_count() << std::endl;
    current_threads_ = request->thread_count();
    
    if (runtime_) {
        runtime_->stop();
    }
    
    runtime_ = std::make_unique<Runtime>(current_threads_);
    runtime_->start();
    is_running_ = true;
    
    // Start or restart the load generator
    if (load_generator_.joinable()) {
        is_running_ = false; // signal to stop if already running
        load_generator_.join();
        is_running_ = true;
    }
    
    load_generator_ = std::thread([this]() {
        while (this->is_running_.load()) {
            // keep the queue around 50 tasks to simulate load
            if (this->runtime_->get_queued_tasks() < 50) {
                for (int i = 0; i < 10; ++i) {
                    this->runtime_->submit([this]() {
                        // Simulate work: compute some primes or just busy wait
                        auto start = std::chrono::high_resolution_clock::now();
                        double dummy = 0.0;
                        while (std::chrono::duration<double>(std::chrono::high_resolution_clock::now() - start).count() < 0.05) {
                            dummy += std::sin(dummy + 1.0);
                        }
                    });
                }
            }
            std::this_thread::sleep_for(std::chrono::milliseconds(200));
        }
    });

    response->set_success(true);
    response->set_message("Runtime started successfully");
    return Status::OK;
}

Status StopRuntime(ServerContext* context, const StopRequest* request, StatusResponse* response) override {
    std::cout << "Runtime stopped" << std::endl;
    is_running_ = false;
    
    if (load_generator_.joinable()) {
        load_generator_.join();
    }
    if (runtime_) {
        runtime_->stop();
        runtime_.reset();
    }
    
    response->set_success(true);
    response->set_message("Runtime stopped successfully");
    return Status::OK;
}

Status SetSchedulerMode(ServerContext* context, const helixrt::SetSchedulerRequest* request, StatusResponse* response) override {
    if (runtime_) {
        // Cast protobuf enum to C++ enum class
        auto proto_mode = request->mode();
        Runtime::SchedulerMode cpp_mode = Runtime::SchedulerMode::FIFO;
        
        switch(proto_mode) {
            case helixrt::SchedulerMode::FIFO: cpp_mode = Runtime::SchedulerMode::FIFO; break;
            case helixrt::SchedulerMode::ROUND_ROBIN: cpp_mode = Runtime::SchedulerMode::ROUND_ROBIN; break;
            case helixrt::SchedulerMode::PRIO: cpp_mode = Runtime::SchedulerMode::PRIO; break;
            default: break;
        }
        
        runtime_->set_scheduler_mode(cpp_mode);
        response->set_success(true);
        response->set_message("Scheduler mode updated");
    } else {
        response->set_success(false);
        response->set_message("Runtime is not actively running");
    }
    return Status::OK;
}

Status StreamMetrics(
ServerContext* context,
const StreamRequest* request,
grpc::ServerWriter<RuntimeMetrics>* writer) override {

    auto start_time = std::chrono::steady_clock::now();
    long long last_completed = 0;

    while (true) {
        
        if (!is_running_.load() || !runtime_) {
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
            continue;
        }

        RuntimeMetrics metrics;
        metrics.set_runtime_id("runtime-1");
        
        // Grab true metrics from the runtime
        int active = runtime_->get_running_tasks();
        int queued = runtime_->get_queued_tasks();
        long long completed = runtime_->get_completed_tasks();
        
        metrics.set_active_threads(active);
        
        // Compute rough throughput (tasks per second over the last second)
        long long completed_delta = completed - last_completed;
        last_completed = completed;
        metrics.set_throughput(completed_delta); // per second since we sleep 1s
        
        // Latency and CPU can be simulated for now based on queue size
        metrics.set_latency((queued * 0.05) + 0.1); 
        metrics.set_cpu_usage(std::min(100, active * 25)); // rough estimate
        metrics.set_timestamp(time(nullptr));

        metrics.set_thread_id(rand() % current_threads_);
        metrics.set_task_id(completed % 1000); // just to show progressing task IDs
        
        metrics.set_queued_tasks(queued);
        metrics.set_running_tasks(active);
        metrics.set_completed_tasks(completed);

        writer->Write(metrics);

        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    return Status::OK;
}
};

void RunServer() {

std::string server_address("0.0.0.0:50051");

RuntimeServiceImpl service;

ServerBuilder builder;

builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
builder.RegisterService(&service);

std::unique_ptr<Server> server(builder.BuildAndStart());

std::cout << "Runtime gRPC Server running on " << server_address << std::endl;

server->Wait();
}