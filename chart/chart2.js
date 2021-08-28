const countryTextBox = document.getElementById("countryTextBox")
const countryNameContainer = document.getElementById('countryName')
const submitButton = document.getElementById('submitButton')

submitButton.addEventListener('click' ,function() {
    const country = countryTextBox.value
    const vaccineApiUrl = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=all&fullData=false`
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        let response = this.response;
        if (request.status == 200) {
            // console.log(request.responseText);
            displayChartData(request.responseText);
        }
    };
    request.open('GET', vaccineApiUrl);
    request.send();
})
// loadChartData = function(url) {
    
// }

function displayChartData(apiResponse) {
    const data = JSON.parse(apiResponse);
    console.log(data)
    const country = data.country
    console.log(data.country)
    countryNameContainer.innerHTML = country
    console.log(data.timeline)
    const dates = Object.keys(data.timeline)
    const numberVaccinated = Object.values(data.timeline)
    console.log(dates)
    console.log(numberVaccinated)
    // const countries = data.map(function(elem) {
    //     return elem.country;
    // });
    // console.log(countries)

    // const dates = data.map(function(elem) {
    //     return Object.keys(elem.timeline.cases);
    // });
    // console.log(dates);

    // const covidCases = data.map(function(elem) {
    //     return Object.values(elem.timeline.cases);
    // });
    // console.log(covidCases);

    // const totalCountries   = countries.length;
    // console.log("Total countries", totalCountries);

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: '# of Vaccinated People',
                data: numberVaccinated,
                backgroundColor: 'transparent',
                borderColor: '#67a8e5',
                borderWidth: 4
            }]
        },
        options: {
            elements: {
                line: {
                    tension: 0
                }
            },
            scales: {
                y: {
                beginAtZero: true
                }
            }
        }
    });
    }
