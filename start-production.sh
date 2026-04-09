#!/bin/bash

# Start the C++ Runtime in the background
echo "Starting C++ Runtime Engine..."
./runtime-binary &

# Wait for a few seconds for gRPC server to initialize
sleep 2

# Start the Node.js Gateway in the foreground
echo "Starting Node.js Gateway..."
cd apps/gateway
node src/index.js
