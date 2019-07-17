# SearchFlights

### Overview
SearchFlights is a simple command-line API that returns one-way flights from RyanAir based on a given day, origin airport, and destination airport. 

### Installation
To install, simply clone the respository and type ```npm install``` to install all of the required dependencies.

### Using SearchFlights
To use the API, open your terminal and type ```node searchflights.js```. You will be prompted to enter:

1. Number of adults - an integer above 0
2. Departure date - YYYY-MM-DD
3. Origin airport - three-letter airport code
4. Destination airport - three-letter airport code

If you wish to stop the API at any point, simply type ```exit``` for any of the prompts.

Matching flights will be listed chronologically.


### Example
The following is an example query:
1. User types ```node searchflights.js```
2. User sees ```Please input number of adults:```
3. User types ```1```
4. User sees ```Please input departure date:```
5. User types ```2019-08-04```
6. User sees ```Please input origin airport:```
7. User types ```DUB``` (Dublin)
8. User sees ```Please input destination airport:```
9. User types ```BUD``` (Budapest)
10. User sees ```FR 1023 DUB --> BUD (8/4/2019 19:40:00 --> 8/4/2019 23:40:00) - 163.11 EUR```