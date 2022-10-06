const express = require('express')
const router = express.Router()
// You Do - Require the yet to be created departs controller 
const ticketsCtrl = require('../controllers/tickets')

// You Do - Define the Route below

router.get('/flights/:id/tickets/new', ticketsCtrl.new);
router.post('/:id/tickets/create', ticketsCtrl.create);
router.delete('/:id', ticketsCtrl.delete);
module.exports = router;