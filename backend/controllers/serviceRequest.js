const ServiceRequest = require("../models/serviceRequest");
const Profile = require("../models/profile");

module.exports = {
  create,
  index,
  show,
  update,
  deleteRequest,
};

async function index(req, res, next) {
  try {
    const requests = await ServiceRequest.find({})
      .populate("profile")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
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
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const request = await ServiceRequest.findById(req.params.id);
    const isOwner = request.profile.equals(req.user.profile);
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(request);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const request = await ServiceRequest.findById(req.params.id);
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
    next(err);
  }
}

async function deleteRequest(req, res, next) {
  try {
    const request = await ServiceRequest.findById(req.params.id);
    const isOwner = request.profile.equals(req.user.profile);
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await request.deleteOne();
    res.json({ message: "Request deleted" });
  } catch (err) {
    next(err);
  }
}
