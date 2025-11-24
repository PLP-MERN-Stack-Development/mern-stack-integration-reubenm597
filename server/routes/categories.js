const express = require('express');
const {
  getAllCategories,
  createCategory,
} = require('../controllers/categoriesController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getAllCategories)
  .post(protect, authorize('admin'), createCategory);

module.exports = router;