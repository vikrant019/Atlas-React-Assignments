import { useRef, useState } from "react";
import { FaCarSide } from "react-icons/fa";
import "./MovingCar.css";

const MovingCar: React.FC = () => {
  const [position, setPosition] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1); 
  const animationRef = useRef<number | null>(null);

  const trackWidth = 1200;
  const carWidth = 100;
  const maxX = trackWidth - carWidth;
  const speed = 2; 

  const animate = () => {
    setPosition(prev => {
      let next = prev + speed * direction;
      if (next >= maxX) {
        setDirection(-1);
        next = 0;
      } else if (next <= 0) {
        setDirection(1);
        next = maxX;
      }
      return next;
    });
    animationRef.current = requestAnimationFrame(animate);
  };

  const moveTheCar = () => {
    if (animating) return;
    setAnimating(true);
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopCar = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      setAnimating(false);
    }
  };

  const resetCar = () => {
    stopCar();
    setPosition(0);
    setDirection(1);
  };

  return (
    <div className="movingcar-container">
      <h2 className="movingcar-title">Moving Car Animation</h2>
      <div className="movingcar-track" style={{ width: trackWidth }}>
        <span
          className="movingcar-car"
          style={{ left: position, transition: animating ? 'none' : undefined }}
        >
          <FaCarSide />
        </span>
      </div>
      <div className="movingcar-controls">
        <button className="btn" onClick={moveTheCar} disabled={animating || position >= maxX}>Start</button>
        <button className="btn" onClick={stopCar} disabled={!animating}>Stop</button>
        <button className="btn" onClick={resetCar}>Reset</button>
      </div>
    </div>
  );
};

export default MovingCar;
