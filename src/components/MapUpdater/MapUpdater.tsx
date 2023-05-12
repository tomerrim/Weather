import { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";

const MapUpdater: React.FC<{ center: LatLngExpression; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

export default MapUpdater;