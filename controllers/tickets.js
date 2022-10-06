const Tickets = require('../models/tickets');
const Flight = require('../models/flight');

module.exports = {
  new: netTicket,
  create,
  delete: deleteTicket
};

function create(req, res) {
    req.body.flight = req.params.id
  Tickets.create(req.body, function (err, ticket) {
    
    res.redirect(`/flights/${req.params.id}`);
  });
}

function netTicket(req, res) {
    
    res.render('tickets/new', {id: req.params.id})
}

function deleteTicket(req, res) {
    Tickets.deleteOne({flight:req.params.id}, function(err, ticket){
        console.log('line 26', ticket)
    });


    res.redirect(`/flights/${req.params.id}`);
}

