import { weatherIcons } from "../../icons/weatherIcons";
import styles from "./WeatherDisplay.module.css";

interface WeatherDisplayProps {
  weatherData: any;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {

  const weatherIcon = weatherData && weatherData.weather && weatherData.weather.length > 0 ? weatherIcons[weatherData.weather[0].icon] : "";

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className="container">
      <div className={styles.weatherDisplay}>
        <h2>{weatherData.name}</h2>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Feels like: {weatherData.main.feels_like}°C</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind speed: {weatherData.wind.speed} m/s</p>
        <p>Weather description: {weatherData.weather[0].description}</p>
      </div>
      <div className="weatherIcon">
        <img src={weatherIcon} alt="Weather Icon" />
      </div>
    </div>
  );
};

export default WeatherDisplay;