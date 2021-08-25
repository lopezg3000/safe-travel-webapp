

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

//FUNCTION GETS THE FIRST ITEM OF THE SEARCH INPUT VALUE AND CONNECTS TO HANDLE RESULT
function handleSearchButtonClick() {
    let value = destinationInputField.value;
    // console.log(value);

    let searchResults = filterCovidData(value);
    let item = searchResults[0]; //should set item to the only item in the array

    handleResult(item);
};

//FUNCTION TO DETERMINE IF FILTER SEARCH RESULTS SHOULD BE DISPLAYED
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
        filteredResultsDiv.addEventListener('click', function () { handleResult(item); }, false); //click event added dynamically to each search result
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
//HANDLES THE RESULT WHEN IT IS CLICKED OR WHEN SEARCH BUTTON IS CLICKED
function handleResult(item) {
    // console.log('object: ', item);
    let destination = document.getElementById('destination');
    destination.value = item.country; //new value for input field

    let searchBar = document.getElementById('search-bar');
    searchBar.innerHTML = ''; //erase the previous results

    displayCountryCard(item);

};

function displayCountryCard(item) {
    let internationalSection = document.getElementById('international-section');
    internationalSection.innerHTML = ''; //erases previous card

    {/* 
<section>
<div class="card mb-3">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div> 
<section
*/}

    let cardMainDiv = document.createElement('div');
    let cardMainDivClassesToAdd = ['card', 'mb-3', 'w-25'];
    cardMainDiv.classList.add(...cardMainDivClassesToAdd); //adds all the classes in the array above
    cardMainDiv.style = 'margin: 20px auto 0'
    internationalSection.appendChild(cardMainDiv);

    let imageTag = document.createElement('img');
    imageTag.src = item.countryInfo.flag;
    let imageTagClassesToAdd = ['card-img-top'];
    imageTag.classList.add(...imageTagClassesToAdd); //adds all the classes in the array above
    cardMainDiv.appendChild(imageTag);

    let cardBodyDiv = document.createElement('div');
    let cardBodyDivClassesToAdd = ['card-body'];
    cardBodyDiv.classList.add(...cardBodyDivClassesToAdd); //adds all the classes in the array above
    cardMainDiv.appendChild(cardBodyDiv);

    let heading = document.createElement('h5');
    let headingClassesToAdd = ['card-title'];
    heading.classList.add(...headingClassesToAdd); //adds all the classes in the array above
    heading.innerHTML = item.country;
    cardBodyDiv.appendChild(heading);

    let cases = document.createElement('p');
    let casesClassesToAdd = ['card-text'];
    cases.classList.add(...casesClassesToAdd); //adds all the classes in the array above
    cases.innerHTML = `Cases: ${item.cases}`;
    cardBodyDiv.appendChild(cases);

    let deaths = document.createElement('p');
    let deathsClassesToAdd = ['card-text'];
    deaths.classList.add(...deathsClassesToAdd); //adds all the classes in the array above
    deaths.innerHTML = `Recovered: ${item.recovered}`;
    cardBodyDiv.appendChild(deaths);

}

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



