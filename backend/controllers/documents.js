const Document = require('../models/document');

module.exports = {
  create
};

async function create(req, res) {
  try {
    const document = await Document.create({
      ...req.body,
      uploadedBy: req.user._id, // Optional: track who uploaded it
    });
    res.status(201).json(document);
  } catch (err) {
    console.error('Error creating document:', err);
    res.status(500).json({ error: 'Failed to save document info' });
  }
}