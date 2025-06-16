const express = require('express');
const router = express.Router();
const documentCtrl = require('../controllers/documents');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

router.post('/', ensureLoggedIn, documentCtrl.create);

module.exports = router;