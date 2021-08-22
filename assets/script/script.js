function getWeatherInfo() {
    

    console.log("working");
    let lat, lon;
    let cityName = "London"
    let apiKey = "6931e3310fbaabb5b6a7c83dc3e87fa0";
    let queryUrl1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
    let queryUrl0 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    
    fetch(queryUrl0)
    .then(response => {
        if (response.ok) {
            response.json()
                .then(data => {
                    console.log(data);
                    lat = data.coord.lat;
                    lon = data.coord.lon;
                    console.log(lat, lon);
                })
        }
    })
    .catch(error => {

        console.log(error);
    });


    fetch(queryUrl1)
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(data => {
                        console.log(data);
                        renderWeather(data);
                    })
            }
        })
        .catch(error => {

            console.log(error);
        });
}






function renderWeather(weatherData) {

    let weatherArray = [
        {
            day: "0",
            icon: "",
            temp: "",
        },
        {
            day: "1",
            icon: "",
            temp: "",
        },
        {
            day: "2",
            icon: "",
            temp: "",
        },
        {
            day: "3",
            icon: "",
            temp: "",
        },
        {
            day: "4",
            icon: "",
            temp: "",
        }];

    for (let i = 0; i < weatherArray.length; i++) {
        weatherArray[i].icon = weatherData.daily[i].weather["0"].icon;
        weatherArray[i].temp = Math.round(((weatherData.daily[i].temp.day - 273.15) * (9 / 5)) + 32);

        let updateDay = document.getElementById(`day${i}`);
        let updateDate = document.getElementById(`date${i}`);
        let udpateIcon = document.getElementById(`icon${i}`);
        let updateTemp = document.getElementById(`temp${i}`);

        if (i === 0) {
            updateDay.textContent = moment().format('ddd');
            updateDate.textContent = moment().format('M/D');
        }
        else {
            updateDay.textContent = moment().add(i, 'days').format('ddd');
            updateDate.textContent = moment().add(i, 'days').format('M/D');
        }

        udpateIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherArray[i].icon}@2x.png" alt="current weather icon">`;
        updateTemp.textContent = `${weatherArray[i].temp}°F`;
    }

    document.getElementById("weatherCards").style.display = "flex";
    document.getElementById("weatherBtn").style.display = "none";
}
renderWeather()

getWeatherInfo()