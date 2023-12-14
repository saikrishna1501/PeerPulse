// MapView.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Event } from "../../models/event";

interface MapViewProps {
  events: Event[];
}

const MapView: React.FC<MapViewProps> = ({ events }) => {
  return (
    <MapContainer
      center={[42.3601, -71.0589]}
      zoom={10}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {events.map((event) => (
        <Marker
          key={event._id}
          position={[event.latitude, event.longitude]}
          
        >
          <Popup>{event.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
