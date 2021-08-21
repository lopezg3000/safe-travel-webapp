

//FUNCTION ALLOWS YOU TO PRESS ENTER AND SEARCH RESULTS

let destinationInputField = document.getElementById('destination');
// console.log(destinationInputField);

destinationInputField.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (e.target.keyCode === 13) {
        // console.log('enter key pressed');
        document.getElementById('search-button').click();
    } else {

        let value = e.target.value;
        // console.log(covidData);
        filterCovidData(value, displayFilterSearchResults);
    }
});

//FILTERS DATA BASED ON SEARCH INPUT
function filterCovidData(value, callback) {
    let searchResults = covidData.filter(object => {
        // console.log(object.country);
        let countryString = object.country.toLowerCase();
        return countryString.includes(value); //might want to do a regex in the future
    });
    // console.log(searchResults);

    callback(searchResults);
};

function displayFilterSearchResults(searchResults) {
    console.log('displayFilterSearch Results', searchResults);
}


// FUNCTION CALLS HTTP REQUEST

function getData() {
    let covidApiEndpoint = 'https://disease.sh/v3/covid-19/countries/?q=yesterday';

    httpRequest(covidApiEndpoint, storeData);
}

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

        }
    };
    request.open('GET', url);
    request.send();
}

let covidData = ''; // global variable that stores covid data

function storeData(responseParsed) {
    covidData = responseParsed;
    // console.log(covidData);
}


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


