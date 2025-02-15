import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './Camera.css'; // Import the CSS file
import { compareImages, img2Base64 } from '../data/compareImages.cjs'; // Import the compareImages function and img2Base64

export default function Camera({ onPhotoTaken }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const history = useHistory();

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

  const handleTakePhoto = async () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    if (onPhotoTaken) {
      onPhotoTaken(dataUrl);
    }
    const imgPath = path.join(__dirname, '../assets/CCT_Ice_cream.jpg');
    const imgBase64 = fs.readFileSync(imgPath, { encoding: 'base64' });
    const result = await compareImages(dataUrl, imgBase64); 
    console.log('Comparison result:', result);
  };

  const handleGoHome = () => {
    history.push('/');
  };

  return (
    <div className="camera-container">
      <video ref={videoRef} className="camera-video"></video>
      <button className="camera-button" onClick={handleTakePhoto}>Take Photo</button>
      <button className="camera-button" onClick={handleGoHome}>Go Home</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
    </div>
  );
}
