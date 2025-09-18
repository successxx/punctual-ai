#!/bin/bash

# Generate random ports in the range 40000-50000 to avoid conflicts
PORT=$((40000 + RANDOM % 10000))

echo "🚀 Launching punctual.ai application"
echo "=================================="
echo ""
echo "📍 Application will run on port: $PORT"
echo "🌐 Access the application at: http://localhost:$PORT"
echo ""
echo "Starting services..."
echo ""

# Export port for Next.js
export PORT=$PORT

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Build the application if .next folder doesn't exist
if [ ! -d ".next" ]; then
  echo "🔨 Building application..."
  npm run build
fi

# Start the application
echo "✅ Starting punctual.ai on port $PORT..."
echo ""
echo "Press Ctrl+C to stop the server"
echo "=================================="
npm run dev