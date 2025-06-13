const User = require('../models/user');
const Profile = require('../models/profile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  signUp,
  logIn,
};

async function logIn(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Bad Credentials' });
  }
}

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const profile = await Profile.create({
    user: user._id,
    phone: req.body.phone || '000-000-0000',
    });
    user.profile = profile._id;
    await user.save();
        const token = createJWT(user);
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profile: profile._id,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Duplicate Email' });
  }
}

function createJWT(user) {
  return jwt.sign(
    {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile,
        isAdmin: user.isAdmin
      }
    },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}