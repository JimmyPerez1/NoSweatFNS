const Profile = require('../models/profile');
const Appliance = require('../models/appliance');
const Document = require('../models/document'); 
const Invoice = require('../models/invoice')
const ServiceRequest = require('../models/serviceRequest')



module.exports = {
  getProfileById,
  updateProfile,
  deleteProfile,
  getAllProfiles,
};


//Get profile 
async function getProfileById(req, res) {
  try {
      const profileId = req.params.profileId?.toString();
      const userProfileId = req.user.profile?.toString();

    const isOwner = userProfileId === profileId;
    const isAdmin = req.user.isAdmin;


    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const profile = await Profile.findById(req.params.profileId)
      .populate('user')
      .populate('appliances')
      // .populate('documents')
      // .populate('invoices')
      .populate('serviceRequests');

    if (!profile) return res.status(404).json({ error: 'Not found' });

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Put update profiles
async function updateProfile(req, res) {
  try {
    const profileId = req.params.profileId?.toString();
    const userProfileId = req.user.profile?.toString();
    const isOwner = userProfileId === profileId;
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }
    if (req.body.newAddress) {
      const updated = await Profile.findByIdAndUpdate(
        req.params.profileId,
        { $push: { addresses: req.body.newAddress } },
        { new: true }
      );
      return res.json(updated);
    }
    if (req.body.removeAddressId) {
      const updated = await Profile.findByIdAndUpdate(
        req.params.profileId,
        { $pull: { addresses: { _id: req.body.removeAddressId } } },
        { new: true }
      );
      return res.json(updated);
    }
     const updated = await Profile.findByIdAndUpdate(req.params.profileId, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Delete Profile admins only
async function deleteProfile(req, res) {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access only' });
    }

    await Profile.findByIdAndDelete(req.params.profileId);
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get all profiles admins only
async function getAllProfiles(req, res) {
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
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
