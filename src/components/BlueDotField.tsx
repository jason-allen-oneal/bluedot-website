"use client";
import { useEffect, useRef } from "react";

/**
 * Stable blue-dot background:
 * - No cumulative brightening (“whiteout”)
 * - Additive glow is scoped via save/restore
 * - Canvas is cleared each frame in device pixels
 */
const DOTS = 70;

export default function BlueDotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let raf = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      // Draw in CSS pixels while canvas is scaled to DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: DOTS }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: 1.6 + Math.random() * 2.2,
    }));

    function step() {
      // 1) Hard-clear in device pixels (prevents additive accumulation)
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset to device pixels
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore(); // back to DPR transform (CSS pixels)

      // 2) Update positions
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -20) d.x = window.innerWidth + 20;
        if (d.y < -20) d.y = window.innerHeight + 20;
        if (d.x > window.innerWidth + 20) d.x = -20;
        if (d.y > window.innerHeight + 20) d.y = -20;
      }

      // 3) Scoped additive glow pass
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const d of dots) {
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, 10);
        g.addColorStop(0, "rgba(31,140,255,0.8)");
        g.addColorStop(1, "rgba(31,140,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore(); // back to normal compositing

      // 4) Solid dot cores
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#1f8cff";
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5) Subtle connecting lines (non-additive, low alpha)
      ctx.strokeStyle = "#1f8cff";
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i],
            b = dots[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.globalAlpha = 0.08 * (1 - dist / 110);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-50" aria-hidden />;
}
