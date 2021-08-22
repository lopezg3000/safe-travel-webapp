const chartApiUrl = "https://disease.sh/v3/covid-19/historical?lastdays=27";

loadChartData = function(url) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        let response = this.response;
        if (request.status == 200) {
            displayChartData(request.responseText);
        }
    };
    request.open('GET', url);
    request.send();
}

function displayChartData(apiResponse) {
    const data = JSON.parse(apiResponse);

    const countries = data.map(function(elem) {
        return elem.country;
    });
    // console.log(countries)

    const dates = data.map(function(elem) {
        return Object.keys(elem.timeline.cases);
    });
    // console.log(dates);

    const covidCases = data.map(function(elem) {
        return Object.values(elem.timeline.cases);
    });
    // console.log(covidCases);

    const totalCountries   = countries.length;
    // console.log("Total countries", totalCountries);

    for (let i=0; i<totalCountries; i++) {
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates[i],
            datasets: [{
                label: '# of Covid Cases',
                data: covidCases[i],
                backgroundColor: 'transparent',
                borderColor: 'red',
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
}
