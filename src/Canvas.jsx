import { useState, useEffect, useRef } from 'react';
import photoTogether from './assets/photoTogether.jpg';

export default function Canvas() {
  //чтобы фото на фоне не палить до розового покраса:
  const [bg, setBg] = useState({});
  const [isErasing, setIsErasing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    setBg({
      backgroundImage: `url(${photoTogether})`,
    });

    const canvas = canvasRef.current;
    canvas.width = 300;
    canvas.height = 330;
    const context = canvas.getContext('2d');

    context.fillStyle = 'rgb(251, 141, 160)';
    context.fillRect(
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );
    contextRef.current = context;
  }, []);

  function getTouchPosition(canvas, touchEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top,
    };
  }

  function StartErasing(e) {
    let position;
    if (e.type === 'touchstart') {
      position = getTouchPosition(canvasRef.current, e);
    } else {
      e.preventDefault();
      position = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };
    }
    contextRef.current.beginPath();
    contextRef.current.moveTo(position.x, position.y);
    setIsErasing(true);
  }

  function Erasing(e) {
    if (!isErasing) return;
    let position;
    if (e.type === 'touchmove') {
      position = getTouchPosition(canvasRef.current, e);
    } else {
      e.preventDefault();
      position = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };
    }
    contextRef.current.clearRect(
      position.x,
      position.y,
      50,
      50
    );
  }

  function StopErasing(e) {
    e.preventDefault();
    contextRef.current.closePath();
    setIsErasing(false);
  }

  return (
    <canvas
      onMouseDown={StartErasing}
      onMouseMove={Erasing}
      onMouseUp={StopErasing}
      onTouchStart={StartErasing}
      onTouchMove={Erasing}
      onTouchEnd={StopErasing}
      ref={canvasRef}
      style={bg}
    ></canvas>
  );
}
