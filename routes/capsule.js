const express = require('express');
const Capsule = require('../models/Capsule');
const router = express.Router();

// Create Capsule
router.post('/', async (req, res) => {
  const { userId, title, content } = req.body;
  try {
    const capsule = new Capsule({ userId, title, content });
    await capsule.save();
    res.status(201).json(capsule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Capsules
router.get('/:userId', async (req, res) => {
  try {
    const capsules = await Capsule.find({ userId: req.params.userId });
    res.status(200).json(capsules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Capsule
router.delete('/:id', async (req, res) => {
  try {
    await Capsule.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Capsule deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
