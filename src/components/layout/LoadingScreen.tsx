import { useEffect, useRef, useState } from 'react';
import { HOTEL_NAME } from '@/lib/constants';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Weave Spinner Constants
const WEAVE_RIBBON_W = 28;
const WEAVE_BALL_R = 4;
const WEAVE_HZ = 3;
const WEAVE_VT = 3;
const WEAVE_AMP = 90;
const WEAVE_CRESTS = 120;
const WEAVE_SPEED = 1.8;
const WEAVE_TILT = 0.25;
const WEAVE_BG = '#0a0806';
const WEAVE_RIBBON = '#c9a96e';
const WEAVE_BALL = '#e8d5a3';

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [logoLetters, setLogoLetters] = useState<boolean[]>([]);
  const rafRef = useRef<number>(0);

  const brandText = HOTEL_NAME.replace(' ', '').toUpperCase();

  useEffect(() => {
    setLogoLetters(new Array(brandText.length).fill(false));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 400;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Precompute sine lookup table
    const waveTable = new Float64Array(2048);
    for (let i = 0; i < 2048; i++) {
      waveTable[i] = Math.sin((i / 2048) * Math.PI * 2);
    }

    const wave = (_type: number, k: number, offset: number): number => {
      const period = WEAVE_CRESTS * 4;
      const freq = (k + 1) * 0.38;
      const phase = ((offset * freq) / period) * 2048;
      const idx = (Math.floor(phase) + 2048) % 2048;
      return waveTable[idx] * WEAVE_AMP;
    };

    const point = (type: number, k: number, offset: number, tilt: number): number[] => {
      const halfWidth = WEAVE_CRESTS * 2;
      let x: number, y: number, z: number;

      if (type === 0) {
        y = (k - 1) * 140;
        x = offset - halfWidth;
        z = wave(0, k, offset);
      } else {
        x = (k - 1) * 140;
        y = offset - halfWidth;
        z = wave(1, k, offset);
      }

      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      const xr = x * cosT - z * sinT;
      const zr = x * sinT + z * cosT;

      // Derivatives via forward differencing
      const delta = 5;
      let dx: number, dy: number, dz: number;
      if (type === 0) {
        const zNext = wave(0, k, offset + delta);
        const zCurr = wave(0, k, offset);
        dx = delta * cosT - (zNext - zCurr) * sinT;
        dy = 0;
        dz = delta * sinT + (zNext - zCurr) * cosT;
      } else {
        const zNext = wave(1, k, offset + delta);
        const zCurr = wave(1, k, offset);
        dx = 0;
        dy = delta;
        dz = zNext - zCurr;
      }

      return [xr, y, zr, dx, dy, dz];
    };

    let t = 0;
    const startTime = Date.now();
    const duration = 6000;

    const draw = () => {
      const elapsed = Date.now() - startTime;
      const prog = Math.min(elapsed / duration, 1);
      setProgress(prog);

      // Update logo letter reveals
      const lettersRevealed = Math.floor(prog * brandText.length);
      setLogoLetters(prev => {
        const next = [...prev];
        for (let i = 0; i < lettersRevealed && i < next.length; i++) {
          next[i] = true;
        }
        return next;
      });

      // Fade background
      ctx.fillStyle = `rgba(10, 8, 6, ${3 / WEAVE_AMP})`;
      ctx.fillRect(0, 0, size, size);

      t += WEAVE_SPEED;

      // Sort paths by depth
      const paths: [number, number, number][] = [];
      for (let type = 0; type < 2; type++) {
        for (let k = 0; k < (type === 0 ? WEAVE_HZ : WEAVE_VT); k++) {
          let avgZ = 0;
          const range = WEAVE_CRESTS * 4;
          for (let s = 0; s < 10; s++) {
            const offset = (s / 10) * range;
            const p = point(type, k, offset, WEAVE_TILT);
            avgZ += p[2];
          }
          avgZ /= 10;
          paths.push([type, k, avgZ]);
        }
      }
      paths.sort((a, b) => a[2] - b[2]);

      const cx = size / 2;
      const cy = size / 2;
      const scale = 0.6;

      // Draw each path
      for (const [type, k] of paths) {
        const range = WEAVE_CRESTS * 4;
        const steps = Math.floor(range / 3);

        // Collect ribbon points
        const leftEdge: [number, number][] = [];
        const rightEdge: [number, number][] = [];

        for (let i = 0; i <= steps; i++) {
          const offset = (i / steps) * range;
          const p = point(type, k, offset, WEAVE_TILT);
          const x = p[0] * scale + cx;
          const y = p[1] * scale + cy;

          // Compute perpendicular direction
          const dx = p[3];
          const dy = p[4];
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;

          // Varying width
          const iNorm = i / steps;
          const sinVal = Math.sin(iNorm * Math.PI);
          const w = WEAVE_RIBBON_W * (0.4 + 0.6 * Math.pow(sinVal, 0.25));

          leftEdge.push([x + nx * w, y + ny * w]);
          rightEdge.push([x - nx * w, y - ny * w]);

          // Draw traveling sphere
          const sphereOffset = type === 0
            ? ((t * 1.8 + k * 140) % range)
            : ((t * 1.8 + k * 140 + WEAVE_CRESTS) % range);

          if (Math.abs(offset - sphereOffset) < 6) {
            ctx.beginPath();
            ctx.arc(x, y, WEAVE_BALL_R, 0, Math.PI * 2);
            ctx.fillStyle = WEAVE_RIBBON;
            ctx.fill();

            // Highlight
            ctx.beginPath();
            ctx.arc(x - WEAVE_BALL_R * 0.3, y - WEAVE_BALL_R * 0.3, WEAVE_BALL_R * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = WEAVE_BALL;
            ctx.fill();
          }
        }

        // Draw ribbon trail
        ctx.beginPath();
        if (leftEdge.length > 0) {
          ctx.moveTo(leftEdge[0][0], leftEdge[0][1]);
          for (let i = 1; i < leftEdge.length; i++) {
            ctx.lineTo(leftEdge[i][0], leftEdge[i][1]);
          }
          for (let i = rightEdge.length - 1; i >= 0; i--) {
            ctx.lineTo(rightEdge[i][0], rightEdge[i][1]);
          }
          ctx.closePath();
        }
        ctx.fillStyle = 'rgba(201, 169, 110, 0.12)';
        ctx.fill();

        // Center line
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const offset = (i / steps) * range;
          const p = point(type, k, offset, WEAVE_TILT);
          const x = p[0] * scale + cx;
          const y = p[1] * scale + cy;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(201, 169, 110, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      if (prog < 1) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        // Fade out
        if (containerRef.current) {
          containerRef.current.style.opacity = '0';
          containerRef.current.style.transition = 'opacity 0.5s ease';
        }
        setTimeout(onComplete, 500);
      }
    };

    // Clear canvas initially
    ctx.fillStyle = WEAVE_BG;
    ctx.fillRect(0, 0, size, size);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-espresso flex flex-col items-center justify-center"
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
        style={{ width: 300, height: 300 }}
      />

      {/* Brand Text */}
      <div className="mt-8 flex gap-1">
        {brandText.split('').map((letter, i) => (
          <span
            key={i}
            className={`text-gold text-sm font-body tracking-[0.3em] transition-opacity duration-300 ${
              logoLetters[i] ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-espresso-light">
        <div
          className="h-full bg-gold transition-all duration-100 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
