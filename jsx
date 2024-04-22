import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          'http://api.openweathermap.org/data/2.5/weather?q=Istanbul&appid=3bf984eae8bd47e717bc49eaf6cae699&units=metric'
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data: ', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      <h1>Hava Durumu</h1>
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>{weatherData.main.temp}°C</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
