const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceRequestSchema = new Schema(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    appliance: {
      type: Schema.Types.ObjectId,
      ref: 'Appliance',
    },
    issueSummary: {
      type: String,
      default: "Filled out by Technician",
    },
    requestedDate: {
      type: Date,
    },
    scheduledDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['pending', 'scheduled', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);