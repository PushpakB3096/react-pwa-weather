import React, { useState } from "react";
import { fetchWeather } from "./api/weather";

import "./App.css";

const App = () => {
  // for storing the search term
  const [query, setQuery] = useState("");

  // for storing the weather data
  const [weather, setWeather] = useState({});

  // for clearing the input box
  const clearInput = () => {
    setQuery("");
  };

  // for making the api call
  const search = async (e) => {
    // only call the API when enter key is pressed
    if (e.key === "Enter") {
      const data = await fetchWeather(query);

      // setting the weather data to be displayed
      setWeather(data);

      // clear the input after we have set the data
      clearInput();
    }
  };

  return (
    <div className="main-container">
      {/* input field for search query */}
      <input
        type="text"
        className="search"
        placeholder="Enter location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />

      {/* weather card */}
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            {/* adds the three letter country name as a superscript */}
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {/* rounds off the temperature and displays it */}
            {Math.round(weather.main.temp)}
            {/* adding the degree symbol as a superscript */}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            {/* adding weather icon from OpenWeatherAPI */}
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
