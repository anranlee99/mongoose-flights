const Flight = require('../models/flight');
const Ticket = require('../models/tickets');

module.exports = {
    index,
    new: newFlight,
    create,
    show
}

function index(req, res){

    Flight.find({}, function(err, flights) {
        //sort by ascending dates
        flights.sort(function(a,b){
            return a.departs-b.departs;
          });
        res.render('flights', {
            title: 'All Flights',
            flights
        })
    })
}
function show(req, res){
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    
    Flight.findById(req.params.id, function(err, flight) {

        let validAirports = ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
        validAirports = validAirports.filter(e => flight.airport !==e)
        Object.values(flight.destination).forEach(dest => validAirports = validAirports.filter(e => e!==dest.airport))
        //sort the arrival dates
        flight.destination.sort(function(a,b){
            return a.arrival-b.arrival;
          });
          Ticket.find({flight: flight._id}, function(err, tickets) {
            // Now you can pass both the flight and tickets in the res.render call
            res.render('flights/show', {
                title: 'Showing Flight',
                flight,
                validAirports,
                departsDate,
                tickets
            });
          });

    });
}

function newFlight(req, res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    
    res.render('flights/new', { departsDate })
}

function create(req, res) {
    for (let key in req.body) {
        if (!req.body[key]) {
            if(key === 'flightNo'){
                req.body[key] = 9999
            } else
            {
                delete req.body[key]
            }
        };
      }
    const flight = new Flight(req.body)
    flight.save(function(err) {
      console.log(flight)
        // if we don't redirect, the new page will be shown
        // with /flights in the address bar
        if(err) {
          console.log(err)
          return res.redirect('/flights/new')
        }
        res.redirect('/flights/new')
    })

}