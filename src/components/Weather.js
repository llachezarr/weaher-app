import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    // Function to fetch weather data
    const fetchWeather = async (city) => {
        setError('');
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: city,
                    appid: '8025ea4e09ae8804262971bdf9a4bddc', // Replace with your OpenWeatherMap API key
                    units: 'metric',
                },
            });
            setWeatherData(response.data);
        } catch (err) {
            setError('Error fetching weather data. Please try again.');
            setWeatherData(null);
        }
    };

    // Automatically fetch weather data based on user's location
    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        try {
                            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
                                params: {
                                    lat: latitude,
                                    lon: longitude,
                                    appid: '8025ea4e09ae8804262971bdf9a4bddc', // Replace with your OpenWeatherMap API key
                                    units: 'metric',
                                },
                            });
                            setWeatherData(response.data);
                        } catch (err) {
                            setError('Error fetching weather data based on location.');
                        }
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        setError('Could not retrieve location.');
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };

        getUserLocation();
    }, []);

    const handleFetchWeather = () => {
        if (city) {
            fetchWeather(city);
        }
    };

    return (
        <>
            <div className="rainbow"></div>
            <div className="clouds">
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="raindrop"></div>
                <div className="raindrop"></div>
                <div className="raindrop"></div>
                <div className="raindrop"></div>
                <div className="raindrop"></div>
                <div className="raindrop"></div>
                <div className="raindrop"></div>
                <div className="raindrop"></div>
                <div className="raindrop"></div>
                <div className="raindrop"></div>
            </div>

            <div className="weather-container">
                <h1>Weather App</h1>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleFetchWeather}>Get Weather</button>

                {error && <p className="error">{error}</p>}
                
                {weatherData && (
                    <div className="weather-info">
                        <h2>{weatherData.name}</h2>
                        <p>Temperature: {weatherData.main.temp} °C</p>
                        <p>Weather: {weatherData.weather[0].description}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Weather;
