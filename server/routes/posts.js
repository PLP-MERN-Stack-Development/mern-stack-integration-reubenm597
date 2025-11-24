const express = require('express');
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
} = require('../controllers/postsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getAllPosts)
  .post(protect, createPost);

router.route('/search')
  .get(searchPosts);

router.route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route('/:id/comments')
  .post(protect, addComment);

module.exports = router;