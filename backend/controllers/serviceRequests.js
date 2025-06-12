const ServiceRequest = require("../models/serviceRequest");
const Profile = require("../models/profile");

module.exports = {
  create,
  index,
  show,
  update,
  deleteRequest,
};

async function index(req, res) {
  try {
    const filter = req.user.isAdmin
      ? {}
      : { profile: req.user.profile };

    const requests = await ServiceRequest.find(filter)
      .populate('profile')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

async function create(req, res) {
  try {
    const request = await ServiceRequest.create({
      ...req.body,
      profile: req.user.profile,
      createdBy: req.user._id,
      status: "pending",
    });
    await Profile.findByIdAndUpdate(req.user.profile, {
      $push: { serviceRequests: request._id },
    });

    res.status(201).json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create service request' });
  }
}

async function show(req, res) {
  try {
    const request = await ServiceRequest.findById(req.params.id).populate('profile');
    const isOwner = request.profile.equals(req.user.profile);
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

async function update(req, res) {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: "Service request not found" });
    }

    const isOwner = request.profile.equals(req.user.profile);
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Not authorized" });
    }
    if (!isAdmin && req.body.status) {
      delete req.body.status;
    }

    const updated = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

async function deleteRequest(req, res) {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: "Service request not found" });
    }

    const isOwner = request.profile.equals(req.user.profile);
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await request.deleteOne();
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
