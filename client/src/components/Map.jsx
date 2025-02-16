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
    coordinates: [43.560466, -79.650205],
    image: SpeechBubble1,
  },
  {
    name: "MN Staircase",
    coordinates: [43.562466, -79.655205],
    image: MN_Staircase,
  },
];

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lat: 43.550466384801396, lng: -79.66620530968332 };
  const zoom = 14;
  maptilersdk.config.apiKey = "1Me6Sm6EB6jsGBjnCEL1";

  useEffect(() => {
    if (map.current) {
      return;
    }

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
        counter += 1;
        console.log("added source");
      }

      //then add the layer to the map. Display the "null-island" source data

      map.current.on("zoom", () => {
        const zoomLevel = map.current.getZoom();
        const newOpacity = Math.min(0.5, (15 - zoomLevel) / 2); // Opacity decreases as zoom level increases

        // Update the circle layer properties
        for (var i = 0; i < counter; i++) {
          map.current.setPaintProperty(
            `point-${counter}`,
            "circle-opacity",
            newOpacity
          );
        }
      });

      map.current.getStyle().layers.forEach((layer) => {
        // Log all of the layer ids so that we can adjust which get displayed
        // console.log("Layer ids:", layer.id);
        // Only adjust layers that are drawn as lines
        if (layer.id && layer.type === "line") {
          // For larger roads, check for "road" in the ID and set red
          if (layer.id.includes("road") && !layer.id.includes("Path")) {
            map.current.setPaintProperty(layer.id, "line-color", "#FF0000");
          }
          // For smaller paths, check for "path" in the ID and set blue
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
        markerElement.style.border = "2px solid white";

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
