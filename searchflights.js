const data = require('./data.js');



const searchFlights = (data) => {
	const currency = data.currency;
	const trips = data.trips
	const dates = trips[0].dates
	const requestedDates = []
	dates.forEach(function(date) {
		requestedDates.push(date.dateOut)
	})
	console.log("CURRENCY", currency);
	console.log("TRIPS", trips)
	console.log("DATES", dates)
	console.log("REQUESTED DATES", requestedDates)
}

searchFlights(data.valid);

// Flight Number 
// Origin 
// Destination 
// Departure Time 
// Arrival Time 
// Price 
// Currency 

// FR 8859 DUB --> LIS (6/30/2019 9:30:00 --> 6/30/2019 17:05:00) - 11535.32 HUF 