const express = require('express');
const router = express.Router();
const Lineup = require('../models/Lineup');
const auth = require('../middleware/auth');

// Get lineups for a match
router.get('/match/:matchId', async (req, res) => {
  try {
    const lineups = await Lineup.find({ match: req.params.matchId })
      .populate('match')
      .populate('team')
      .populate('players.player')
      .populate('bench')
      .populate('substitutes.player')
      .populate('setByCoach');
    res.json({ success: true, data: lineups });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all lineups
router.get('/', async (req, res) => {
  try {
    const lineups = await Lineup.find()
      .populate('match')
      .populate('team')
      .populate('players.player')
      .populate('bench')
      .populate('setByCoach')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: lineups });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create lineup
router.post('/', auth, async (req, res) => {
  try {
    const lineup = new Lineup({ ...req.body, setByCoach: req.user.id });
    await lineup.save();
    await lineup
      .populate('match')
      .populate('team')
      .populate('players.player')
      .populate('bench')
      .populate('setByCoach');
    res.status(201).json({ success: true, message: 'Lineup created', data: lineup });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update lineup
router.put('/:id', auth, async (req, res) => {
  try {
    let lineup = await Lineup.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('match')
      .populate('team')
      .populate('players.player')
      .populate('bench')
      .populate('setByCoach');
    if (!lineup) {
      return res.status(404).json({ success: false, message: 'Lineup not found' });
    }
    res.json({ success: true, message: 'Lineup updated', data: lineup });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
