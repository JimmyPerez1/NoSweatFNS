const Profile = require('../models/profile');
const Appliance = require('../models/appliance');



module.exports = {
  addAppliance,
  updateAppliance,
  deleteAppliance
};


// admin add appliance
async function addAppliance(req, res, next) {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access only' });
    }
    const appliance = await Appliance.create({
      ...req.body,
      profile: req.params.id,
    });
 await Profile.findByIdAndUpdate(req.params.id, {
      $push: { appliances: appliance._id },
    });

    res.status(201).json(appliance);
  } catch (err) {
    next(err);
  }
};

async function updateAppliance(req, res, next) {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access only' });
    }

    const updated = await Appliance.findByIdAndUpdate(
      req.params.applianceId,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Appliance not found' });

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function deleteAppliance(req, res, next) {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access only' });
    }

    // Delete the appliance
    await Appliance.findByIdAndDelete(req.params.applianceId);

    // Remove reference from profile
    await Profile.findByIdAndUpdate(req.params.profileId, {
      $pull: { appliances: req.params.applianceId },
    });

    res.json({ message: 'Appliance deleted' });
  } catch (err) {
    next(err);
  }
}