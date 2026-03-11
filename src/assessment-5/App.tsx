import { useEffect, useRef, useState } from "react";

type BubbleColor = "red" | "green" | "yellow";
type Bubble = { id: number; color: BubbleColor; x: number; y: number };
const COUNT = 10;
const SIZE = 60;
const COLORS: BubbleColor[] = ["red", "green", "yellow"];

const rand = (max: number) => Math.floor(Math.random() * (max + 1));

const createBubbles = (width: number, height: number): Bubble[] => {
  const maxX = Math.max(0, width - SIZE);
  const maxY = Math.max(0, height - SIZE);
  return Array.from({ length: COUNT }, (_, id) => ({
    id,
    color: COLORS[id % COLORS.length],
    x: rand(maxX),
    y: rand(maxY),
  }));
};

const App = () => {
  const bubblesRef = useRef<Bubble[]>(
    createBubbles(window.innerWidth, window.innerHeight),
  );
  const [, setTick] = useState(0);
  const rerender = () => setTick((n) => n + 1);

  const setBubblesRef = (updater: (prev: Bubble[]) => Bubble[]) => {
    bubblesRef.current = updater(bubblesRef.current);
    rerender();
  };

  useEffect(() => {
    const shuffle = () => {
      const maxX = Math.max(0, window.innerWidth - SIZE);
      const maxY = Math.max(0, window.innerHeight - SIZE);
      setBubblesRef((prev) =>
        prev.map((b) => ({ ...b, x: rand(maxX), y: rand(maxY) })),
      );
    };

    const id = window.setInterval(shuffle, 1500);
    return () => window.clearInterval(id);
  }, []);

  const bubbles = bubblesRef.current;

  const yellowCount = bubbles.reduce(
    (acc, b) => acc + (b.color === "yellow" ? 1 : 0),
    0,
  );

  const onBubbleClick = (id: number) => {
    setBubblesRef((prev) =>
      prev.map((b) =>
        b.id === id && b.color === "yellow" ? { ...b, color: "red" } : b,
      ),
    );
  };

  return (
    <div className="bubbleStage">
      <style>{`
        .bubbleStage{position:relative;width:100vw;height:100vh;overflow:hidden;}
        .bubble{position:absolute;border-radius:50%;cursor:pointer;}
        .bubble.red{background:red;}
        .bubble.green{background:green;}
        .bubble.yellow{background:yellow;}
        .counter{position:absolute;left:12px;top:12px;font-size:14px;color:#111;}
      `}</style>

      <div className="counter">Yellow bubbles: {yellowCount}</div>

      {bubbles.map((b) => (
        <div
          key={b.id}
          className={`bubble ${b.color}`}
          onClick={() => onBubbleClick(b.id)}
          style={{ left: b.x, top: b.y, width: SIZE, height: SIZE }}
        />
      ))}
    </div>
  );
};

export default App;
