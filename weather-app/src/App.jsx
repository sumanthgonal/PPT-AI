import { useState, useEffect } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import { getWeatherByCity, getWeatherByCoords, celsiusToFahrenheit } from './services/weatherService';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('C');
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const lastCity = localStorage.getItem('lastSearchedCity');
    const savedFavorites = localStorage.getItem('favoriteCities');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, []);

  const fetchWeather = async (searchCity) => {
    if (!searchCity.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await getWeatherByCity(searchCity);

      const weatherWithBothUnits = {
        ...data,
        temperatureFahrenheit: celsiusToFahrenheit(data.temperature),
        feelsLikeFahrenheit: celsiusToFahrenheit(data.feelsLike)
      };

      setWeather(weatherWithBothUnits);
      localStorage.setItem('lastSearchedCity', searchCity);
      setCity('');
    } catch (err) {
      setError(err.message || 'An error occurred while fetching weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const toggleUnit = () => {
    setUnit(prevUnit => prevUnit === 'C' ? 'F' : 'C');
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoords(latitude, longitude);
          
          const weatherWithBothUnits = {
            ...data,
            temperatureFahrenheit: celsiusToFahrenheit(data.temperature),
            feelsLikeFahrenheit: celsiusToFahrenheit(data.feelsLike)
          };

          setWeather(weatherWithBothUnits);
          localStorage.setItem('lastSearchedCity', data.city);
        } catch (err) {
          setError('Failed to get weather for your location');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  const addToFavorites = (cityName) => {
    if (!favorites.includes(cityName)) {
      const newFavorites = [...favorites, cityName];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (cityName) => {
    const newFavorites = favorites.filter(city => city !== cityName);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
  };

  const isFavorite = (cityName) => favorites.includes(cityName);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <header className="app-header">
          <div className="header-controls">
            <button 
              className="theme-toggle"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <h1 className="app-title">Weather App</h1>
          <p className="app-subtitle">Get real-time weather information for any city</p>
        </header>

        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-container">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name (e.g., London, Tokyo)"
              className="search-input"
              disabled={loading}
            />
            <button
              type="submit"
              className="search-button"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button
              type="button"
              className="location-button"
              onClick={getCurrentLocation}
              disabled={loading}
              title="Get current location weather"
            >
              📍
            </button>
          </div>
        </form>

        {favorites.length > 0 && (
          <div className="favorites-section">
            <h3>Favorite Cities</h3>
            <div className="favorites-list">
              {favorites.map(favCity => (
                <button
                  key={favCity}
                  className="favorite-city"
                  onClick={() => fetchWeather(favCity)}
                  disabled={loading}
                >
                  {favCity}
                  <button
                    className="remove-favorite"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromFavorites(favCity);
                    }}
                  >
                    ×
                  </button>
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {!loading && weather && (
          <WeatherDisplay
            weather={weather}
            unit={unit}
            onToggleUnit={toggleUnit}
            onAddToFavorites={addToFavorites}
            onRemoveFromFavorites={removeFromFavorites}
            isFavorite={isFavorite}
          />
        )}

        {!loading && !weather && !error && (
          <div className="welcome-message">
            <p>👋 Welcome! Enter a city name to get started.</p>
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>Powered by OpenWeatherMap API</p>
      </footer>
    </div>
  );
}

export default App;
