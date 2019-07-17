module.exports = {
	filterDates: (datesArray, departureDate) => {
		let dateObj;
    datesArray.forEach(function(date) {
			if (date.dateOut.split("").slice(0, 10).join("") === departureDate) {
				dateObj = date;
			}
		})
    return dateObj;
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