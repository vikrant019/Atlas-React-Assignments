import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";


function startImageLoop(
  setX: React.Dispatch<React.SetStateAction<number>>,
  getSizes: () => { containerW: number; imgW: number },
  speedPxPerSec = 160,
) {
  let rafId = 0;
  let lastT = 0;
  let x: number | null = null;

  const tick = (t: number) => {
    const { containerW, imgW } = getSizes();
    const startX = -imgW; 
    const endX = containerW; 

    if (x === null) x = startX;
    if (lastT === 0) lastT = t;

    const dt = (t - lastT) / 1000;
    lastT = t;

    x += speedPxPerSec * dt;
    if (x > endX) x = startX;

    setX(x);
    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId);
}

function MovingCar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [x, setX] = useState(0);

  useEffect(() => {
    return startImageLoop(
      setX,
      () => ({
        containerW: containerRef.current?.clientWidth ?? window.innerWidth,
        imgW: imgRef.current?.clientWidth ?? 300,
      }),
      180, // speed
    );
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            height: 320,
            overflow: "hidden",
          }}
        >
          <img
            ref={imgRef}
            src="/car.png"
            height={300}
            width={300}
            alt="car"
            style={{
              position: "absolute",
              top: 10,
              left: 0,
              transform: `translateX(${x}px)`,
              willChange: "transform",
            }}
          />
        </div>
        <hr />
        <Link to="/home">Home</Link>
        {"  |  "}
        <Link to="/about">About Us</Link>
        {"  |  "}
        <Link to="/contact">Contact</Link>
        {"  |  "}
        <Link to="/secure">Secure</Link>
        {"  |  "}
        <Link to="/login">LogIn</Link>
        {"  |  "}
        <Link to="/logout">LogOut</Link>
        {"  |  "}
         <hr />
        This is footer
      </div>
    </>
  );
}

export default MovingCar;
