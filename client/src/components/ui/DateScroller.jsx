import { useRef, useEffect, useState } from "react";
import { addDaysToDate } from "../../api/utils/utils";
import { kOriginDate } from "../../api/utils/constants";
import { useWindowWidthResize } from "../../api/hooks/useWindowWidthResize";

function DateScroller ({
  startDate,
  setStartDate,
  windowDays,
  setWindowDays,
}) {
  const canvasRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const width = useWindowWidthResize();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = "#3f3f3f";
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


  function handleMouseDown(event) {
    setIsInteracting(true);
    captureCoordinates(event);
  };

  function handleMouseMove(event) {
    if (isInteracting) {
      captureCoordinates(event);
    }
  };

  function handleMouseUp() {
    setIsInteracting(false);
  };

  function handleTouchStart(event) {
    setIsInteracting(true);
    captureTouchCoordinates(event);
  };

  function handleTouchMove(event) {
    if (isInteracting) {
      captureTouchCoordinates(event);
    }
  };

  function handleTouchEnd() {
    setIsInteracting(false);
  };

  function captureCoordinates(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setCoords({ x: Math.round(x), y: Math.round(y) });

    setWindowDays(Math.round((100 - y) * 3.65));
    setStartDate(addDaysToDate(kOriginDate, Math.max(0.0, Math.round( ((x / rect.width) * 613.0)))));
  };

  function captureTouchCoordinates(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setCoords({ x: Math.round(x), y: Math.round(y) });
  };

  function translate(coords) {
    console.log(width);
    //return { left: (coords.x + 15) *.95, top: (coords.y + 18) *.75};
    return { left: coords.x, top: coords.y };
  }



  return (
    <div className="m-1">
      <div className="horizontal-text">TIME&rarr;</div>
      <div className="vertical-text">ZOOM&darr;</div>
      <div className="dateScrollerCursor" style={translate(coords)}>📍</div>
      <canvas className="box-drop-shadow dateScroller" style={{padding:0}}
        ref={canvasRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
      ></canvas>
      Start Date: <span style={{whiteSpace: 'nowrap', pointerEvents: 'none'}}>{startDate}<br></br></span>
      Zoom: <span style={{whiteSpace: 'nowrap'}}>{windowDays} days</span>
    </div>
  );
}

export default DateScroller;
