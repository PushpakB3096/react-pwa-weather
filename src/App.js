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
      <input
        type="text"
        className="search"
        placeholder="Enter location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
    </div>
  );
};

export default App;
