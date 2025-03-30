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

  function StartErasing(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsErasing(true);
    e.nativeEvent.preventDefault();
  }

  function Erasing(e) {
    if (isErasing) {
      const { offsetX, offsetY } = e.nativeEvent;
      contextRef.current.moveTo(offsetX, offsetY);
      contextRef.current.clearRect(
        offsetX,
        offsetY,
        50,
        50
      );
    }
    e.nativeEvent.preventDefault();
  }

  function StopErasing() {
    contextRef.current.closePath();
    setIsErasing(false);
  }

  return (
    <canvas
      onMouseDown={StartErasing}
      onMouseMove={Erasing}
      onMouseUp={StopErasing}
      ref={canvasRef}
      style={bg}
    ></canvas>
  );
}
