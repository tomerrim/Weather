import { LatLngTuple } from "leaflet";
import { useMapEvents, useMap, useMapEvent } from "react-leaflet";

const LocationMarker: React.FC<{ setPosition: (position: LatLngTuple | null) => void }> = ({ setPosition }) => {
  const map = useMap();
  const eventHandlers = {
    click: () => {
      map.locate();
    },
    locationfound: (e: any) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationerror: (e: any) => {
      console.log(e);
    },
  };

  // Add the click event
  useMapEvent("click", (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
  });

  useMapEvents(eventHandlers);

  return null;
};

export default LocationMarker;