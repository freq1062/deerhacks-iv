import React, { useState, useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import { usePaths } from "./PathProvider";
import { useUser } from "../context/UserContext";

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

const locations = [
  {
    name: "Speech Bubble",
    // Coordinates are given as [lat, lng] (we’ll swap them later)
    coordinates: [43.548458, -79.66196],
    image: SpeechBubble1,
    completed: false,
  },
  {
    name: "MN Staircase",
    coordinates: [43.551098, -79.665928],
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
    coordinates: [43.54956, -79.662334],
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

export default function Paths() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const deerfield = { lat: 43.549455, lng: -79.66391 };
  const zoom = 14;
  const userLocation = useRef(null);
  maptilersdk.config.apiKey = "1Me6Sm6EB6jsGBjnCEL1";
  const {
    visitedLines,
    setVisitedLines,
    visitedPoints,
    setVisitedPoints,
    unexploredLines,
    setUnexploredLines,
  } = usePaths();
  const [score, setScore] = useState({ total: 0, current: 0 });
  const { user, updateUserLocation } = useUser();

  let allPoints = [];
  let allLines = [];
  let pathList = [];
  let pointList = {};

  useEffect(() => {
    if (map.current) {
      return;
    }

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: deerfield,
      zoom: zoom,
    });

    map.current.on("load", () => {
      // if (map.current) {
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

      // RENDER POIS
      locations.forEach((location) => {
        // Create a custom HTML element for the marker.
        const markerElement = document.createElement("div");
        markerElement.className = "custom-marker";
        markerElement.style.backgroundImage = `url(${location.image})`;
        markerElement.style.width = "50px";
        markerElement.style.height = "50px";
        markerElement.style.backgroundSize = "cover";
        markerElement.style.borderRadius = "50%";
        markerElement.style.border = location.completed
          ? "2px solid lime"
          : "2px solid lime";

        // Create a popup that shows the location's name
        const popupContent = document.createElement("div");
        popupContent.innerHTML = `
          <div>
            <h3>${location.name}</h3>
            <a href="/camera">Go to Camera</a>
          </div>
          `;
        const popup = new maptilersdk.Popup({ offset: 25 }).setDOMContent(
          popupContent
        );

        // Note: The coordinates array is [lat, lng], so we swap the order to [lng, lat]
        new maptilersdk.Marker({ element: markerElement })
          .setLngLat([location.coordinates[1], location.coordinates[0]])
          .setPopup(popup)
          .addTo(map.current);
      });

      // INITIALIZING PATH OBJECT
      const features = map.current.queryRenderedFeatures();
      const pathFeatures = features.filter((feature) =>
        feature.layer.id.includes("Path")
      );
      pathFeatures.forEach((feature) => {
        if (feature.geometry.type === "LineString") {
          let points = feature.geometry.coordinates;
          points.forEach((point) => {
            const distance = Math.sqrt(
              Math.pow(point[1] - 43.549455, 2) +
                Math.pow(point[0] - -79.66391, 2)
            );
            if (distance < 0.0029) {
              allLines.push(points);
              pathList.push([points, Array(points.length).fill(false)]);
              allPoints.push(...feature.geometry.coordinates);
            }
          });
        } else if (feature.geometry.type === "MultiLineString") {
          feature.geometry.coordinates.forEach((subarray) => {
            subarray.forEach((point) => {
              const distance = Math.sqrt(
                Math.pow(point[1] - 43.549455, 2) +
                  Math.pow(point[0] - -79.66391, 2)
              );
              if (distance < 0.0029) {
                allLines.push(subarray);
                pathList.push([subarray, Array(subarray.length).fill(false)]);
                allPoints.push(...subarray);
              }
            });
          });
        }
      });
      pathList = pathList.filter(
        (path, index, self) =>
          index ===
          self.findIndex(
            (p) => JSON.stringify(p[0]) === JSON.stringify(path[0])
          )
      );
      let onlyPathList = pathList.map((path) => path[0]);
      setUnexploredLines(onlyPathList);
      for (var point of allPoints) {
        for (var line of onlyPathList) {
          if (line.includes(point)) {
            if (!pointList[point.toString()]) {
              pointList[point.toString()] = [];
            }
            if (
              !pointList[point.toString()].includes(onlyPathList.indexOf(line))
            ) {
              pointList[point.toString()].push(onlyPathList.indexOf(line));
            }
          }
        }
      }

      navigator.geolocation.watchPosition(
        //Get location of user
        (pos) => {
          const { latitude, longitude } = pos.coords;
          userLocation.current = [latitude, longitude];
        },
        console.error
      );

      //RENDER DEFAULT LINES
      map.current.getStyle().layers.forEach((layer) => {
        // Skip the unexplored paths layer
        if (layer.id === "unexplored-paths-layer") {
          return; // Skip the current iteration if it's the unexplored paths layer
        }
        if (layer.id && layer.type === "line") {
          map.current.setPaintProperty(layer.id, "line-color", "#678fcf");
          map.current.setPaintProperty(layer.id, "line-width", 2);
        }
      });
      setScore({ total: Object.keys(pointList).length, current: 0 });
      setInterval(updateVisitedPaths, 2000);
    });
  }, [zoom]);

  useEffect(() => {
    if (visitedLines.length > 0) {
      const pathGeoJSON = {
        type: "FeatureCollection",
        features: visitedLines.map((path) => ({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: path,
          },
          properties: {},
        })),
      };

      if (user.isLoggedIn) {
        updateUserLocation(score.current);
      }

      const visitedPointsGeoJSON = {
        //idk how to show the points, nothing worked
        type: "FeatureCollection",
        features:
          // visitedPoints.map((point) => ({
          //   type: "Feature",
          //   geometry: {
          //     type: "LineString",
          //     coordinates: point,
          //   },
          //   properties: {},
          // })),

          visitedPoints.map((point) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: point,
            },
          })),
      };

      const unexploredPathsGeoJSON = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "MultiLineString", // Use LineString if you're rendering lines
                coordinates: unexploredLines, // Ensure this is an array of [lng, lat] pairs
              },
            },
          ],
        },
      };

      if (map.current.getSource("visited")) {
        // If the source exists, just update the data
        map.current.getSource("visited").setData(pathGeoJSON);
      } else {
        // Otherwise, add the source and layer
        map.current.addSource("visited", {
          type: "geojson",
          data: pathGeoJSON,
        });
      }

      if (map.current.getSource("visited-source")) {
        map.current.getSource("visited-source").setData(visitedPointsGeoJSON);
      } else {
        map.current.addSource("visited-source", {
          type: "geojson",
          data: visitedPointsGeoJSON,
        });
      }

      if (map.current.getLayer("unexplored-paths-layer")) {
        map.current
          .getSource("unexplored-paths-source")
          .setData(unexploredPathsGeoJSON);
      } else {
        map.current.addSource(
          "unexplored-paths-source",
          unexploredPathsGeoJSON
        );
      }

      map.current.addLayer({
        id: "unexplored-paths-layer",
        type: "line", // Use "line" for paths
        source: "unexplored-paths-source", // Match the source ID
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#ff0000", // Line color
          "line-width": 3, // Line width
        },
      });

      map.current.addLayer({
        id: "visited-points",
        type: "circle",
        source: "visited-points-source",
        paint: {
          "circle-radius": 100,
          "circle-color": "#1c632f",
          "circle-opacity": 0.8,
        },
      });

      map.current.addLayer({
        id: "visited-paths-layer",
        type: "line",
        source: "visited",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#13d470",
          "line-width": 3,
        },
      });

      map.current.on("zoom", () => {
        const zoomLevel = map.current.getZoom();
        const newOpacity = zoomLevel - 14;

        // Update the circle layer properties
        map.current.setPaintProperty(
          `visited-paths-layer`,
          "line-opacity",
          newOpacity
        );
        map.current.setPaintProperty(
          `unexplored-paths-layer`,
          "line-opacity",
          newOpacity
        );
      });
    }
    setScore((prevScore) => ({ ...prevScore, current: visitedPoints.length }));
  }, [unexploredLines, visitedLines, visitedPoints]);

  useEffect(() => {
    console.log(score);
  }, [score]);

  function haversineDistance(coord1, coord2) {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;

    const R = 6371e3; // Radius of the Earth in meters
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in meters
    return distance;
  }

  function updateVisitedPaths() {
    if (!userLocation.current) return;

    const [userLat, userLon] = userLocation.current;
    const nearbyPoints = [];

    Object.keys(pointList).forEach((key) => {
      const distance = haversineDistance(
        // [userLat, userLon],
        [-79.66554522514343, 43.54921296911567],
        key.split(",").map(Number)
      );
      if (distance < 200) {
        nearbyPoints.push({ key, indexes: pointList[key] });
        setVisitedPoints((prevVisitedPoints) => {
          const newPoint = key.split(",").map(Number);

          // Check if the new point already exists in the visitedPoints array
          const pointExists = prevVisitedPoints.some(
            (point) => JSON.stringify(point) === JSON.stringify(newPoint)
          );

          // Only add the point if it's unique
          if (!pointExists) {
            return [...prevVisitedPoints, newPoint];
          } else {
            return prevVisitedPoints; // No change if the point is not unique
          }
        });
      }
    });

    if (nearbyPoints.length === 0) return;
    nearbyPoints.forEach(({ key, indexes }) => {
      indexes.forEach((index) => {
        const [line, visitedArray] = pathList[index];
        let pointIndex = 0;
        for (var i = 0; i < line.length; i++) {
          if (
            // WE HAVE TO USE THIS THING TO COMPARE EQUALITY
            JSON.stringify(key.split(",").map(Number)) ===
            JSON.stringify(line[i])
          ) {
            pointIndex = i;
            break;
          }
        }
        if (pointIndex !== -1 && !visitedArray[pointIndex]) {
          visitedArray[pointIndex] = true;

          if (visitedArray.every((v) => v)) {
            if (!visitedLines.includes(line)) {
              setVisitedLines((prevVisitedLines) => [
                ...prevVisitedLines,
                line,
              ]);
            }
          }
        }
      });
    });
  }

  return <div ref={mapContainer} className="map" />;
}
