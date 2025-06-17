  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const documentSchema = new Schema(
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['Invoice', 'Contract', 'Estimates', 'Warranty', 'WorkOrderForm'],
        required: true,
      },
      invoice: { 
        type: Schema.Types.ObjectId,
        ref: 'Invoice' }
      ,
      url: {
        type: String,
        required: true,
      },
      uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      uploadDate: {
        type: Date,
        default: Date.now,
      },
      notes: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model('Document', documentSchema);