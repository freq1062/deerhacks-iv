import React, { useState, useRef, useEffect } from "react";
import "./Camera.css"; // Import the CSS file
import compareImages from "../data/compareImages";

import MN_Staircase from "../assets/MN_Staircase.jpg";
import utmdh from "../assets/utmdh.jpeg";

const convertToBase64 = async (imageSrc) => {
  const response = await fetch(imageSrc);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export default function Camera({ onPhotoTaken }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [base64Images, setBase64Images] = useState([]);
  const imageArray = [MN_Staircase, utmdh];
  const found = ["MN Staircase", "Deerfield Hall"];

  useEffect(() => {
    console.log("Got here");
    navigator.mediaDevices
      .getUserMedia({ video: { width: 320, height: 240 } })
      .then((stream) => {
        console.log("Stream started");
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.addEventListener("loadedmetadata", () => {
          console.log("Metadata loaded");
          videoRef.current
            .play()
            .catch((err) => console.error("Play error:", err));
        });
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
      });

    Promise.all(imageArray.map((image) => convertToBase64(image)))
      .then((base64Strings) => setBase64Images(base64Strings))
      .catch((error) => console.error("Error converting images:", error));
  }, []);

  const handleTakePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const dataUrl = canvasRef.current.toDataURL("image/png");
    if (onPhotoTaken) {
      onPhotoTaken(dataUrl);
    }
    let any = false;
    for (var i = 0; i < base64Images.length; i++) {
      compareImages(base64Images[i].split(",")[1], dataUrl.split(",")[1]).then(
        (result) => {
          console.log("Comparison result:", result);
          if (result) {
            alert("You found " + found[i] + "!");
            any = true;
          }
        }
      );
    }
    if (!any) {
      alert("No match found");
    }
  };

  return (
    <div className="camera-container">
      <video ref={videoRef} className="camera-video"></video>
      <button className="camera-button" onClick={handleTakePhoto}>
        Take Photo
      </button>
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width="640"
        height="480"
      ></canvas>
    </div>
  );
}
