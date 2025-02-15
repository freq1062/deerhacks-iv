import React, { useState, useRef, useEffect } from "react";
import './Camera.css'; // Import the CSS file

export default function Camera({ onPhotoTaken }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => {
        console.error("Error accessing camera: ", err);
      });
  }, []);

  const handleTakePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    if (onPhotoTaken) {
      onPhotoTaken(dataUrl);
    }
  };

  return (
    <div className="camera-container">
      <video ref={videoRef} className="camera-video"></video>
      <button className="camera-button" onClick={handleTakePhoto}>Take Photo</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
    </div>
  );
}
