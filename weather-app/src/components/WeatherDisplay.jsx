import { getWeatherIconUrl } from '../services/weatherService';
import './WeatherDisplay.css';

function WeatherDisplay({ weather, unit, onToggleUnit, onAddToFavorites, onRemoveFromFavorites, isFavorite }) {
  if (!weather) return null;

  const temperature = unit === 'C' ? weather.temperature : weather.temperatureFahrenheit;
  const feelsLike = unit === 'C' ? weather.feelsLike : weather.feelsLikeFahrenheit;

  const handleFavoriteToggle = () => {
    if (isFavorite(weather.city)) {
      onRemoveFromFavorites(weather.city);
    } else {
      onAddToFavorites(weather.city);
    }
  };

  return (
    <div className="weather-display">
      <div className="weather-header">
        <div className="city-header">
          <h2 className="city-name">
            {weather.city}, {weather.country}
          </h2>
          <button
            className="favorite-button"
            onClick={handleFavoriteToggle}
            aria-label={isFavorite(weather.city) ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite(weather.city) ? '❤️' : '🤍'}
          </button>
        </div>
        <p className="weather-description">{weather.weatherDescription}</p>
      </div>

      <div className="weather-main">
        <img
          src={getWeatherIconUrl(weather.weatherIcon)}
          alt={weather.weatherCondition}
          className="weather-icon"
        />
        <div className="temperature-container">
          <h1 className="temperature">
            {temperature}°{unit}
          </h1>
          <button
            className="unit-toggle"
            onClick={onToggleUnit}
            aria-label={`Switch to ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
          >
            Switch to °{unit === 'C' ? 'F' : 'C'}
          </button>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">{feelsLike}°{unit}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{weather.windSpeed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Condition</span>
          <span className="detail-value">{weather.weatherCondition}</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
