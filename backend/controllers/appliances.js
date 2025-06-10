const Profile = require('../models/profile');
const Appliance = require('../models/appliance');
const Document = require('../models/document');
const Invoice = require('../models/invoice');


module.exports = {
  addAppliance,
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

