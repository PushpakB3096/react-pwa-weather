import React, { useState } from "react";
import { fetchWeather } from "./api/weather";

import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");

  // for clearing the input box
  const clearInput = () => {
    setQuery("");
  };

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);

      console.log(data);
      // clear the input after we have the data
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
