FROM ubuntu:22.04

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    build-essential \
    cmake \
    libgrpc++-dev \
    libprotobuf-dev \
    protobuf-compiler-grpc \
    pkg-config

WORKDIR /app
COPY . .

WORKDIR /app/apps/runtime
RUN mkdir -p build && cd build && cmake .. && make

EXPOSE 50051

CMD ["./build/runtime"]
