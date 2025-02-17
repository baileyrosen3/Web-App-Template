const express = require('express');
const router = express.Router();

// Create Post
router.post('/', async (req, res) => {
  try {
    const { title, content, published = false } = req.body;
    const post = await req.prisma.post.create({
      data: {
        title,
        content,
        published
      }
    });
    res.status(201).json(post);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Error creating post' });
  }
});

// Get All Posts
router.get('/', async (req, res) => {
  try {
    const posts = await req.prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(posts);
  } catch (error) {
    console.error('Fetch posts error:', error);
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

// Get Single Post
router.get('/:id', async (req, res) => {
  try {
    const post = await req.prisma.post.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Fetch post error:', error);
    res.status(500).json({ error: 'Error fetching post' });
  }
});

// Update Post
router.put('/:id', async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const post = await req.prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title,
        content,
        published
      }
    });
    res.json(post);
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ error: 'Error updating post' });
  }
});

// Delete Post
router.delete('/:id', async (req, res) => {
  try {
    await req.prisma.post.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Error deleting post' });
  }
});

module.exports = router; 