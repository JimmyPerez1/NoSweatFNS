const express = require('express');
const router = express.Router({ mergeParams: true }); 


const profilesCtrl = require('../controllers/profiles');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const requireAdmin = require('../middleware/requireAdmin');

router.use(ensureLoggedIn);
//Clients
router.get('/:profileId', profilesCtrl.getProfileById);
router.put('/:profileId', profilesCtrl.updateProfile);
//admins
router.get('/', requireAdmin, profilesCtrl.getAllProfiles);
router.delete('/:profileId', requireAdmin, profilesCtrl.deleteProfile);

module.exports = router;