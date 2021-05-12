import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";

// the API key is coming from environment variable
const API_KEY = `${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

export const fetchWeather = async (query) => {
  // we only want the data of the response
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: "metric", // can be changed to standard or imperial
      appid: API_KEY,
    },
  });

  return data;
};
