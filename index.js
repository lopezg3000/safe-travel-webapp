let fakeData = ['Mexico', 'Canada', 'USA', 'Africa'];

//FUNCTION ALLOWS YOU TO PRESS ENTER AND SEARCH RESULTS

let destinationInputField = document.getElementById('destination');
// console.log(destinationInputField);

destinationInputField.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (e.target.keyCode === 13) {
        // console.log('enter key pressed');
        document.getElementById('search-button').click();
    } else {

        //FILTERS DATA BASED ON SEARCH INPUT
        let value = e.target.value;

        let searchResults = fakeData.filter(country =>
            country.toLowerCase().includes(value)
        );
        console.log(searchResults);
    }
});


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


