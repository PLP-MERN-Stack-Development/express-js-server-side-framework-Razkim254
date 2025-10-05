# 🛍️ Product API – Full Express.js Project

This is a complete backend API built with **Express.js** for managing a product catalog. It includes full CRUD operations, middleware for logging, authentication, and validation, advanced features like filtering, pagination, and search, and robust error handling. Designed for educational and practical use.

---

## 📁 Project Structure

├── server.js # Main application file ├── .env # Environment variables ├── package.json # Project metadata and dependencies ├── README.md # Project documentation ├── node_modules/ # Installed dependencies

Code

---

## 🧰 Technologies Used

- Node.js
- Express.js
- uuid
- dotenv
- body-parser
- Postman (for testing)

---

## 🚀 Features

- ✅ Full CRUD operations for products
- ✅ Middleware:
  - Request logging
  - API key authentication
  - Product data validation
- ✅ Advanced features:
  - Filtering by category
  - Pagination
  - Search by name
  - Product statistics by category
- ✅ Custom error handling with reusable classes
- ✅ Environment variable support via `.env`
- ✅ Postman-ready for testing

---

## 🛠️ Setup Instructions

### 1. Install Node.js
Ensure Node.js v18 or higher is installed:
```bash
node -v
2. Clone or Create the Project
Use the provided server.js file or clone your repo.

3. Install Dependencies
bash
npm install express body-parser uuid dotenv
4. Create .env File
In the root directory, create a .env file:

env
PORT=3000
API_KEY=your-secret-api-key
You can replace your-secret-api-key with any secure string.

5. Start the Server
bash
node server.js
You should see:

Code
Server is running on http://localhost:3000
🔐 Authentication
Protected routes require an API key in the request header:

Code
x-api-key: your-secret-api-key
This key must match the one defined in your .env file.

📦 API Endpoints
🔹 Public Routes
Method	Endpoint	Description
GET	/	Welcome message
GET	/api/products	List products (supports category, page, limit)
GET	/api/products/:id	Get product by ID
GET	/api/products/search?name=...	Search products by name
GET	/api/products/stats	Get product count by category
🔐 Protected Routes
Method	Endpoint	Description
POST	/api/products	Create a new product
PUT	/api/products/:id	Update an existing product
DELETE	/api/products/:id	Delete a product
🧪 Testing with Postman
1. Open Postman and create a new request
2. Set the method and URL (e.g. GET http://localhost:3000/api/products)
3. For protected routes, add headers:
Code
Key: x-api-key
Value: your-secret-api-key
4. Example POST Body:
json
{
  "name": "Blender",
  "description": "High-speed blender",
  "price": 150,
  "category": "kitchen",
  "inStock": true
}
🧼 Error Handling
Custom error classes:

NotFoundError – for missing resources

ValidationError – for invalid input

Global error middleware ensures consistent JSON responses.

🧠 Advanced Features
🔹 Filtering + Pagination
http
GET /api/products?category=electronics&page=1&limit=2
🔹 Search by Name
http
GET /api/products/search?name=laptop
🔹 Product Statistics
http
GET /api/products/stats
📌 Notes
Data is stored in-memory for simplicity. For production, integrate MongoDB or MySQL.

Error responses follow consistent JSON format with status codes.

You can extend this project with user authentication, database integration, or Swagger documentation.

👨‍💻 Author
M Muracia – Full-stack developer passionate about building secure, scalable APIs and educational tools.under PLP LERNING PROJECT
