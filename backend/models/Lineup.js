const mongoose = require('mongoose');

const lineupSchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  formation: {
    type: String,
    required: true
  },
  players: [{
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    },
    position: String,
    shirtNumber: Number,
    captain: Boolean,
    role: String
  }],
  bench: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  substitutes: [{
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    },
    replaces: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    },
    minute: Number
  }],
  tactics: String,
  setByCoach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lineup', lineupSchema);
