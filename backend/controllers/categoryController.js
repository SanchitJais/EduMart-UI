// Category controller

const { successResponse, errorResponse } = require('../utils/responseHelper');

const MOCK_CATEGORIES = [
  { id: 1, name: 'Books', slug: 'books', productCount: 120 },
  { id: 2, name: 'Stationery', slug: 'stationery', productCount: 95 },
];

const getCategories = async (req, res) => {
  try {
    successResponse(res, 200, 'Categories fetched', MOCK_CATEGORIES);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

const getCategoryBySlug = async (req, res) => {
  try {
    const cat = MOCK_CATEGORIES.find((c) => c.slug === req.params.slug);
    if (!cat) return errorResponse(res, 404, 'Category not found');
    successResponse(res, 200, 'Category fetched', cat);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

module.exports = { getCategories, getCategoryBySlug };
