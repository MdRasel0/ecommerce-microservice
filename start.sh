#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║     🛍️  NeoMart - Microservices E-Commerce Platform  🛍️     ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "🐳 Docker is running..."
echo ""

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: docker-compose not found. Please install docker-compose."
    exit 1
fi

echo "📦 Building and starting all services..."
echo "This may take a few minutes on first run..."
echo ""

# Build and start services
docker-compose up --build -d

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ All services are starting up!"
    echo ""
    echo "⏳ Waiting for services to be ready..."
    sleep 15
    
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                     🎉 SUCCESS! 🎉                           ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
    echo "🌐 Application URLs:"
    echo "   Frontend:         http://localhost:3000"
    echo "   API Gateway:      http://localhost:8080"
    echo "   Product Service:  http://localhost:8081"
    echo "   Order Service:    http://localhost:8082"
    echo "   User Service:     http://localhost:8083"
    echo ""
    echo "📊 Database Ports:"
    echo "   Product DB:       localhost:5432"
    echo "   Order DB:         localhost:5433"
    echo "   User DB:          localhost:5434"
    echo ""
    echo "💡 Quick Start:"
    echo "   1. Open http://localhost:3000 in your browser"
    echo "   2. Create an account by clicking 'Login' > 'Sign up'"
    echo "   3. Run './init-sample-data.sh' to add sample products"
    echo ""
    echo "📝 Useful Commands:"
    echo "   View logs:        docker-compose logs -f"
    echo "   Stop services:    docker-compose down"
    echo "   Restart:          docker-compose restart"
    echo ""
    echo "🔍 Troubleshooting:"
    echo "   If services aren't responding, wait 30 seconds and refresh."
    echo "   Check service health: docker-compose ps"
    echo ""
else
    echo ""
    echo "❌ Failed to start services. Check the logs:"
    echo "   docker-compose logs"
    exit 1
fi
