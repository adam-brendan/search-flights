const { filterDates, formatDate } = require("./helperfunctions")
const request = require("request")
const readline = require("readline");

const searchFlights = () => {

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	let adt;
	let departureDate;
	let origin;
	let destination;
	let endpoint;

	rl.question("Please input number of adults: ", (answer) => {
		adt = answer;
		rl.question("Please input departure date: ", (answer) => {
			departureDate = answer;
			rl.question("Please input origin airport: ", (answer) => {
				origin = answer;
				rl.question("Please input destination airport: ", (answer) => {
					destination = answer;
					endpoint = `https://desktopapps.ryanair.com/v4/en-gb/availability?ADT=${adt}&CHD=0&DateOut=${departureDate}&Destination=${destination}&FlexDaysOut=2&INF=0&IncludeConnectingFlights=true&Origin=${origin}&RoundTrip=false&TEEN=0&ToUs=AGREED&exists=false`
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
									return availableFlights.forEach(function(flight) {
										console.log(flight)
									});
								}
								
							}
							printFlights();
							// printFlights().forEach(function(flight) {
							// 	return console.log(flight);
							// })
						}
					})
					rl.close();
				});
			});
		});
	});

	

	

	
		

	// if (process.argv.length !== 6) {
	// 	return console.log("Please ensure you have the right number of inputs")
	// }

	// Store input variables
	// const adt = process.argv[2];
	// const departureDate = process.argv[3];
	// const origin = process.argv[4];
	// const destination = process.argv[5];
	// const endpoint = `https://desktopapps.ryanair.com/v4/en-gb/availability?ADT=${adt}&CHD=0&DateOut=${departureDate}&Destination=${destination}&FlexDaysOut=2&INF=0&IncludeConnectingFlights=true&Origin=${origin}&RoundTrip=false&TEEN=0&ToUs=AGREED&exists=false`


		
}

searchFlights();