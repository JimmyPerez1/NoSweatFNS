const Profile = require('../models/profile');
const Document = require('../models/document');

module.exports = {
  create
};

async function create(req, res) {
  try {
    console.log('Incoming doc request body:', req.body);
    
    const document = await Document.create({
      ...req.body,
      uploadedBy: req.user._id,
    });

    if (!req.body.profile) {
      console.error('No profile ID provided with document upload');
      return res.status(400).json({ error: 'Missing profile ID' });
    }

    await Profile.findByIdAndUpdate(
      req.body.profile,
      { $push: { documents: document._id } }
    );
    console.log('Document created and profile updated');
    res.status(201).json(document);
  } catch (err) {
    console.error('Error creating document:', err);
    res.status(500).json({ error: 'Failed to save document info' });
  }
}