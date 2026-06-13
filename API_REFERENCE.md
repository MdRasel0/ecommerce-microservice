# API Reference Guide

## Quick Start

All API requests go through the API Gateway at `http://localhost:8080`

## Authentication

Currently, the application uses basic authentication. Store the user object after login and include the user ID in requests.

## Product Service

### Get All Products
```bash
GET /api/products
```
Response:
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "stock": 50,
    "category": "electronics",
    "imageUrl": "https://...",
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
]
```

### Get Product by ID
```bash
GET /api/products/{id}
```

### Search Products
```bash
GET /api/products/search?q=headphones
```

### Get Products by Category
```bash
GET /api/products/category/{category}
```

### Create Product
```bash
POST /api/products
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "stock": 50,
  "category": "electronics",
  "imageUrl": "https://example.com/image.jpg"
}
```

### Update Product
```bash
PUT /api/products/{id}
Content-Type: application/json

{
  "name": "Updated Product",
  "description": "Updated description",
  "price": 89.99,
  "stock": 45,
  "category": "electronics",
  "imageUrl": "https://example.com/image.jpg"
}
```

### Delete Product
```bash
DELETE /api/products/{id}
```

### Update Stock
```bash
PUT /api/products/{id}/stock
Content-Type: application/json

{
  "quantity": 5
}
```

## User Service

### Create User (Register)
```bash
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St, City, State 12345"
}
```

### Login
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St, City, State 12345",
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-01T00:00:00"
}
```

### Get User by ID
```bash
GET /api/users/{id}
```

### Update User
```bash
PUT /api/users/{id}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "New Address"
}
```

## Order Service

### Create Order
```bash
POST /api/orders
Content-Type: application/json

{
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "productName": "Product Name",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "shippingAddress": "123 Main St, City, State 12345"
}
```

Response:
```json
{
  "id": 1,
  "userId": 1,
  "totalAmount": 199.98,
  "status": "PENDING",
  "items": [
    {
      "id": 1,
      "productId": 1,
      "productName": "Product Name",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "shippingAddress": "123 Main St, City, State 12345",
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-01T00:00:00"
}
```

### Get All Orders
```bash
GET /api/orders
```

### Get Order by ID
```bash
GET /api/orders/{id}
```

### Get Orders by User ID
```bash
GET /api/orders/user/{userId}
```

### Update Order Status
```bash
PUT /api/orders/{id}/status
Content-Type: application/json

{
  "status": "CONFIRMED"
}
```

Valid status values:
- `PENDING`
- `CONFIRMED`
- `PROCESSING`
- `SHIPPED`
- `DELIVERED`
- `CANCELLED`

## Error Responses

All services return errors in this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful, no content to return
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication failed
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Testing with cURL

### Complete Example Workflow

1. **Create a user:**
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St"
  }'
```

2. **Login:**
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

3. **Create a product:**
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Awesome Gadget",
    "description": "A really cool gadget",
    "price": 149.99,
    "stock": 100,
    "category": "electronics"
  }'
```

4. **Create an order:**
```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "items": [
      {
        "productId": 1,
        "productName": "Awesome Gadget",
        "quantity": 2,
        "price": 149.99
      }
    ],
    "shippingAddress": "123 Main St"
  }'
```

5. **Check your orders:**
```bash
curl http://localhost:8080/api/orders/user/1
```

## Testing with Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:8080`
3. Create a collection for each service
4. Use environment variables for user ID and tokens (if implementing JWT later)

## Service Health Check

Check if services are running:

```bash
# Product Service
curl http://localhost:8081/api/products

# Order Service
curl http://localhost:8082/api/orders

# User Service
curl http://localhost:8083/api/users

# API Gateway
curl http://localhost:8080/api/products
```
