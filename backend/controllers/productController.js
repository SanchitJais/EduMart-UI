// ============================================================
// Product Controller — CRUD, Search, Filter
// ============================================================

const { successResponse, errorResponse, paginatedResponse } = require('../utils/responseHelper');

// Mock data placeholder (replace with DB queries)
const MOCK_PRODUCTS = [
  { id: 1, title: 'NCERT Mathematics Class 10', price: 149, category: 'books', stock: 200 },
];

// @desc  Get all products (with filter, search, pagination)
// @route GET /api/products
const getProducts = async (req, res) => {
  try {
    const { _category, _search, page = 1, limit = 20, _minPrice, _maxPrice, _sort } = req.query;
    // TODO: Apply filters from DB query
    paginatedResponse(res, 200, 'Products fetched', MOCK_PRODUCTS, { page, limit, total: MOCK_PRODUCTS.length });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// @desc  Get single product by ID
// @route GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = MOCK_PRODUCTS.find((p) => p.id === parseInt(req.params.id));
    if (!product) return errorResponse(res, 404, 'Product not found');
    successResponse(res, 200, 'Product fetched', product);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// @desc  Create new product (Admin)
// @route POST /api/products
const createProduct = async (req, res) => {
  try {
    // TODO: Validate, save to DB
    successResponse(res, 201, 'Product created', { id: Date.now(), ...req.body });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// @desc  Update product (Admin)
// @route PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    // TODO: Find and update in DB
    successResponse(res, 200, 'Product updated', { id: req.params.id, ...req.body });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

// @desc  Delete product (Admin)
// @route DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    // TODO: Soft delete or remove from DB
    successResponse(res, 200, 'Product deleted');
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
