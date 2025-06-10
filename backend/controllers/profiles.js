const Profile = require('../models/profile');
const Appliance = require('../models/appliance');
const Document = require('../models/document');
const Invoice = require('../models/invoice');


module.exports = {
  getProfileById,
  updateProfile,
  deleteProfile,
  getAllProfiles,
};


//Get profile 
async function getProfileById(req, res, next) {
  try {
    const isOwner = req.user._id === req.params.id;
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const profile = await Profile.findById(req.params.id)
      .populate('user')
      .populate('appliances')
      .populate('documents')
      .populate('invoices')
      .populate('serviceRequests');

    if (!profile) return res.status(404).json({ error: 'Not found' });

    res.json(profile);
  } catch (err) {
    next(err);
  }
};

// Put update profiles
async function updateProfile(req, res, next) {
  try {
    const isOwner = req.user._id === req.params.id;
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }
    if (req.body.newAddress) {
      const updated = await Profile.findByIdAndUpdate(
        req.params.id,
        { $push: { addresses: req.body.newAddress } },
        { new: true }
      );
      return res.json(updated);
    }
    if (req.body.removeAddressId) {
      const updated = await Profile.findByIdAndUpdate(
        req.params.id,
        { $pull: { addresses: { _id: req.body.removeAddressId } } },
        { new: true }
      );
      return res.json(updated);
    }
     const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete Profile admins only
async function deleteProfile(req, res, next) {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access only' });
    }

    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    next(err);
  }
};

// Get all profiles admins only
async function getAllProfiles(req, res, next) {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access only' });
    }

    const profiles = await Profile.find({})
      .populate('user')
      .populate('appliances')
      .populate('documents')
      .populate('invoices');

    res.json(profiles);
  } catch (err) {
    next(err);
  }
};