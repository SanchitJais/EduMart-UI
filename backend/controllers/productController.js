// Product controller

const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');

// Sample mock data for testing
const MOCK_PRODUCTS = [
  { id: 1, title: 'NCERT Mathematics Class 10', price: 149, category: 'books', stock: 200 },
];

// Fetch all products
const getProducts = async (req, res) => {
  try {
    const { _category, _search, page = 1, limit = 20, _minPrice, _maxPrice, _sort } = req.query;
    paginatedResponse(res, 200, 'Products fetched', MOCK_PRODUCTS, { page, limit, total: MOCK_PRODUCTS.length });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Fetch single product by ID
const getProductById = async (req, res) => {
  try {
    const product = MOCK_PRODUCTS.find((p) => p.id === parseInt(req.params.id));
    if (!product) return errorResponse(res, 404, 'Product not found');
    successResponse(res, 200, 'Product fetched', product);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    successResponse(res, 201, 'Product created', { id: Date.now(), ...req.body });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    successResponse(res, 200, 'Product updated', { id: req.params.id, ...req.body });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    successResponse(res, 200, 'Product deleted');
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
