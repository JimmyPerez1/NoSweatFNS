const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applianceSchema = new Schema(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    modelNumber: {
      type: String,
    },
    serialNumber: {
      type: String,
    },
    installDate: {
      type: Date,
    },
    warrantyExpires: {
      type: Date,
    },
    lastServiced: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Appliance', applianceSchema);