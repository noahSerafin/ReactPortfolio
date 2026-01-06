import React, { useRef, useEffect } from 'react';
import Three from './three';

const CanvasWrapper = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      new Three(canvasRef.current);
    }
  }, []);

  return <canvas id="canvas" className="webgl" ref={canvasRef}></canvas>;
};

export default CanvasWrapper;