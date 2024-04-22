import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Tasarımı CSS dosyası olarak kullanacağız

const App = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
  
    const handleSearch = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3bf984eae8bd47e717bc49eaf6cae699&units=metric`);
        if (!response.ok) {
          throw new Error('Şehir bulunamadı. Lütfen geçerli bir şehir adı girin.');
        }
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setWeatherData(null);
      }
    };
  
    return (
      <div className="container">
        <div className="header">
          <h1 className="title">iWeather</h1>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="city"
              placeholder="Şehir adı girin"
              className="search-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit" className="search-button">
              Ara
            </button>
          </form>
        </div>
        {error && <div className="error">{error}</div>}
        {weatherData && (
          <div className="weather-details">
            <h2>{weatherData.name}</h2>
            <p>Sıcaklık: {weatherData.main.temp}°C</p>
            <p>Nem: {weatherData.main.humidity}%</p>
            <p>Rüzgar Hızı: {weatherData.wind.speed} m/s</p>
            <p>Hava Durumu: {weatherData.weather[0].description}</p>
            {/* Hava durumu ikonları buraya eklenecek */}
          </div>
        )}
      </div>
    );
  };
  
  export default App;


