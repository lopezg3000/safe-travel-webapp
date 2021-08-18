
//FUNCTION ALLOWS YOU TO PRESS ENTER AND SEARCH RESULTS

let destinationInputField = document.getElementById('destination');
// console.log(destinationInputField);

destinationInputField.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (e.keyCode === 13) {
        // console.log('enter key pressed');
        document.getElementById('search-button').click()
    }
});

// function getDestinationData() {
//     console.log('hello destination');
// };


const covidUrl = 'https://disease.sh/v3/covid-19/countries/?q=yesterday';

loadInternationalData = function (url) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        let response = this.response;
        if (request.status == 200) {
            displayInternationalData(JSON.parse(request.responseText), 'globalid');
        }
    };
    request.open('GET', url);
    request.send();
}

function displayInternationalData(apiResponse, divid) {
    let gridDiv = document.getElementById(divid);
    gridDiv.innerHTML = '';
    const totalCountries = apiResponse.length;
    console.log("Total countries", totalCountries);

    for (let i = 0; i < totalCountries; i++) {
        console.log(totalCountries);
        const idDivTag = document.createElement("div");
        idDivTag.id = "divId" + i;
        idDivTag.innerHTML = apiResponse[i]["country"];
        gridDiv.appendChild(idDivTag);

    }
}