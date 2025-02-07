# Real-Time Task Management System

This project is a **multi-user real-time task management system** built using **React, Next.js, Node.js, Express, MongoDB, GraphQL, and Socket.IO**.

## Features
- User authentication via **Google OAuth**
- Task creation, assignment, and status updates
- Real-time task status updates via **Socket.IO**
- **Redis-based Pub/Sub** for backend real-time communication
- Status filtering for better task management

---

## **Frontend Setup** (React + Next.js)

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **Yarn** or **npm**

### Installation & Running
```sh
# Navigate to the frontend directory
cd frontend

# Install dependencies
yarn install  # or npm install

# Create an .env file in the frontend directory
cp .env.example .env  # Edit with your API URL

# Run the development server
yarn dev  # or npm run dev
```
### Environment Variables (.env)
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_GRAPHQL_API=http://localhost:5002/graphql
NEXT_PUBLIC_SOCKET_SERVER=http://localhost:5003
NEXTAUTH_URL=http://localhost:3000
```
The app will be available at **http://localhost:3000**.

---

## **Backend Setup** (Node.js + Express + GraphQL)

### Prerequisites
Ensure you have:
- **MongoDB** installed & running
- **Redis** installed & running (for real-time notifications)
- **Node.js** (v16+ recommended)

### Microservices
The backend is divided into three microservices:
1. **User Service** (Handles authentication and user data)
2. **Task Service** (Handles task management operations)
3. **Notification Service** (Manages real-time updates)

Each service must be run separately.

### **1. User Service**
```sh
cd backend/user-service
npm install
npm start
```
- Runs on **http://localhost:5001**

### **2. Task Service**
```sh
cd backend/task-service
npm install
npm start
```
- Runs on **http://localhost:5002**

### **3. Notification Service**
```sh
cd backend/notification-service
npm install
npm start
```
- Runs on **http://localhost:5003**

### **Environment Variables (.env)**
Each service requires an `.env` file. Example for **task-service**:
```env
PORT=5002
MONGO_URI=mongodb://localhost:27017/taskdb
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
```

---

## **Running the Full Stack**
Ensure MongoDB and Redis are running. Then, start:
1. **User Service** (`cd backend/user-service && npm start`)
2. **Task Service** (`cd backend/task-service && npm start`)
3. **Notification Service** (`cd backend/notification-service && npm start`)
4. **Frontend** (`cd frontend && yarn dev`)

Your app is now live at **http://localhost:3000**! 🚀

---

## **GraphQL Playground**
Each service has a GraphQL API accessible via:
- **User Service:** `http://localhost:5001/graphql`
- **Task Service:** `http://localhost:5002/graphql`

Use tools like **Postman** or **GraphQL Playground** to test queries and mutations.

---

## **Socket.IO Real-Time Updates**
- Task updates are published using Redis Pub/Sub
- **Clients receive updates instantly via WebSockets** when a task status changes

---

Crafted with ❤️.