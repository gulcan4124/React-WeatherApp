import React, { useState, useEffect } from 'react';
import axios from 'axios';


const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3bf984eae8bd47e717bc49eaf6cae699&units=metric`
        );
        setWeatherData(response.data);
        setError(null);
      } catch (error) {
        setError('Şehir bulunamadı. Lütfen geçerli bir şehir adı girin.');
        setWeatherData(null);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
  };

  const renderWeatherData = () => {
    if (error) {
      return <div>{error}</div>;
    }

    if (!weatherData) {
      return null;
    }

    return (
      <div>
        <h2>{weatherData.name}</h2>
        <p>Sıcaklık: {weatherData.main.temp}°C</p>
        <p>Nem: {weatherData.main.humidity}%</p>
        <p>Rüzgar Hızı: {weatherData.wind.speed} m/s</p>
        <p>Hava Durumu: {weatherData.weather[0].description}</p>
        {/* İkonları burada göstermek için gerekli kodu ekleyin */}
      </div>
    );
  };

  return (
    <div>
      <h1>Hava Durumu Uygulaması</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="city" placeholder="Şehir adı girin" />
        <button type="submit">Ara</button>
      </form>
      {renderWeatherData()}
    </div>
  );
};

export default WeatherApp;

