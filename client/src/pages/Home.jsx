import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Map from "../components/Map.jsx";
// import "leaflet/dist/leaflet.css";
// import "@maptiler/sdk/dist/maptiler-sdk.css";
// import "./map.css";

export default function Home() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h1>Test</h1>
      <Map />
    </div>
  );
}
