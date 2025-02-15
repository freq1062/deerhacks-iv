import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";

const regions = [
  {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Null Island" },
          geometry: {
            type: "Point",
            coordinates: [139.753, 35.6844],
          },
        },
      ],
    },
  },
];

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 139.753, lat: 35.6844 };
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
    });
  }, [tokyo.lng, tokyo.lat, zoom]);

  return <div ref={mapContainer} className="map" />;
}
