cmake_minimum_required(VERSION 3.15)
project(HelixRT_Runtime)

set(CMAKE_CXX_STANDARD 20)

find_package(Protobuf REQUIRED)

include_directories(
${Protobuf_INCLUDE_DIRS}
../../packages/shared-proto
)

add_executable(runtime
src/main.cpp
src/runtime/runtime.cpp
src/grpc/runtime_server.cpp

../../packages/shared-proto/runtime.pb.cc
../../packages/shared-proto/runtime.grpc.pb.cc
)

target_link_libraries(runtime
grpc++
grpc
protobuf
pthread
)