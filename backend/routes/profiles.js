const express = require('express');
const router = express.Router();

const profilesCtrl = require('../controllers/profiles');
const checkToken = require('../middleware/checkToken');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const requireAdmin = require('../middleware/requireAdmin');

router.use(ensureLoggedIn);
//Clients
router.get('/:id', profilesCtrl.getProfileById);
//admins
router.get('/', requireAdmin, profilesCtrl.getAllProfiles);
router.get('/:id', requireAdmin, profilesCtrl.getProfileById);
router.put('/:id', requireAdmin, profilesCtrl.updateProfile);
router.delete('/:id', requireAdmin, profilesCtrl.deleteProfile);

module.exports = router;