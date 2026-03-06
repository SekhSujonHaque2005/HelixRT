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

class RuntimeServiceImpl final : public RuntimeService::Service {

    std::atomic<bool> is_running_{true};
    std::atomic<int> current_threads_{4};

public:

Status StartRuntime(ServerContext* context, const StartRequest* request, StatusResponse* response) override {
    std::cout << "Runtime started with thread count: " << request->thread_count() << std::endl;
    current_threads_ = request->thread_count();
    is_running_ = true;
    response->set_success(true);
    response->set_message("Runtime started successfully");
    return Status::OK;
}

Status StopRuntime(ServerContext* context, const StopRequest* request, StatusResponse* response) override {
    std::cout << "Runtime stopped" << std::endl;
    is_running_ = false;
    response->set_success(true);
    response->set_message("Runtime stopped successfully");
    return Status::OK;
}

Status StreamMetrics(
ServerContext* context,
const StreamRequest* request,
grpc::ServerWriter<RuntimeMetrics>* writer) override {

    while (true) {
        
        if (!is_running_.load()) {
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
            continue;
        }

        RuntimeMetrics metrics;

        metrics.set_runtime_id("runtime-1");
        metrics.set_active_threads(2 + rand() % 6);
        metrics.set_throughput(5 + rand() % 20);
        metrics.set_latency((rand() % 100) / 100.0);
        metrics.set_cpu_usage(10 + rand() % 70);
        metrics.set_timestamp(time(nullptr));

        metrics.set_thread_id(rand() % 4);
        metrics.set_task_id(rand() % 100);

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