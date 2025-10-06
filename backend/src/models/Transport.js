const mongoose = require('mongoose');

const transportPassSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    passId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'pending', 'cancelled'],
      default: 'pending',
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    route: {
      type: String,
      trim: true,
    },
    passType: {
      type: String,
      enum: ['monthly', 'quarterly', 'annual', 'daily'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    vehicleNumber: {
      type: String,
      trim: true,
    },
    pickupPoint: {
      type: String,
      trim: true,
    },
    dropPoint: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('TransportPass', transportPassSchema);