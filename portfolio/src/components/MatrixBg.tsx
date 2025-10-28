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

  const columnWidth = (w: number) => (w <= 768 ? 18 : 14);
  let cw = columnWidth(width);
  let columns = Math.floor(width / cw);
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

      const isMobile = width <= 768;
      ctx.font = isMobile ? "10px monospace" : "12px monospace";


      // find hero rect to avoid drawing over the hero banner (improves hero image visibility on mobile)
      const heroEl = document.querySelector<HTMLElement>(".hero-banner");
      const heroRect = heroEl ? heroEl.getBoundingClientRect() : null;

      // adjust column width & speed for mobile
      cw = columnWidth(width);
      columns = Math.floor(width / cw);

      for (let i = 0; i < drops.length; i++) {
        // if columns changed due to resize, ensure drops array length matches
        if (i >= columns) break;

        // pick a single-character token
        const token = chars[Math.floor(Math.random() * chars.length)];

        // pick color per-column: orange, black, or dark grey default
        let color = "#4a4a4a"; // default dark grey
        if (orangeCols.has(i)) color = "#ff8a00"; // orange
        else if (blackCols.has(i)) color = "#000000"; // black (will blend into background)

        const x = i * cw;
        const y = drops[i];

        // if the token would be drawn over the hero banner, skip drawing it
        if (heroRect) {
          if (x >= heroRect.left - 8 && x <= heroRect.right + 8 && y >= heroRect.top && y <= heroRect.bottom) {
            // still advance the drop, but don't draw
            if (drops[i] > height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i] += cw * (isMobile ? (0.2 + Math.random() * 0.3) : (0.5 + Math.random() * 0.8));
            continue;
          }
        }

        ctx.fillStyle = color;
        ctx.fillText(token, x, y);

        if (drops[i] > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += cw * (isMobile ? (0.2 + Math.random() * 0.3) : (0.5 + Math.random() * 0.8));
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // recalc column width/columns and ensure drops array matches new column count
      cw = columnWidth(width);
      const newColumns = Math.floor(width / cw);
      if (newColumns > columns) {
        for (let i = columns; i < newColumns; i++) drops[i] = Math.random() * height;
      } else if (newColumns < columns) {
        drops.splice(newColumns);
      }
      columns = newColumns;
      // reseed orange/black columns after resize
      seedCols();
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
