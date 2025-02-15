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
          properties: { name: "UTM" },
          geometry: {
            type: "Point",
            coordinates: [-79.66391, 43.549455],
          },
        },
      ],
    },
  },
];

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lat: 43.549455, lng: -79.66391 };
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
            "circle-radius": 100,
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
        const newOpacity = Math.min(0.5, (15 - zoomLevel) / 2);

        // Update the circle layer properties
        for (var i = 0; i < counter; i++) {
          map.current.setPaintProperty(
            `point-${i}`,
            "circle-opacity",
            newOpacity
          );
        }
      });

      const features = map.current.queryRenderedFeatures();
      const pathFeatures = features.filter((feature) =>
        feature.layer.id.includes("Path")
      );
      let allPoints = [];
      pathFeatures.map((feature) => {
        for (var subarray of feature.geometry.coordinates) {
          for (var point of subarray) {
            allPoints.push(point);
          }
        }
      });
      let allObjects = [];
      let count = 0;
      for (var point of allPoints) {
        let data = {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: point,
                },
              },
            ],
          },
        };
        allObjects.push(data);
        map.current.addSource(`point${count}`, data);
        count += 1;
      }
      console.log(allObjects);
      for (var i = 0; i < count; i++) {
        map.current.addLayer({
          id: `point-${i}`,
          type: "circle",
          source: `point${i}`,
          paint: {
            "circle-radius": 8, // Size of the point
            "circle-color": "#ff0000", // Red color
            "circle-opacity": 0.8, // Slight transparency
          },
        });
      }

      let one = true;
      // map.current.getStyle().layers.forEach((layer) => {
      //   if (layer.id && layer.type === "line") {
      //     if (one) {
      //       console.log(layer);
      //       one = false;
      //     }
      //     // For larger roads, check for "road" in the ID and set red
      //     if (layer.id.includes("road") && !layer.id.includes("Path")) {
      //       map.current.setPaintProperty(layer.id, "line-color", "#FF0000");
      //     }
      //     // For smaller paths, check for "path" in the ID and set blue
      //     if (layer.id.includes("Path")) {
      //       map.current.setPaintProperty(layer.id, "line-color", "#0000FF");
      //     }
      //   }
      // });
    });
  }, [tokyo.lng, tokyo.lat, zoom]);

  return <div ref={mapContainer} className="map" />;
}
