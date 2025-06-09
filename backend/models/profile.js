const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema(

  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    addresses: [
      {
      label: { type: String },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      }
    ],
    phone: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    notes: {
      type: String,
    },
    appliances: [{
      type: Schema.Types.ObjectId,
      ref: 'Appliance',
    }],
    documents: [{
      type: Schema.Types.ObjectId,
      ref: 'Document',
    }],
    invoices: [{
      type: Schema.Types.ObjectId,
      ref: 'Invoice',
    }],
    serviceRequests: [{
      type: Schema.Types.ObjectId,
      ref: 'ServiceRequest',
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Profile', profileSchema);