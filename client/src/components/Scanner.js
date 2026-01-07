import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiCamera, HiPhotograph, HiSwitchHorizontal, HiX } from 'react-icons/hi';
import './Scanner.css';

function Scanner({ onScan, scanning, onBack, scanError, onClearError }) {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [cameraMode, setCameraMode] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' = back camera, 'user' = front
  const [cameraError, setCameraError] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Start camera stream
  const startCamera = async () => {
    try {
      setCameraError(null);
      setCameraMode(true);
      
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setCameraReady(true);
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError(
        err.name === 'NotAllowedError' 
          ? 'Camera access denied. Please allow camera permissions.'
          : 'Could not access camera. Try uploading an image instead.'
      );
      setCameraMode(false);
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraMode(false);
    setCameraReady(false);
  };

  // Switch between front and back camera
  const switchCamera = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
  };

  // Restart camera when facing mode changes
  useEffect(() => {
    if (cameraMode && cameraReady) {
      startCamera();
    }
  }, [facingMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Capture photo from camera
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current frame to canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to blob and create file
    canvas.toBlob((blob) => {
      const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
      setSelectedFile(file);
      setPreview(URL.createObjectURL(blob));
      stopCamera();
    }, 'image/jpeg', 0.9);
  };

  const onDrop = useCallback((files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: false,
    disabled: scanning || cameraMode,
    noClick: true,
  });

  const handleAnalyze = () => {
    if (selectedFile) {
      onScan(selectedFile);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setSelectedFile(null);
    setCameraError(null);
    if (onClearError) onClearError();
  };

  const handleBack = () => {
    stopCamera();
    onBack();
  };

  return (
    <section className="scanner">
      <div className="container">
        <button className="back-btn" onClick={handleBack}>
          <HiArrowLeft />
          <span>Back</span>
        </button>

        <div className="scanner-header">
          <motion.h1 
            className="scanner-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Scan Your <span className="highlight">Meal</span>
          </motion.h1>
          <motion.p 
            className="scanner-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Use your camera for real-time scanning or upload an image
          </motion.p>
        </div>

        <motion.div 
          className="scanner-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Camera Mode */}
          {cameraMode && !preview ? (
            <div className="camera-container">
              <video 
                ref={videoRef} 
                className="camera-preview"
                autoPlay 
                playsInline 
                muted
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              
              {cameraReady && (
                <>
                  {/* Camera overlay frame */}
                  <div className="camera-overlay">
                    <div className="scan-frame">
                      <span className="frame-corner tl"></span>
                      <span className="frame-corner tr"></span>
                      <span className="frame-corner bl"></span>
                      <span className="frame-corner br"></span>
                    </div>
                    <p className="camera-hint">Position your food within the frame</p>
                  </div>

                  {/* Camera controls */}
                  <div className="camera-controls">
                    <button className="cam-btn secondary" onClick={stopCamera}>
                      <HiX />
                    </button>
                    <button className="cam-btn primary capture-btn" onClick={capturePhoto}>
                      <div className="capture-ring"></div>
                    </button>
                    <button className="cam-btn secondary" onClick={switchCamera}>
                      <HiSwitchHorizontal />
                    </button>
                  </div>
                </>
              )}

              {!cameraReady && !cameraError && (
                <div className="camera-loading">
                  <div className="loader"></div>
                  <p>Starting camera...</p>
                </div>
              )}
            </div>
          ) : !preview ? (
            /* Upload Mode */
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              
              <div className="dropzone-content">
                <div className="upload-icon-wrapper">
                  <div className="upload-icon">
                    <HiPhotograph />
                  </div>
                  <div className="upload-ring"></div>
                </div>

                <h3 className="dropzone-title">
                  {isDragActive ? 'Drop your image here' : 'Scan your food'}
                </h3>
                
                <p className="dropzone-hint">
                  Choose how you want to capture your meal
                </p>

                {cameraError && (
                  <div className="camera-error">
                    <span>⚠️</span> {cameraError}
                  </div>
                )}

                <div className="upload-options">
                  <button className="upload-option camera-option" onClick={startCamera}>
                    <HiCamera />
                    <span>Use Camera</span>
                    <small>Real-time scanning</small>
                  </button>
                  <div className="upload-divider">or</div>
                  <button className="upload-option" onClick={open}>
                    <HiPhotograph />
                    <span>Upload Photo</span>
                    <small>From your device</small>
                  </button>
                </div>
              </div>

              <div className="dropzone-footer">
                <span>Works on mobile & desktop</span>
                <span>•</span>
                <span>Supports JPG, PNG, WebP</span>
              </div>
            </div>
          ) : (
            /* Preview Mode */
            <div className="preview-container">
              <div className="preview-image-wrapper">
                <img src={preview} alt="Food preview" className="preview-image" />
                {scanning && (
                  <div className="scanning-overlay">
                    <div className="scan-line"></div>
                    <div className="scan-corners">
                      <span></span><span></span><span></span><span></span>
                    </div>
                    <p className="scanning-text">Analyzing your meal...</p>
                  </div>
                )}
              </div>

              {/* Error Display */}
              {scanError && (
                <div className="scan-error-card">
                  <div className="error-emoji">🙈</div>
                  <h3>{scanError.title}</h3>
                  <p>{scanError.message}</p>
                  <span className="error-suggestion">{scanError.suggestion}</span>
                </div>
              )}

              <div className="preview-actions">
                {!scanning && (
                  <>
                    <button className="btn-outline" onClick={handleReset}>
                      {scanError ? 'Try Again' : 'Retake'}
                    </button>
                    {!scanError && (
                      <button className="btn-primary" onClick={handleAnalyze}>
                        <span>◎</span>
                        Analyze Nutrition
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </motion.div>

        <motion.div 
          className="scanner-tips"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h4>Tips for best results</h4>
          <div className="tips-grid">
            <div className="tip">
              <span className="tip-icon">💡</span>
              <span>Good lighting helps accuracy</span>
            </div>
            <div className="tip">
              <span className="tip-icon">🎯</span>
              <span>Center the food in frame</span>
            </div>
            <div className="tip">
              <span className="tip-icon">📸</span>
              <span>Top-down angle works best</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Scanner;
