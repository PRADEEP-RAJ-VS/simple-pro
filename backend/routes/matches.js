const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const auth = require('../middleware/auth');

// Get all matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find().populate('homeTeam').populate('awayTeam').sort({ matchDate: -1 });
    res.json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single match
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate('homeTeam').populate('awayTeam');
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }
    res.json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create match
router.post('/', auth, async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    await match.populate('homeTeam').populate('awayTeam');
    res.status(201).json({ success: true, message: 'Match created', data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update match
router.put('/:id', auth, async (req, res) => {
  try {
    let match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('homeTeam')
      .populate('awayTeam');
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }
    res.json({ success: true, message: 'Match updated', data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
