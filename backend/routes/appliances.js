const express = require('express');
const router = express.Router();


const applianceCtrl = require('../controllers/appliances');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');


router.get('/', ensureLoggedIn, applianceCtrl.getAppliances);

module.exports = router;