# NeoMart - Microservices E-Commerce Platform

A modern, full-stack e-commerce application built with microservices architecture, featuring React frontend and Java Spring Boot backend services.

## 🏗️ Architecture

### Backend Services (Java Spring Boot)
- **API Gateway** (Port 8080) - Routes requests to appropriate microservices
- **Product Service** (Port 8081) - Manages product catalog and inventory
- **Order Service** (Port 8082) - Handles order processing and communicates with Product Service
- **User Service** (Port 8083) - User authentication and profile management

### Frontend (React)
- **React SPA** (Port 3000) - Modern, responsive UI with brutalist-modern design aesthetic
- State management with React Context
- Axios for API communication
- React Router for navigation

### Infrastructure
- **PostgreSQL** - Separate databases for each microservice
- **Docker & Docker Compose** - Containerization and orchestration
- **Nginx** - Reverse proxy for frontend

## 🚀 Features

### User Features
- Browse product catalog
- Search and filter products by category
- View detailed product information
- Add items to shopping cart
- User registration and authentication
- Place orders
- View order history

### Technical Features
- Microservices architecture with service isolation
- Inter-service communication via REST APIs
- Separate databases per service (Database per Service pattern)
- API Gateway pattern for unified entry point
- Docker containerization for all services
- Responsive, modern UI design

## 📋 Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 2.0+)
- 8GB RAM minimum
- Ports 3000, 8080-8083, 5432-5434 available

## 🛠️ Installation & Deployment

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ecommerce-microservices
```

### 2. Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

This will:
- Build all Java microservices
- Build the React frontend
- Start 3 PostgreSQL databases
- Start all microservices
- Start the API Gateway
- Start the frontend application

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8080
- **Product Service**: http://localhost:8081
- **Order Service**: http://localhost:8082
- **User Service**: http://localhost:8083

## 📊 Database Setup

Databases are automatically created and initialized:
- **productdb** - Port 5432
- **orderdb** - Port 5433
- **userdb** - Port 5434

All use:
- Username: `postgres`
- Password: `postgres`

## ☸️ Kubernetes Deployment (Standalone Database)

The manifests in [`k8s/`](k8s/) deploy the frontend, API gateway, and all three microservices to a cluster, while Postgres runs **standalone** (outside the cluster) — you point the services at it via a ConfigMap.

### Prerequisites
- A running Kubernetes cluster (Minikube, k3s, EKS, etc.) and `kubectl` configured against it
- A standalone Postgres instance reachable from the cluster's nodes
- Docker, to build the service images

### Step 1 — Create the databases on the standalone Postgres instance

One Postgres server hosts three separate databases. Connect to it (e.g. `psql -h <host> -U postgres`) and run:

```sql
CREATE DATABASE productdb;
CREATE DATABASE orderdb;
CREATE DATABASE userdb;
```

### Step 2 — Build the service images

Each Deployment expects an image tagged `:k8s`. Build them from the repo root:

```bash
docker build -t product-service:k8s ./backend/product-service
docker build -t order-service:k8s ./backend/order-service
docker build -t user-service:k8s ./backend/user-service
docker build -t api-gateway:k8s ./backend/api-gateway
docker build -t frontend:k8s ./frontend
```

If your cluster can't see local images (e.g. Minikube), load them in, or push them to a registry the cluster can pull from and update `image:` in the `k8s/2x-*.yaml` files accordingly:

```bash
minikube image load product-service:k8s
minikube image load order-service:k8s
minikube image load user-service:k8s
minikube image load api-gateway:k8s
minikube image load frontend:k8s
```

### Step 3 — Point the manifests at your standalone database

Edit [`k8s/02-db-config.yaml`](k8s/02-db-config.yaml) and replace `DB_HOST` (currently `CHANGE_ME`) with your standalone Postgres host, and `DB_PORT` if it isn't `5432`.

If the standalone instance uses different credentials than the default `postgres`/`postgres`, update [`k8s/01-secrets.yaml`](k8s/01-secrets.yaml) too.

### Step 4 — Apply the manifests, in order

```bash
kubectl apply -f k8s/00-namespace.yaml
kubectl apply -f k8s/01-secrets.yaml
kubectl apply -f k8s/02-db-config.yaml
kubectl apply -f k8s/20-product-service.yaml
kubectl apply -f k8s/21-order-service.yaml
kubectl apply -f k8s/22-user-service.yaml
kubectl apply -f k8s/23-api-gateway.yaml
kubectl apply -f k8s/30-frontend.yaml
kubectl apply -f k8s/40-ingress.yaml
```

Or apply the whole directory at once (kubectl sorts by filename, which matches the numeric prefixes):

```bash
kubectl apply -f k8s/
```

### Step 5 — Verify

```bash
kubectl get pods -n ecommerce
kubectl get svc -n ecommerce
```

All pods should reach `Running`/`Ready`. If a service pod isn't becoming ready, check that it can reach the standalone database:

```bash
kubectl logs -n ecommerce deployment/product-service
```

### Step 6 — Access the application

- Via the Ingress (requires a Traefik ingress controller, matching `ingressClassName: traefik` in [`k8s/40-ingress.yaml`](k8s/40-ingress.yaml)): visit the ingress's external address.
- Or port-forward for a quick local check:

```bash
kubectl port-forward -n ecommerce svc/frontend 3000:80
kubectl port-forward -n ecommerce svc/api-gateway 8080:8080
```

Then open http://localhost:3000.

### Kubernetes Troubleshooting

- **Pods stuck in `CrashLoopBackOff`**: `kubectl logs -n ecommerce <pod-name>` — usually a database connection error, meaning `DB_HOST`/`DB_PORT` in `db-config` is wrong or the standalone DB isn't reachable from the cluster network.
- **`ImagePullBackOff`**: the cluster can't see the `:k8s` images — load/push them as in Step 2.
- **Readiness probe failing**: the service's `/actuator/health/readiness` isn't returning healthy yet — check logs for startup errors, often a database auth or connectivity issue.

## 🧪 Testing the Application

### 1. Create a User Account
1. Navigate to http://localhost:3000
2. Click "Login" in the header
3. Click "Don't have an account? Sign up"
4. Fill in the registration form

### 2. Add Sample Products
You can add products via the Product Service API:

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Headphones",
    "description": "Premium noise-cancelling headphones",
    "price": 299.99,
    "stock": 50,
    "category": "electronics",
    "imageUrl": "https://example.com/headphones.jpg"
  }'
```

Or use tools like Postman to send requests.

### 3. Place an Order
1. Browse products on the home page
2. Click "Add to Cart" on products
3. View your cart
4. Click "Proceed to Checkout"
5. Your order will be created and stock will be updated

## 🔧 Development

### Running Services Individually

#### Backend Services
```bash
# Product Service
cd backend/product-service
mvn spring-boot:run

# Order Service
cd backend/order-service
mvn spring-boot:run

# User Service
cd backend/user-service
mvn spring-boot:run

# API Gateway
cd backend/api-gateway
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## 📁 Project Structure

```
ecommerce-microservices/
├── backend/
│   ├── api-gateway/
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── pom.xml
│   ├── product-service/
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── pom.xml
│   ├── order-service/
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── pom.xml
│   └── user-service/
│       ├── src/
│       ├── Dockerfile
│       └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.js
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
└── docker-compose.yml
```

## 🔌 API Endpoints

### Product Service
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?q={query}` - Search products
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `PUT /api/products/{id}/stock` - Update stock

### Order Service
- `GET /api/orders` - Get all orders
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders/user/{userId}` - Get orders by user
- `POST /api/orders` - Create order
- `PUT /api/orders/{id}/status` - Update order status
- `DELETE /api/orders/{id}` - Delete order

### User Service
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/email/{email}` - Get user by email
- `POST /api/users` - Create user
- `POST /api/users/login` - Login
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## 🛑 Stopping the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clears databases)
docker-compose down -v
```

## 🔍 Troubleshooting

### Services not starting
- Check if ports are already in use: `lsof -i :8080` (Mac/Linux) or `netstat -ano | findstr :8080` (Windows)
- Ensure Docker has enough resources allocated

### Database connection errors
- Wait a few seconds for databases to fully initialize
- Check logs: `docker-compose logs product-db`

### Frontend not loading
- Clear browser cache
- Check if API Gateway is running: `curl http://localhost:8080/api/products`

### Inter-service communication errors
- Ensure all services are on the same Docker network
- Check service logs: `docker-compose logs order-service`

## 📝 Environment Variables

You can customize the application by setting environment variables in `docker-compose.yml`:

```yaml
environment:
  SPRING_DATASOURCE_URL: jdbc:postgresql://product-db:5432/productdb
  SPRING_DATASOURCE_USERNAME: postgres
  SPRING_DATASOURCE_PASSWORD: postgres
```

## 🎨 Design Philosophy

The frontend features a **brutalist-modern aesthetic** with:
- Bold typography (Playfair Display + Montserrat)
- High-contrast dark theme (#0a0a0a background)
- Orange accent color (#ff6b35)
- Generous spacing and dramatic shadows
- Smooth animations and micro-interactions

## 🚧 Future Enhancements

- [ ] JWT-based authentication
- [ ] Payment gateway integration
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Service discovery (Eureka)
- [ ] Circuit breaker (Resilience4j)
- [ ] API documentation (Swagger)
- [ ] Monitoring (Prometheus + Grafana)

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Spring Boot, React, and Docker
