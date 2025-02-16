import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./paths.css";

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

export default function Paths() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lat: 43.549455, lng: -79.66391 };
  const zoom = 14;
  const userLocation = useRef(null);
  maptilersdk.config.apiKey = "1Me6Sm6EB6jsGBjnCEL1";

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

      // INITIALIZING PATH OBJECT
      const features = map.current.queryRenderedFeatures();
      const pathFeatures = features.filter((feature) =>
        feature.layer.id.includes("Path")
      );
      pathFeatures.forEach((feature) => {
        if (feature.geometry.type === "LineString") {
          let points = feature.geometry.coordinates;
          console.log(point);
          points.forEach((point) => {
            const distance = Math.sqrt(
              Math.pow(point[1] - 43.549455, 2) +
                Math.pow(point[0] - -79.66391, 2)
            );
            if (distance < 0.0004) {
              //0.0024
              allLines.push(lines);
              pathList.push([lines, Array(lines.length).fill(false)]);
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
              if (distance < 0.0004) {
                allLines.push(subarray);
                pathList.push([subarray, Array(subarray.length).fill(false)]);
                allPoints.push(...subarray);
              }
            });
          });
        }
      });
      console.log(allPoints.length);
      let onlyPathList = pathList.map((path) => path[0]);
      console.log(onlyPathList);
      console.log("PATHLIST:", onlyPathList.length);
      for (var point of allPoints) {
        pointList[point.toString()] = [];
        for (var line of onlyPathList) {
          if (line.includes(point)) {
            if (
              !pointList[point.toString()].includes(onlyPathList.indexOf(line))
            ) {
              pointList[point.toString()].push(onlyPathList.indexOf(line));
            }
          }
        }
      }
      console.log("POINTLIST:", Object.keys(pointList).length);

      navigator.geolocation.watchPosition(
        //Get location of user
        (pos) => {
          const { latitude, longitude } = pos.coords;
          userLocation.current = [latitude, longitude];
        },
        console.error
      );

      let renderPoints = Object.keys(pointList).map((key) =>
        key.split(",").map(Number)
      );

      if (renderPoints.length > 0) {
        map.current.addSource("all-points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: renderPoints.map((point) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: point,
              },
            })),
          },
        });

        map.current.addLayer({
          id: "all-points-layer",
          type: "circle",
          source: "all-points",
          paint: {
            "circle-radius": 6,
            "circle-color": "#ff0000",
            "circle-opacity": 0.8,
          },
        });

        map.current.addSource("test-point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-79.66554522514343, 43.54921296911567], //userLocation.current
                },
              },
            ],
          },
        });
        map.current.addLayer({
          id: "test-point-layer",
          type: "circle",
          source: "test-point",
          paint: {
            "circle-radius": 10,
            "circle-color": "#000000",
            "circle-opacity": 0.8,
          },
        });
      }

      setInterval(updateVisitedPaths, 2000);
    });
  }, [tokyo.lng, tokyo.lat, zoom]);

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
    console.log(userLocation.current);
    console.log(nearbyPoints);

    Object.keys(pointList).forEach((key) => {
      const distance = haversineDistance(
        // [userLat, userLon],
        [-79.66554522514343, 43.54921296911567],
        key.split(",").map(Number)
      );

      if (distance < 1000) {
        // console.log("NEARBY", pointList[key]);
        nearbyPoints.push({ key, indexes: pointList[key] });
      }
    });

    if (nearbyPoints.length === 0) return;

    nearbyPoints.forEach(({ key, indexes }) => {
      indexes.forEach((index) => {
        const [line, visitedArray] = pathList[index];
        let pointIndex = 0;
        for (var i = 0; i < line.length; i++) {
          if (
            Math.abs(line[i][1] - parseFloat(key.split(",")[0])) < 1e-6 &&
            Math.abs(line[i][0] - parseFloat(key.split(",")[1])) < 1e-6
          ) {
            pointIndex = i;
            break;
          }
        }
        if (pointIndex !== -1 && !visitedArray[pointIndex]) {
          visitedArray[pointIndex] = true;

          if (visitedArray.every((v) => v)) {
            const lineKey = line.map((p) => p.join(",")).join("->");
            if (!visitedLines.has(lineKey)) {
              visitedLines.add(lineKey);
              console.log("Completed path:", lineKey);
            }
          }
        }
      });
    });
  }

  return <div ref={mapContainer} className="map" />;
}
