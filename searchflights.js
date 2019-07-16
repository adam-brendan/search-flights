const searchFlights = () => {
	const request = require("request")
	const adt = process.argv[2];
	const departureDate = process.argv[3];
	const destination = process.argv[4];
	const origin = process.argv[5];
	const endpoint = `https://desktopapps.ryanair.com/v4/en-gb/availability?ADT=${adt}&CHD=0&DateOut=${departureDate}&Destination=${destination}&FlexDaysOut=2&INF=0&IncludeConnectingFlights=true&Origin=${origin}&RoundTrip=false&TEEN=0&ToUs=AGREED&exists=false`
	const data = require("./data.json");
	data.request.adt = adt;
	data.request.departureDate = departureDate;
	data.request.destination = destination;
	data.request.origin = origin;

	request(endpoint, function(error, response, body) {
		const flightData = JSON.parse(body)
		console.log("FLIGHT DATA", flightData)
		let flightNumber;
		let departTime;
		let arriveTime;
		let price;
		let currency = flightData.currency;
		let datesArray = flightData.trips[0].dates;
		const dateObj = () => {
			let dateObj;
			datesArray.forEach(function(date) {
				if (date.dateOut.split("").slice(0, 10).join("") === departureDate) {
					dateObj = date;
				}
			})
			return dateObj;
		}
		console.log("DATE", dateObj())


	})
}

searchFlights();






// const searchFlights = (data) => {
// 	const currency = data.currency;
// 	const trips = data.trips
// 	const dates = trips[0].dates
// 	const requestedDates = []
// 	dates.forEach(function(date) {
// 		requestedDates.push(date.dateOut)
// 	})
// 	console.log("CURRENCY", currency);
// 	console.log("TRIPS", trips)
// 	console.log("DATES", dates)
// 	console.log("REQUESTED DATES", requestedDates)
// }

// searchFlights(data.valid);

// Flight Number 
// Origin 
// Destination 
// Departure Time 
// Arrival Time 
// Price 
// Currency 

// FR 8859 DUB --> LIS (6/30/2019 9:30:00 --> 6/30/2019 17:05:00) - 11535.32 HUF 