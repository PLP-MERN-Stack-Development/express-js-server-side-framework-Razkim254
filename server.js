// ==========================
// Task 1: Express.js Setup
// ==========================

require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// ==========================
// Task 2: RESTful API Routes
// ==========================

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route (Task 1)
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// GET /api/products - List all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET /api/products/:id - Get a specific product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST /api/products - Create a new product
app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update an existing product
app.put('/api/products/:id', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  product.name = name;
  product.description = description;
  product.price = price;
  product.category = category;
  product.inStock = inStock;
  res.json(product);
});

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

// ==========================
// Start the server (Task 1)
// ==========================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;

// TASK 3: Middleware Implementation
// ==========================
// Task 3: Middleware Implementation
// ==========================

// Custom logger middleware
function logger(req, res, next) {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
}
app.use(logger);

// (Already implemented) Middleware to parse JSON request bodies
// app.use(bodyParser.json()); // Already present above

// Authentication middleware
function authenticate(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== 'your-secret-api-key') {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }
  next();
}

// Validation middleware for product creation and update
function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  if (
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof price !== 'number' ||
    typeof category !== 'string' ||
    typeof inStock !== 'boolean'
  ) {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  next();
}

// Apply authentication and validation middleware to protected routes
app.post('/api/products', authenticate, validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', authenticate, validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  product.name = name;
  product.description = description;
  product.price = price;
  product.category = category;
  product.inStock = inStock;
  res.json(product);
});

// ==========================
// Task 4: Error Handling
// ==========================

// Custom error classes
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

// Example usage in a route (sync)
app.get('/api/products/:id', (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// Example usage in a route (async)
app.post('/api/products', authenticate, validateProduct, async (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    // Simulate async operation
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      price,
      category,
      inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// Global error handling middleware (should be after all routes)
app.use((err, req, res, next) => {
  if (err instanceof NotFoundError || err instanceof ValidationError) {
    return res.status(err.status).json({ error: err.message });
  }
  // Default to 500 server error
  res.status(500).json({ error: 'Internal Server Error' });
});

// Task 5: Advanced Features
// Filtering + Pagination
app.get('/api/products', (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;

  let filtered = products;

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + parseInt(limit));

  res.json({
    total: filtered.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginated
  });
});

// Search by Name
app.get('/api/products/search', (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  const results = products.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json({ count: results.length, results });
});

// Product Statistics
app.get('/api/products/stats', (req, res) => {
  const stats = {};

  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });

  res.json({ total: products.length, byCategory: stats });
});

