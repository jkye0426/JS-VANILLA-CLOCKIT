const weather = document.querySelector(".js-weather");

const API_KEY = "c97f167a7009fa878409ec5863ca7f76";
const COORDS = "coords";

function getWeather (lat,lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function (response) {
        return response.json();
    }).then (function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`
    });

}

function saveCoords (coordsobj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsobj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsobj = {
        latitude,
        longitude
    };
    saveCoords(coordsobj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log(`can't access geo location`)
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}




function init() {
    loadCoords();
}

init() ;