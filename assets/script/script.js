
let lat, lon;

let cityEntryBox = document.querySelector("#citybox");
let citySubmitButton = document.querySelector("#submitbutton");
let cityName = cityEntryBox.value;
citySubmitButton.addEventListener("click", submitCity);
let currentWeather = document.querySelector("#currentWeather");
let forecast = document.querySelector("#forecast");

function getWeatherInfo() {
  console.log("working");
  cityName = cityEntryBox.value

  let apiKey = "6931e3310fbaabb5b6a7c83dc3e87fa0";

  let queryUrl0 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(queryUrl0)
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          lat = data.coord.lat;
          lon = data.coord.lon;
          console.log(lat, lon);
          let queryUrl1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`;

          fetch(queryUrl1)
            .then((response) => {
              if (response.ok) {
                response.json().then((data) => {
                  console.log(data);
                  renderCurrentWeather(data);
                  for(let i = 0; i <5; i++){
                      renderForecast(data.daily[i])
                  }
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function submitCity(event) {
  event.preventDefault();

  getWeatherInfo();
  console.log(cityName);
}

function renderCurrentWeather(data) {
  let h1 = document.createElement("h1");
  let pTagTemp = document.createElement("p");
  h1.innerText = cityName;
  pTagTemp.innerText = `temp: ${data.current.temp}`;
  currentWeather.append(h1, pTagTemp)
}

function renderForecast(data){
    let container = document.createElement('div')
    let pTagTemp = document.createElement('p')
    pTagTemp.innerText = data.temp.day
    container.append(pTagTemp)
    forecast.append(container)
}

submitCity();
