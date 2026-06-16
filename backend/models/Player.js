const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide player name']
  },
  jersey: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    enum: ['GK', 'DF', 'MF', 'FW'],
    required: true
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  height: Number,
  weight: Number,
  pace: { type: Number, min: 0, max: 100 },
  passing: { type: Number, min: 0, max: 100 },
  shooting: { type: Number, min: 0, max: 100 },
  defending: { type: Number, min: 0, max: 100 },
  dribbling: { type: Number, min: 0, max: 100 },
  strength: { type: Number, min: 0, max: 100 },
  isInjured: {
    type: Boolean,
    default: false
  },
  injuryDetails: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Player', playerSchema);
