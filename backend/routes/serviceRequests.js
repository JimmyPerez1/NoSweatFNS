const express = require('express');
const router = express.Router({ mergeParams: true }); 

const serviceRequestsCtrl = require('../controllers/serviceRequests');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

router.use(ensureLoggedIn);

router.get('/', serviceRequestsCtrl.index);
router.post('/', serviceRequestsCtrl.create);
router.get('/:id', serviceRequestsCtrl.show);
router.put('/:id', serviceRequestsCtrl.update);
router.delete('/:id', serviceRequestsCtrl.deleteRequest);

module.exports = router;