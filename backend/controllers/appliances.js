const Profile = require('../models/profile');
const Appliance = require('../models/appliance');



module.exports = {
  addAppliance,
  getAppliances,
  updateAppliance,
  deleteAppliance
};

async function getAppliances(req, res) {
  try {
    const profileId = req.query.profileId || req.user.profile;

    const appliances = await Appliance.find({ profile: profileId });

    res.json(appliances);
  } catch (err) {
    console.error('Error fetching appliances:', err);
    res.status(500).json({ error: 'Failed to fetch appliances' });
  }
}


async function addAppliance(req, res) {
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
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

async function updateAppliance(req, res) {
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
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

async function deleteAppliance(req, res) {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access only' });
    }

    await Appliance.findByIdAndDelete(req.params.applianceId);

    await Profile.findByIdAndUpdate(req.params.profileId, {
      $pull: { appliances: req.params.applianceId },
    });

    res.json({ message: 'Appliance deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}