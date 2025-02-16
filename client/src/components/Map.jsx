import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";

// Import local images
import SpeechBubble1 from "../assets/SpeechBubble1.jpeg";
import MN_Staircase from "../assets/MN_Staircase.jpg";
import BlindDuck1 from "../assets/BlindDuck1.jpeg";
import CCT_Art from "../assets/CCT_Art.jpg";
import Erindale from "../assets/Erindale.jpeg";
import IB110 from "../assets/IB110.jpg";
import HealthSciences4 from "../assets/HealthSciences4.jpeg";
import IceCreamMachine1 from "../assets/IceCreamMachine1.jpeg";
import Library_Starbucks from "../assets/Library_Starbucks.jpg";
import SmokeTower1 from "../assets/SmokeTower1.jpeg";
import utmdh from "../assets/utmdh.jpeg";



const regions = [
  {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Deerfield Hall" },
          geometry: {
            type: "Point",
            coordinates: [-79.66620530968332, 43.550466384801396],
          },
        },
      ],
    },
  },
];

const locations = [
  {
    name: "Speech Bubble",
    // Coordinates are given as [lat, lng] (we’ll swap them later)
    coordinates: [43.548462, -79.661969],
    image: SpeechBubble1,
    completed: false,
  },
  {
    name: "Maanjiwe nendamowinan staircase",
    coordinates: [43.551170, -79.665823],
    image: MN_Staircase,
    completed: false,
  },
  {
    name: "The Blind Duck",
    coordinates: [43.548823, -79.663893],
    image: BlindDuck1,
    completed: false,
  },
  {
    name: "Found in the Forest (Art)",
    coordinates: [43.549436, -79.662721],
    image: CCT_Art,
    completed: false,
  },
  {
    name: "Erindale",
    coordinates: [43.549719, -79.665687],
    image: Erindale,
    completed: false,
  },
  {
    name: "IB100",
    coordinates: [43.551459, -79.663629],
    image: IB110,
    completed: false,
  },
  {
    name: "The Health Sciences Building",
    coordinates: [43.549560,-79.662334],
    image: HealthSciences4,
    completed: false,
  },
  {
    name: "The CCT Ice Cream Machine",
    coordinates: [43.549579, -79.663302],
    image: IceCreamMachine1,
    completed: false,
  },
  {
    name: "Library Starbucks",
    coordinates: [43.551016, -79.663082],
    image: Library_Starbucks,
    completed: false,
  },
  {
    name: "Smoke Tower",
    coordinates: [43.551823, -79.662266],
    image: SmokeTower1,
    completed: false,
  },
  {
    name: "Deerfield Hall",
    coordinates: [43.550264, -79.666003],
    image: utmdh,
    completed: false,
  },
];

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lat: 43.550466384801396, lng: -79.66620530968332 };
  const zoom = 14;
  maptilersdk.config.apiKey = "1Me6Sm6EB6jsGBjnCEL1";

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      console.log("Map loaded");
      let counter = 0;
      for (const regionData of regions) {
        const sourceId = `region-${counter}`;
        map.current.addSource(sourceId, regionData);
        map.current.addLayer({
          id: `point-${counter}`,
          source: sourceId,
          type: "circle",
          paint: {
            "circle-radius": 10,
            "circle-color": "#007cbf",
            "circle-opacity": 0.5,
          },
        });
        counter++;
        console.log("Added region source");
      }

      map.current.on("zoom", () => {
        const zoomLevel = map.current.getZoom();
        const newOpacity = Math.min(0.5, (15 - zoomLevel) / 2);
        for (let i = 0; i < counter; i++) {
          map.current.setPaintProperty(`point-${i}`, "circle-opacity", newOpacity);
        }
      });

      // Optionally adjust other layer styles
      map.current.getStyle().layers.forEach((layer) => {
        if (layer.id && layer.type === "line") {
          if (layer.id.includes("road") && !layer.id.includes("Path")) {
            map.current.setPaintProperty(layer.id, "line-color", "#FF0000");
          }
          if (layer.id.includes("Path")) {
            map.current.setPaintProperty(layer.id, "line-color", "#0000FF");
          }
        }
      });

      // Add custom markers using local images
      locations.forEach((location) => {
        // Create a custom HTML element for the marker.
        const markerElement = document.createElement("div");
        markerElement.className = "custom-marker";
        markerElement.style.backgroundImage = `url(${location.image})`;
        markerElement.style.width = "50px";
        markerElement.style.height = "50px";
        markerElement.style.backgroundSize = "cover";
        markerElement.style.borderRadius = "50%";
        markerElement.style.border = location.completed ? "2px solid lime" : "2px solid white";
      
        // Create a popup that shows the location's name
        const popup = new maptilersdk.Popup({ offset: 25 }).setText(location.name);
      
        // Note: The coordinates array is [lat, lng], so we swap the order to [lng, lat]
        new maptilersdk.Marker({ element: markerElement })
          .setLngLat([location.coordinates[1], location.coordinates[0]])
          .setPopup(popup)
          .addTo(map.current);
      });
    });
  }, [tokyo.lng, tokyo.lat, zoom]);

  return <div ref={mapContainer} className="map" />;
}
