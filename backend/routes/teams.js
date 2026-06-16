const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const auth = require('../middleware/auth');

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('players').populate('coach');
    res.json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single team
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('players').populate('coach');
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }
    res.json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create team
router.post('/', auth, async (req, res) => {
  try {
    const { name, country, formation } = req.body;
    const team = new Team({ name, country, formation, coach: req.user.id });
    await team.save();
    res.status(201).json({ success: true, message: 'Team created', data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update team
router.put('/:id', auth, async (req, res) => {
  try {
    let team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }
    team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Team updated', data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete team
router.delete('/:id', auth, async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }
    res.json({ success: true, message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
