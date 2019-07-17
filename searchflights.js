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
		// console.log("FLIGHT DATA", flightData)
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
		let flightsArray = dateObj().flights;

		const printFlights = () => {
			let availableFlights = [];
			flightsArray.forEach(function(flight) {
				let flightNumber = flight.flightNumber;
				let price;
				let depart;
				let departureDate = [];
				let departureTime = [];
				let arrive;
				let arrivalDate = [];
				let arrivalTime = [];

				if (flight.faresLeft > 0 && adt <= flight.faresLeft) {

					// Departure date
					let departureDateArray = flight.time[0].split("").splice(0, 10)
					if (departureDateArray[5] === "0" && departureDateArray[8] === "0") {
						departureDate.push(departureDateArray[6], "/", departureDateArray[9], "/", departureDateArray[0], departureDateArray[1], departureDateArray[2], departureDateArray[3])
					} else if (departureDateArray[5] === "0") {
						departureDate.push(departureDateArray[6], "/", departureDateArray[8], departureDateArray[9], "/", departureDateArray[0], departureDateArray[1], departureDateArray[2], departureDateArray[3])
					} else if (departureDateArray[8] === "0") {
						departureDate.push(departureDateArray[5], departureDateArray[6], "/", departureDateArray[9], "/", departureDateArray[0], departureDateArray[1], departureDateArray[2], departureDateArray[3])
					} else {
						departureDate.push(departureDateArray[5], departureDateArray[6], "/", departureDateArray[8], departureDateArray[9], "/", departureDateArray[0], departureDateArray[1], departureDateArray[2], departureDateArray[3])
					}

					// Departure time
					let departureTimeArray = flight.time[0].split("").slice(11, 19)
					if (departureTimeArray[0] === "0") {
						departureTime.push(departureTimeArray[1], departureTimeArray[2], departureTimeArray[3], departureTimeArray[4], departureTimeArray[5], departureTimeArray[6], departureTimeArray[7])
					} else {
						departureTime.push(departureTimeArray[0], departureTimeArray[1], departureTimeArray[2], departureTimeArray[3], departureTimeArray[4], departureTimeArray[5], departureTimeArray[6], departureTimeArray[7])
					}
					depart = departureDate.join("") + " " + departureTime.join("")
					// console.log("DEPART FINAL", depart)

					// Arrival date
					let arrivalDateArray = flight.time[1].split("").slice(0, 10)
					if (arrivalDateArray[5] === "0" && arrivalDateArray[8] === "0") {
						arrivalDate.push(arrivalDateArray[6], "/", arrivalDateArray[9], "/", arrivalDateArray[0], arrivalDateArray[1], arrivalDateArray[2], arrivalDateArray[3])
					} else if (arrivalDateArray[5] === "0") {
						arrivalDate.push(arrivalDateArray[6], "/", arrivalDateArray[8], arrivalDateArray[9], "/", arrivalDateArray[0], arrivalDateArray[1], arrivalDateArray[2], arrivalDateArray[3])
					} else if (arrivalDateArray[8] === "0") {
						arrivalDate.push(arrivalDateArray[5], arrivalDateArray[6], "/", arrivalDateArray[9], "/", arrivalDateArray[0], arrivalDateArray[1], arrivalDateArray[2], arrivalDateArray[3])
					} else {
						arrivalDate.push(arrivalDateArray[5], arrivalDateArray[6], "/", arrivalDateArray[8], arrivalDateArray[9], "/", arrivalDateArray[0], arrivalDateArray[1], arrivalDateArray[2], arrivalDateArray[3])
					}

					// Arrival time
					let arrivalTimeArray = flight.time[1].split("").slice(11, 19)
					if (arrivalTimeArray[0] === "0") {
						arrivalTime.push(arrivalTimeArray[1], arrivalTimeArray[2], arrivalTimeArray[3], arrivalTimeArray[4], arrivalTimeArray[5], arrivalTimeArray[6], arrivalTimeArray[7])
					} else {
						arrivalTime.push(arrivalTimeArray[0], arrivalTimeArray[1], arrivalTimeArray[2], arrivalTimeArray[3], arrivalTimeArray[4], arrivalTimeArray[5], arrivalTimeArray[6], arrivalTimeArray[7])
					}

					arrive = arrivalDate.join("") + " " + arrivalTime.join("")
					// console.log("ARRIVE FINAL", arrive)

					price = flight.regularFare.fares[0].amount;
					// console.log(`FARES FOR FLIGHT ${flightNumber}: ${price}`)

					availableFlights.push(`${flightNumber} ${origin} --> ${destination} (${depart} --> ${arrive}) - ${price} ${currency}`)
				} 
			})
			return availableFlights;
		}
		console.log(printFlights());


	})
}

searchFlights();