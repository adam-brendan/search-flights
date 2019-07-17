module.exports = {
	filterDates: (datesArray, departureDate) => {
		let dateObj;
    datesArray.forEach(function(date) {
			if (date.dateOut.split("").slice(0, 10).join("") === departureDate) {
				dateObj = date;
			}
		})
    return dateObj;
	},
	formatDate: (dateArray, timeArray) => {
		let date = [];
		let time = [];
		if (dateArray[5] === "0" && dateArray[8] === "0") {
			date.push(dateArray[6], "/", dateArray[9], "/", dateArray[0], dateArray[1], dateArray[2], dateArray[3])
		} else if (dateArray[5] === "0") {
			date.push(dateArray[6], "/", dateArray[8], dateArray[9], "/", dateArray[0], dateArray[1], dateArray[2], dateArray[3])
		} else if (dateArray[8] === "0") {
			date.push(dateArray[5], dateArray[6], "/", dateArray[9], "/", dateArray[0], dateArray[1], dateArray[2], dateArray[3])
		} else {
			date.push(dateArray[5], dateArray[6], "/", dateArray[8], dateArray[9], "/", dateArray[0], dateArray[1], dateArray[2], dateArray[3])
		}

		if (timeArray[0] === "0") {
			time.push(timeArray[1], timeArray[2], timeArray[3], timeArray[4], timeArray[5], timeArray[6], timeArray[7])
		} else {
			time.push(timeArray[0], timeArray[1], timeArray[2], timeArray[3], timeArray[4], timeArray[5], timeArray[6], timeArray[7])
		}

		return (date.join("") + " " + time.join(""))
	}
}

const dateObj = () => {
    let dateObj;
    datesArray.forEach(function(date) {
        if (date.dateOut.split("").slice(0, 10).join("") === departureDate) {
            dateObj = date;
        }
    })
    return dateObj;
}