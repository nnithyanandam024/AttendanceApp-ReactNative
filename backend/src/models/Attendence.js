const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'half-day', 'on-leave'],
      default: 'present',
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
    notes: {
      type: String,
      trim: true,
    },
    totalHours: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
attendanceSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);