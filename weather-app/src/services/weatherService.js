const API_KEY = '1cb181e3167847f8214e81f070c8dcdf';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherByCity = async (city) => {
  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else {
        throw new Error('Failed to fetch weather data. Please try again later.');
      }
    }

    const data = await response.json();

    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      weatherCondition: data.weather[0].main,
      weatherDescription: data.weather[0].description,
      weatherIcon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      timestamp: new Date(data.dt * 1000)
    };
  } catch (error) {
    throw error;
  }
};

export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const celsiusToFahrenheit = (celsius) => {
  return Math.round((celsius * 9/5) + 32);
};

export const fahrenheitToCelsius = (fahrenheit) => {
  return Math.round((fahrenheit - 32) * 5/9);
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Location not found. Please try again.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else {
        throw new Error('Failed to fetch weather data. Please try again later.');
      }
    }

    const data = await response.json();

    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      weatherCondition: data.weather[0].main,
      weatherDescription: data.weather[0].description,
      weatherIcon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      timestamp: new Date(data.dt * 1000)
    };
  } catch (error) {
    throw error;
  }
};
