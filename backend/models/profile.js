const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema(

  {
    addresses: [
      {
      label: { type: String },
      street: { type: String,},
      city: { type: String,},
      state: { type: String, },
      zip: { type: String, },
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