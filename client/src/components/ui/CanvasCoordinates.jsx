import React, { useRef, useEffect, useState } from 'react';
import { addDaysToDate } from '../../api';

function CanvasCoordinates({startDate, setStartDate, windowDays, setWindowDays}) {
  const canvasRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = 'path/to/your/image.jpg';

    image.onload = () => {
      // Adjust canvas size to match the image size
      canvas.width = image.width;
      canvas.height = image.height;
      // Draw the image onto the canvas
      context.drawImage(image, 0, 0);
    };

    // Prevent default touch actions like scrolling
    canvas.style.touchAction = 'none';

    // Prevent the canvas from being draggable
    canvas.addEventListener('dragstart', (e) => e.preventDefault());

    return () => {
      // Clean up the event listener
      canvas.removeEventListener('dragstart', (e) => e.preventDefault());
    };
  }, []);

  // Mouse event handlers
  const handleMouseDown = (event) => {
    setIsInteracting(true);
    captureCoordinates(event);
  };

  const handleMouseMove = (event) => {
    if (isInteracting) {
      captureCoordinates(event);
    }
  };

  const handleMouseUp = () => {
    setIsInteracting(false);
  };

  // Touch event handlers
  const handleTouchStart = (event) => {
    setIsInteracting(true);
    captureTouchCoordinates(event);
  };

  const handleTouchMove = (event) => {
    if (isInteracting) {
      captureTouchCoordinates(event);
    }
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
  };

  // Function to capture mouse coordinates
  const captureCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setCoords({ x: Math.round(x), y: Math.round(y) });

    setWindowDays(Math.round(y * 5));
    setStartDate(addDaysToDate('2023-10-01', Math.round(x - (365 / 2))))
  };

  // Function to capture touch coordinates
  const captureTouchCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setCoords({ x: Math.round(x), y: Math.round(y) });
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width: 365,
          height: 100,
          border: '1px solid black',
          touchAction: 'none', // Prevents touch actions like scrolling
          userSelect: 'none',  // Prevents text selection
          WebkitUserDrag: 'none', // Prevents image dragging in WebKit browsers
        }}
        // Mouse events
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Ensure interaction ends if cursor leaves canvas
        // Touch events
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      ></canvas>
      <p>Coordinates: {`(${coords.x}, ${coords.y})`}</p>
    </div>
  );
}

export default CanvasCoordinates;
