import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function showWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "15b6ba0523386a8a73b38b2440a74dea";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showWeather);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="WeatherSearch">
        <div className="container">
            <form>
                <input
                    type="search"
                    className="search-input"
                    placeholder="Enter a city..."
                    onChange={changeCity}
                />
                <button type="submit" value="Search">Submit</button>
                <button>Current</button>
            </form>
            <div className="weather-info">
                <h1>New York</h1>
                <div>Wednesday 18:55</div>
                <div>Sunny</div>
            </div>
            <div className="big-temp">
                15°C
            </div>
        </div>
    </div>
  );

  if (loaded) {
    return (
        <div className="WeatherSearch">
        <div className="container">
            <form>
                <input
                    type="search"
                    className="search-input"
                    placeholder="Enter a city..."
                    onChange={changeCity}
                />
                <button type="submit" value="Search">Submit</button>
                <button>Current</button>
            </form>
            <div className="weather-info">
                <h1>{city}</h1>
                <div>Wednesday 18:55</div>
                <div>{weather.description}</div>
            </div>
            <div className="big-temp">
            {Math.round(weather.temperature)}°C
            </div>
                
            </div>
        </div>
    );
  } else {
    return form;
  }
}