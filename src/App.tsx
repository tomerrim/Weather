import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression,LatLngTuple, Icon } from "leaflet";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import "leaflet/dist/leaflet.css";
import "./App.css";
import LocationMarker from "./components/LocationMarker/LocationMarker";
import MapUpdater from "./components/MapUpdater/MapUpdater";
import SearchBar from "./components/SearchBar/SearchBar";


const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [center, setCenter] = useState<LatLngExpression>([40.7128, -74.0060]);
  const [zoom, setZoom] = useState<number>(2);
  const [markerPosition, setMarkerPosition] = useState<LatLngTuple | null>(null);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const customIcon = new Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
  });

  useEffect(() => {
    fetchWeatherData([40.7128, -74.0060]);
  }, []);

  const fetchWeatherData = async (latLng: LatLngTuple  | null = null, city: string | null = null) => {
  try {
    let response;
    if (latLng) {
      response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latLng[0]}&lon=${latLng[1]}&appid=${API_KEY}&units=metric`
      );
      setMarkerPosition(latLng);
    } else if (city) {
      response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
    } else {
      return;
    }
    setWeatherData(response.data);
    setWeatherData(response.data);
    setCenter([response.data.coord.lat, response.data.coord.lon]);
    setZoom(12);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

  async function handleSubmit(cityName: string) {
  // Fetch the city's coordinates
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`
    );
    if (response.data && response.data.length > 0) {
      const lat = parseFloat(response.data[0].lat);
      const lon = parseFloat(response.data[0].lon);
      const newPosition: LatLngTuple = [lat, lon];

      // Update the marker position
      setMarkerPosition(newPosition);

      // Fetch weather data for the new position
      fetchWeatherData(newPosition);

      // Update the map center
      setCenter(newPosition);
    } else {
      console.error(`Error: No data found for city ${cityName}`);
    }
  } catch (error) {
    console.error(`Error fetching city coordinates: ${error}`);
  }
};

return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <SearchBar onSubmit={(value) => handleSubmit(value)}/>
      <WeatherDisplay weatherData={weatherData} />
      <MapContainer
       center={center} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setPosition={latLng => fetchWeatherData(latLng)} />
        <MapUpdater center={center} zoom={zoom} />
        {markerPosition && <Marker position={markerPosition} icon={customIcon}/>}
      </MapContainer>
    </div>
  );
};

export default App;