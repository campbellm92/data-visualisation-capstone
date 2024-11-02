import { useRef, useEffect, useState } from "react";
import { addDaysToDate } from "../../api/utils/utils";
import backgroundImage from "../../images/gridbackground.png"; // from https://www.freepik.com/premium-vector/vector-perspective-grid-digital-background-retro-style-wireframe-landscape-white-background_28114469.htm
import { kOriginDate } from "../../api/utils/constants";

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

    context.fillStyle = "#1f1f1f";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // const image = new Image();
    // image.src = backgroundImage;
    // object-fit: contain

    // image.onload = () => {
    //   canvas.width = image.width;
    //   canvas.height = image.height;
    //   context.drawImage(image, 0, 0);
    // };

    // canvas.style.touchAction = "none";
    // canvas.addEventListener("dragstart", (e) => e.preventDefault());

    // return () => {
    //   canvas.removeEventListener("dragstart", (e) => e.preventDefault());
    // };
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
    setStartDate(addDaysToDate(kOriginDate, Math.max(0.0, Math.round( ((x / rect.width) * 613.0)))));
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
    <div className="m-1">
      <div className="horizontal-text">TIME&rarr;</div>
      <div className="vertical-text">ZOOM&darr;</div>
      <canvas className="box-drop-shadow dateScroller"
        ref={canvasRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      ></canvas>
      Start Date: <span style={{whiteSpace: 'nowrap'}}>{startDate}<br></br></span>
      Zoom: <span style={{whiteSpace: 'nowrap'}}>{windowDays} days</span>
    </div>
  );
}

export default DateScroller;
