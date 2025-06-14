const express = require('express');
const router = express.Router();


const applianceCtrl = require('../controllers/appliances');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const requireAdmin = require('../middleware/requireAdmin');




router.get('/:applianceId', requireAdmin, applianceCtrl.getAppliance);