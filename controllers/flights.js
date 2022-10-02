const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create
}

function index(req, res){
    console.log('new flight called')

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