

const covidUrl = 'https://disease.sh/v3/covid-19/countries/?q=yesterday';

loadInternationalData = function(url) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        let response = this.response;
        if (request.status == 200) {
            displayInternationalData(request.responseText);
        }
    };
    request.open('GET', url);
    request.send();
}

function displayInternationalData(apiResponse) {
    const jsonFormat = JSON.parse(apiResponse);
    createGridDivs(jsonFormat);
}

function createGridDivs(jsonData) {
    let gridDiv         = document.getElementById("gridDiv");
    const totalCountries   = jsonData.length;
    // console.log("Total countries", totalCountries);

    for(let i=0; i<totalCountries; i++){
        
        let imageUrl = "";
        if (jsonData[i]['countryInfo']['flag']) {
            imageUrl = jsonData[i]['countryInfo']['flag']
        }

        const imageDiv = document.createElement("img");
        imageDiv.src = imageUrl;
        imageUrl.className = "card-img-top";
        gridDiv.appendChild(imageDiv);
        
        const countryNameDivTag    = document.createElement("h5");
        countryNameDivTag.className = "card-title";
        countryNameDivTag.id   = "h5Id"+i;
        countryNameDivTag.innerHTML = jsonData[i]["country"];
        gridDiv.appendChild(countryNameDivTag);

        const casesPerOneMillionDivTag    = document.createElement("p");
        casesPerOneMillionDivTag.className = "card-text";
        casesPerOneMillionDivTag.id   = "pId"+i;
        casesPerOneMillionDivTag.innerHTML = `Cases Per One Million: ${jsonData[i]["casesPerOneMillion"]}`;
        gridDiv.appendChild(casesPerOneMillionDivTag);

        const todayCasesDivTag    = document.createElement("p");
        todayCasesDivTag.className = "card-text";
        todayCasesDivTag.id   = "pId"+i;
        todayCasesDivTag.innerHTML = `Cases today: ${jsonData[i]["todayCases"]}`;
        gridDiv.appendChild(todayCasesDivTag);

    }
}