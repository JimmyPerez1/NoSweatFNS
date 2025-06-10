const express = require('express');
const router = express.Router({ mergeParams: true }); 


const serviceRequestsCtrl = require('../controllers/serviceRequests');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const requireAdmin = require('../middleware/requireAdmin');


router.use(ensureLoggedIn);

// Clients
router.post('/', serviceRequestsCtrl.create);
router.get('/:id', serviceRequestsCtrl.show);
router.put('/:id', serviceRequestsCtrl.update);
router.delete('/:id', serviceRequestsCtrl.deleteRequest);


// Admins
router.get('/', requireAdmin, serviceRequestsCtrl.index);

module.exports = router;