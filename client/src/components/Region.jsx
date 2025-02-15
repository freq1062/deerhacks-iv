import React, { useRef, useEffect } from "react";

const fillBlueOptions = { fillColor: "blue" };
const center = [51.505, -0.09];

export default function Map() {
  return (
    <LayerGroup>
      <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
    </LayerGroup>
  );
}
