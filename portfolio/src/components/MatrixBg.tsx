import { useEffect, useRef } from "react";

const MatrixBg = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const columns = Math.floor(width / 14);
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * height;

    // choose random subsets of columns for orange and black effects
    const orangeCols = new Set<number>();
    const blackCols = new Set<number>();
    const seedCols = () => {
      orangeCols.clear();
      blackCols.clear();
      // increase orange density a lot (e.g. 30%)
      const orangeCount = Math.max(1, Math.floor(columns * 0.30));
      // some black columns (e.g. 10%)
      const blackCount = Math.max(1, Math.floor(columns * 0.10));

      while (orangeCols.size < orangeCount) {
        orangeCols.add(Math.floor(Math.random() * columns));
      }
      while (blackCols.size < blackCount) {
        const c = Math.floor(Math.random() * columns);
        if (!orangeCols.has(c)) blackCols.add(c);
      }
    };
    seedCols();

    // Use single characters (letters, digits, symbols) so each falling item is a single glyph
    const chars = (
      "abcdefghijklmnopqrstuvwxyz0123456789,?[]/\\;:(){}<>+-*=.!@#$%&|^~".split("")
    );

    let animationId: number;

  // periodically reseed which columns are orange/black
  const colsInterval = setInterval(() => seedCols(), 4000);

    const draw = () => {
      if (!ctx) return;

  // translucent black background to create trail effect
  // increase alpha so older characters fade faster (trail lasts only a few seconds)
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = "12px monospace";

      for (let i = 0; i < drops.length; i++) {
        // pick a single-character token
        const token = chars[Math.floor(Math.random() * chars.length)];

        // pick color per-column: orange, black, or dark grey default
        let color = "#4a4a4a"; // default dark grey
        if (orangeCols.has(i)) color = "#ff8a00"; // orange
        else if (blackCols.has(i)) color = "#000000"; // black (will blend into background)

        ctx.fillStyle = color;
        ctx.fillText(token, i * 14, drops[i]);

        if (drops[i] > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += 14 * (0.5 + Math.random() * 0.8);
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

  window.addEventListener("resize", handleResize);

    // initialize background to solid dark so it blends with theme
    ctx.fillStyle = "#010101";
    ctx.fillRect(0, 0, width, height);

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(colsInterval);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      aria-hidden
    />
  );
};

export default MatrixBg;
