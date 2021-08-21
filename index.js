

//FUNCTION ALLOWS YOU TO PRESS ENTER AND SEARCH RESULTS

let destinationInputField = document.getElementById('destination');
// console.log(destinationInputField);

destinationInputField.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (e.keyCode === 13) {
        // console.log('enter key pressed');
        document.getElementById('search-button').click();
    } else {

        let value = e.target.value;
        // console.log(covidData);
        displaySwitch(value, displayFilterSearchResults);
    }
});

//DISPLAY OR NOT FUNCTION
function displaySwitch(value, callback) {
    let searchResults = filterCovidData(value);
    // console.log(searchResults);

    if (value !== '') {
        callback(searchResults);
    } else {
        //erases results when input field value is an empty string
        let searchBar = document.getElementById('search-bar');
        searchBar.innerHTML = '';
    }
};

//FILTERS DATA BASED ON SEARCH INPUT

function filterCovidData(value) {
    let searchResults = covidData.filter(object => {
        // console.log(object.country);
        let countryString = object.country.toLowerCase();
        return countryString.includes(value); //might want to do a regex in the future
    });
    return searchResults;
};

//DISPLAYS FILTERED RESULTS UNDERNEATH SEARCH BAR

function displayFilterSearchResults(searchResults) {
    let searchBar = document.getElementById('search-bar');
    searchBar.innerHTML = ''; //erase the previous results

    searchResults.map(item => {

        let filteredResultsDiv = document.createElement('div');
        let filteredResultsDivClassesToAdd = ['bg-light', 'p-2', 'm-0'];
        filteredResultsDiv.classList.add(...filteredResultsDivClassesToAdd); //adds all the classes in the array above
        filteredResultsDiv.addEventListener('click', function () { handleSearchClick(item); }, false); //click event added dynamically to each search result
        searchBar.appendChild(filteredResultsDiv);

        let filteredResults = document.createElement('h5');
        let filteredResultsClassesToAdd = ['text-muted', 'mb-0'];
        filteredResults.classList.add(...filteredResultsClassesToAdd); //adds all the classes in the array above
        filteredResults.innerHTML = item.country;
        filteredResultsDiv.appendChild(filteredResults);
    });

    // console.log('displayFilterSearch Results', searchResults);
};

//REPLACES INPUT VALUE TO THE NAME OF THE COUNTRY WHEN CLICKED
function handleSearchClick(item) {
    // console.log('object: ', item);
    let destination = document.getElementById('destination');
    destination.value = '';
    destination.value = item.country; //new value for input field

    let searchBar = document.getElementById('search-bar');
    searchBar.innerHTML = ''; //erase the previous results

};

// FUNCTION CALLS HTTP REQUEST

function getData() {
    let covidApiEndpoint = 'https://disease.sh/v3/covid-19/countries/?q=yesterday';

    httpRequest(covidApiEndpoint, storeData);
};

//REUSABLE HTTP REQUEST

function httpRequest(url, callback) {
    let request = new XMLHttpRequest();
    // console.log('this is the request: ', request)

    request.onreadystatechange = function () {
        let response = this.response;
        let responseParsed = JSON.parse(response);
        // console.log(responseParsed);

        if (request.status == 200 & request.readyState == 4) {
            callback(responseParsed);

        };
    };
    request.open('GET', url);
    request.send();
};

let covidData = ''; // global variable that stores covid data

function storeData(responseParsed) {
    covidData = responseParsed;
    // console.log(covidData);
};


//FUNCTION CALLS COVID API AND RETURNS A PARSED RESPONSE

loadInternationalData = function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        let response = this.response;
        let responseParsed = JSON.parse(response);

        if (request.status == 200) {
            displayInternationalData(responseParsed);
        }
    };
    request.open('GET', 'https://disease.sh/v3/covid-19/countries/?q=yesterday');
    request.send();
};

//FUNCTION DISPLAYS COUNTRIES

function displayInternationalData(responseParsed) {
    let internationalSection = document.getElementById('international-section');
    internationalSection.innerHTML = '';

    const countriesArrayLength = responseParsed.length;
    // console.log("Total countries", countriesArrayLength);

    for (let i = 0; i < countriesArrayLength; i++) {
        // console.log(countriesArrayLength);
        const div = document.createElement("div");
        div.id = "country" + i;
        div.innerHTML = responseParsed[i].country;
        internationalSection.appendChild(div);
    }
};


