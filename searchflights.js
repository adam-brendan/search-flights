const { filterDates, formatDate } = require("./helperfunctions")
const request = require("request")

const searchFlights = () => {

	if (process.argv.length !== 6) {
		return console.log("Please ensure you have the right number of inputs")
	}

	// Store input variables
	const adt = process.argv[2];
	const departureDate = process.argv[3];
	const origin = process.argv[4];
	const destination = process.argv[5];
	const endpoint = `https://desktopapps.ryanair.com/v4/en-gb/availability?ADT=${adt}&CHD=0&DateOut=${departureDate}&Destination=${destination}&FlexDaysOut=2&INF=0&IncludeConnectingFlights=true&Origin=${origin}&RoundTrip=false&TEEN=0&ToUs=AGREED&exists=false`


	request(endpoint, function(error, response, body) {
		const flightData = JSON.parse(body)
		let currency = flightData.currency;
		if (flightData.message) {
			return console.log("No flights found")
		} else {
			let datesArray = flightData.trips[0].dates;
			const flightsArray = filterDates(datesArray, departureDate).flights

			const printFlights = () => {
				let availableFlights = [];
				flightsArray.forEach(function(flight) {
					let flightNumber = flight.flightNumber;
					let price;

					if (flight.faresLeft !== 0) {
						
						// Departure date
						let departureDateArray = flight.time[0].split("").splice(0, 10);
						let departureTimeArray = flight.time[0].split("").slice(11, 19);
						let depart = formatDate(departureDateArray, departureTimeArray);

						// Arrival date
						let arrivalDateArray = flight.time[1].split("").slice(0, 10);
						let arrivalTimeArray = flight.time[1].split("").slice(11, 19);
						let arrive = formatDate(arrivalDateArray, arrivalTimeArray);

						price = flight.regularFare.fares[0].amount;

						availableFlights.push(`${flightNumber} ${origin} --> ${destination} (${depart} --> ${arrive}) - ${price} ${currency}`)
					} 
				})
				
				if (availableFlights === undefined || availableFlights.length === 0) {
					return "No flights available"
				} else {
					return availableFlights;
				}
				
			}
			printFlights().forEach(function(flight) {
				return console.log(flight);
			})
		}
	})
}

searchFlights();