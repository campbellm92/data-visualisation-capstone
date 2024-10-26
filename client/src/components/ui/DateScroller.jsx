import { useRef, useEffect, useState } from "react";
import { addDaysToDate } from "../../api/utils/utils";
import backgroundImage from "../../images/gridbackground.png";

function DateScroller ({
  startDate,
  setStartDate,
  windowDays,
  setWindowDays,
}) {
  const canvasRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = backgroundImage;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
    };

    canvas.style.touchAction = "none";
    canvas.addEventListener("dragstart", (e) => e.preventDefault());

    return () => {
      canvas.removeEventListener("dragstart", (e) => e.preventDefault());
    };
  }, []);

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

  const captureCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setCoords({ x: Math.round(x), y: Math.round(y) });

    setWindowDays(Math.round((100 - y) * 3.6));
    setStartDate(addDaysToDate("2023-10-01", Math.round(x - 365 / 2)));
  };

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
          width: '100%',
          height: 100,
          border: "1px solid black",
          touchAction: "none",
          userSelect: "none",
          WebkitUserDrag: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      ></canvas>
      {/*<p>Coordinates: {`(${coords.x}, ${coords.y})`}</p>*/}
    </div>
  );
}

export default DateScroller;
