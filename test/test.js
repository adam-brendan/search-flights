const assert = require("chai").assert;

const { searchFlights } = require("../searchflights")
const { filterDates, formatDate } = require("../helperfunctions") 
const { valid, invalid } = require("./testdata")

const flightData = valid
const datesArray = flightData.trips[0].dates;
const nonMatchingDate = "2019-07-31"
const matchingDate = "2019-07-21"


describe("filterDates testing", () => {
	it("should return an empty array if dates do not match", () => {
		assert.equal(filterDates(datesArray, nonMatchingDate));
	});

	it("should return an array of objects", () => {
		assert.equal(filterDates(datesArray, matchingDate));
	});
});