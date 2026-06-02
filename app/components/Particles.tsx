"use client";

import { useEffect, useRef } from "react";

type P = {
  x: number;
  y: number;
  z: number;
  r: number;
  vx: number;
  vy: number;
  hue: number;
  twinkle: number;
};

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void) => number;
  cancelIdleCallback?: (id: number) => void;
};

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<P[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1, isMobile: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMobile = w < 768;
      sizeRef.current = { w, h, dpr, isMobile };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      const density = isMobile ? 18000 : 9000;
      const count = Math.round((w * h) / density);
      const arr: P[] = [];
      for (let i = 0; i < count; i++) {
        const z = Math.random();
        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.3 + z * 1.4,
          vx: (Math.random() - 0.5) * 0.06 * (0.4 + z),
          vy: (Math.random() - 0.5) * 0.06 * (0.4 + z),
          hue:
            Math.random() < 0.45
              ? 188
              : Math.random() < 0.75
                ? 270
                : 310,
          twinkle: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = arr;
    };

    const tick = () => {
      const { w, h, isMobile } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      const t = performance.now() * 0.001;
      const shadowBlur = isMobile ? 0 : 8;
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;
        const alpha =
          (0.25 + p.z * 0.55) * (0.6 + Math.sin(t * 0.8 + p.twinkle) * 0.4);
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 72%, ${alpha})`;
        if (shadowBlur > 0) {
          ctx.shadowBlur = shadowBlur;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 65%, ${alpha * 0.6})`;
        }
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        init();
      });
    };
    window.addEventListener("resize", onResize, { passive: true });

    const idleWin = window as IdleWindow;
    const schedule =
      idleWin.requestIdleCallback ??
      ((cb: () => void) => window.setTimeout(cb, 200));
    const idleId = schedule(() => {
      init();
      tick();
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(resizeRaf);
      if (idleWin.cancelIdleCallback) {
        idleWin.cancelIdleCallback(idleId as number);
      } else {
        window.clearTimeout(idleId as number);
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-bg" aria-hidden />;
}
