import React, { useState, useRef, useEffect } from "react";
import './Camera.css'; // Import the CSS file
import compareImages from "../data/compareImages";
import { data } from "@maptiler/sdk";

export default function Camera({ onPhotoTaken }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();
  }, []);

  const handleTakePhoto = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the base64 image data
    const dataUrl = canvas.toDataURL('image/png');
    setBase64Image(dataUrl);

    // Call the onPhotoTaken callback if provided
    if (onPhotoTaken) {
      onPhotoTaken(dataUrl);
    }

    // Example: Compare the captured image with another image
    try {
      const result = await compareImages(dataUrl, dataUrl);
      console.log("Comparison result:", result);
    } catch (error) {
      console.error("Error during comparison:", error);
    }
  };

  return (
    <div className="camera-container">
      <video ref={videoRef} className="camera-video" autoPlay playsInline></video>
      <button className="camera-button" onClick={handleTakePhoto}>Take Photo</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
    </div>
  );
}