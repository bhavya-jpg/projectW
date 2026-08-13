"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

export type WaveformMode = "agent" | "user" | "silence";

type CallWaveformProps = {
  modeRef: MutableRefObject<WaveformMode>;
  levelRef: MutableRefObject<number>;
  className?: string;
};

const COLORS: Record<WaveformMode, string> = {
  agent: "#1F8A4C", // green — agent speaking
  user: "#8B5A2B", // brown — user speaking
  silence: "#9AA39B",
};

const BAR_COUNT = 48;

/**
 * Live bar waveform driven by audio level samples via refs (no React re-render per frame).
 * Silence draws a near-flat baseline with tiny jitter.
 */
export default function CallWaveform({
  modeRef,
  levelRef,
  className = "",
}: CallWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const barsRef = useRef<number[]>(Array.from({ length: BAR_COUNT }, () => 0.02));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const tick = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const currentMode = modeRef.current;
      const raw = Math.max(0, Math.min(1, levelRef.current));

      let target = 0.02;
      if (currentMode === "silence") {
        target = 0.02 + Math.random() * 0.015;
      } else {
        target = Math.min(1, 0.08 + Math.pow(raw, 0.65) * 0.92);
      }

      const bars = barsRef.current;
      for (let i = 0; i < bars.length; i += 1) {
        const wave =
          currentMode === "silence"
            ? 1
            : 0.55 + 0.45 * Math.sin(Date.now() / 140 + i * 0.45);
        const desired = target * wave * (0.75 + ((i * 17) % 10) / 25);
        bars[i] += (desired - bars[i]) * 0.28;
      }

      ctx.clearRect(0, 0, width, height);
      const gap = 2;
      const barWidth = Math.max(2, (width - gap * (BAR_COUNT - 1)) / BAR_COUNT);
      const color = COLORS[currentMode];
      const mid = height / 2;

      ctx.fillStyle = color;
      for (let i = 0; i < BAR_COUNT; i += 1) {
        const amp = Math.max(1.5, bars[i] * (height * 0.9));
        const x = i * (barWidth + gap);
        const y = mid - amp / 2;
        const radius = Math.min(2, barWidth / 2);
        if (typeof ctx.roundRect === "function") {
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, amp, radius);
          ctx.fill();
        } else {
          ctx.fillRect(x, y, barWidth, amp);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [levelRef, modeRef]);

  return (
    <canvas
      ref={canvasRef}
      className={`h-14 w-full ${className}`}
      aria-hidden
    />
  );
}
