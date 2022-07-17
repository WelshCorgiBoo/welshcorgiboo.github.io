const API_KEY = 'fc7c624b1d86597b7117e136e9223924';
const weatherText = document.querySelector('#weather');
const COORDS = 'coords';


function setWeather(lat, lon) {
    fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            const temp = result.main.temp;
            const name = result.name;
            weatherText.innerText = `${temp}℃, ${name}`;
        })
        .catch((err) => {
            console.log(err);
            getCoods();
        });
}


function getCoods() {
    navigator.geolocation.getCurrentPosition((response) => {
        localStorage.setItem(COORDS, JSON.stringify({
            lat: response.coords.latitude,
            lon: response.coords.longitude
        }));
        setWeather(lat, lon);
    });
}


function exe() {
    try {
        const coords = JSON.parse(localStorage.getItem(COORDS));
        if (localStorage.getItem(COORDS) === null) {
            getCoods();
        } else {
            const coords = JSON.parse(localStorage.getItem(COORDS));
            const lat = coords.lat;
            const lon = coords.lon;
            setWeather(lat, lon);
        }
    } catch (err) {} finally {
        weatherText.innerText = 'No Data!';
    }
}

exe();