const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const auth = require('../middleware/auth');

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().populate('team');
    res.json({ success: true, data: players });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get players by team
router.get('/team/:teamId', async (req, res) => {
  try {
    const players = await Player.find({ team: req.params.teamId }).populate('team');
    res.json({ success: true, data: players });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create player
router.post('/', auth, async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    await player.populate('team');
    res.status(201).json({ success: true, message: 'Player created', data: player });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update player
router.put('/:id', auth, async (req, res) => {
  try {
    let player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('team');
    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }
    res.json({ success: true, message: 'Player updated', data: player });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete player
router.delete('/:id', auth, async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }
    res.json({ success: true, message: 'Player deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
