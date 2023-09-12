// src/ImageMover.js
import React, { useState } from "react";
import Draggable from "react-draggable";

const ImageMover = ({ backgroundImageSrc }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 200, height: 200 });
  const [shape, setShape] = useState("circle"); // Default to circle shape

  const backgroundImageSize = { width: 800, height: 600 }; // Replace with actual background image dimensions

  const handleDrag = (e, ui) => {
    const { x, y } = position;
    const newPosition = { x: x + ui.deltaX, y: y + ui.deltaY };

    // Calculate the maximum X and Y positions to keep the draggable element within bounds
    const maxX = backgroundImageSize.width - imageSize.width;
    const maxY = backgroundImageSize.height - imageSize.height;

    // Limit the position to stay within bounds
    const limitedPosition = {
      x: Math.max(0, Math.min(maxX, newPosition.x)),
      y: Math.max(0, Math.min(maxY, newPosition.y)),
    };

    console.log("New Position:", limitedPosition);
    setPosition(limitedPosition);
  };

  const handleWidthChange = (e) => {
    setImageSize({ ...imageSize, width: parseInt(e.target.value, 10) });
  };

  const handleHeightChange = (e) => {
    setImageSize({ ...imageSize, height: parseInt(e.target.value, 10) });
  };

  const handleShapeChange = (e) => {
    setShape(e.target.value);
  };

  const getMaskClass = () => {
    if (shape === "circle") {
      return "rounded-full";
    } else if (shape === "square") {
      return "rounded-none";
    }
    return ""; // Default to no mask class
  };

  return (
    <div className="relative h-auto">
      {/* Background Image */}
      <img
        src={backgroundImageSrc}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Draggable Element (Bordered Div) */}
      <Draggable onDrag={handleDrag} position={position}>
        <div
          className={`absolute ${getMaskClass()} border-2 border-blue-500`}
          style={{
            width: `${imageSize.width}px`,
            height: `${imageSize.height}px`,
          }}
        >
          {/* Content of the draggable element */}
          <p className="text-center">Drag me</p>
        </div>
      </Draggable>

      {/* Image Size Inputs */}
      <div className="absolute bottom-0 left-0 p-4">
        <label className="block mb-2">Width:</label>
        <input
          type="number"
          value={imageSize.width}
          onChange={handleWidthChange}
          className="input input-primary"
        />
        <label className="block mb-2">Height:</label>
        <input
          type="number"
          value={imageSize.height}
          onChange={handleHeightChange}
          className="input input-primary"
        />
        <label className="block mb-2">Shape:</label>
        <select
          value={shape}
          onChange={handleShapeChange}
          className="select select-primary"
        >
          <option value="circle">Circle</option>
          <option value="square">Square</option>
        </select>
      </div>

      {/* X and Y Axis Values */}
      {/* <div className="absolute top-0 right-0 p-4 text-white">
        <p>X: {position.x.toFixed(2)}</p>
        <p>Y: {position.y.toFixed(2)}</p>
      </div> */}
    </div>
  );
};

export default ImageMover;
