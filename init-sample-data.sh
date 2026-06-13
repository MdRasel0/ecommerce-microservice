#!/bin/bash

# Sample Data Initialization Script
# This script populates the database with sample products

echo "🚀 Initializing sample data..."
echo "Waiting for services to be ready..."
sleep 10

API_URL="http://localhost:8080/api"

# Sample Products
echo "📦 Creating sample products..."

# Electronics
curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Noise-Cancelling Headphones",
    "description": "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and exceptional sound quality.",
    "price": 299.99,
    "stock": 45,
    "category": "electronics"
  }'

curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "4K Ultra HD Smart TV 55\"",
    "description": "Stunning 55-inch 4K display with HDR, built-in streaming apps, and voice control.",
    "price": 799.99,
    "stock": 20,
    "category": "electronics"
  }'

curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mechanical Gaming Keyboard",
    "description": "RGB backlit mechanical keyboard with Cherry MX switches, programmable keys, and aluminum frame.",
    "price": 149.99,
    "stock": 60,
    "category": "electronics"
  }'

curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smartphone Pro Max",
    "description": "Latest flagship smartphone with 5G, triple camera system, and all-day battery life.",
    "price": 1099.99,
    "stock": 35,
    "category": "electronics"
  }'

# Fashion
curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Classic Leather Jacket",
    "description": "Genuine leather jacket with quilted lining, perfect for any season. Timeless style.",
    "price": 249.99,
    "stock": 25,
    "category": "fashion"
  }'

curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Designer Sunglasses",
    "description": "Premium polarized sunglasses with UV protection and scratch-resistant lenses.",
    "price": 189.99,
    "stock": 50,
    "category": "fashion"
  }'

curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Running Sneakers Pro",
    "description": "High-performance running shoes with responsive cushioning and breathable mesh upper.",
    "price": 129.99,
    "stock": 80,
    "category": "fashion"
  }'

# Home & Garden
curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smart Coffee Maker",
    "description": "Programmable coffee maker with app control, thermal carafe, and built-in grinder.",
    "price": 179.99,
    "stock": 40,
    "category": "home"
  }'

curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Indoor Plant Collection",
    "description": "Set of 5 easy-care indoor plants perfect for home or office. Includes decorative pots.",
    "price": 89.99,
    "stock": 30,
    "category": "home"
  }'

curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Memory Foam Pillow Set",
    "description": "Premium memory foam pillows (2-pack) with cooling gel and hypoallergenic cover.",
    "price": 69.99,
    "stock": 100,
    "category": "home"
  }'

# Sports
curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Yoga Mat Premium",
    "description": "Extra-thick yoga mat with non-slip surface and carrying strap. Eco-friendly materials.",
    "price": 49.99,
    "stock": 75,
    "category": "sports"
  }'

curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Adjustable Dumbbell Set",
    "description": "Space-saving adjustable dumbbells, 5-52.5 lbs per hand. Perfect for home gym.",
    "price": 299.99,
    "stock": 15,
    "category": "sports"
  }'

# Books
curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "The Art of Software Architecture",
    "description": "Comprehensive guide to modern software architecture patterns and best practices.",
    "price": 54.99,
    "stock": 200,
    "category": "books"
  }'

curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mindfulness for Beginners",
    "description": "Learn meditation and mindfulness techniques for stress reduction and mental clarity.",
    "price": 19.99,
    "stock": 150,
    "category": "books"
  }'

curl -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cooking Masterclass Complete Edition",
    "description": "Professional cooking techniques and recipes from world-renowned chefs. Hardcover.",
    "price": 79.99,
    "stock": 50,
    "category": "books"
  }'

echo ""
echo "✅ Sample data initialization complete!"
echo "🌐 Visit http://localhost:3000 to see the products"
