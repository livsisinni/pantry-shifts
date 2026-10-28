import { useTheme } from '@mui/material/styles';
import { useEffect, useRef } from 'react';
import { carrotBody, carrotLeaf, carrotLeafAnchor, carrotLeafAngles } from './CarrotIcon';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  spin: number;
  size: number;
  drag: number;
  age: number; // negative until the particle starts (used by the confetti rain)
  life: number;
  shape: 'carrot' | 'rect';
  color: string;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

// Click any button that shows a CarrotIcon and its carrot pops, then bursts into confetti that
// fills the whole screen. Mount it once, inside the ThemeProvider. It renders nothing itself.
// Colors come from the theme palette. It does nothing when the user prefers reduced motion.
export default function CarrotConfetti() {
  const theme = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const bodyPath = new Path2D(carrotBody);
    const leafPath = new Path2D(carrotLeaf);
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let particles: Particle[] = [];
    let frame = 0;
    let last = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      canvas?.remove();
      canvas = null;
      ctx = null;
    };

    const ensureCanvas = () => {
      if (canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas = document.createElement('canvas');
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.setAttribute('aria-hidden', 'true');
      Object.assign(canvas.style, {
        position: 'fixed',
        inset: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: String(themeRef.current.zIndex.tooltip + 1),
      });
      document.body.appendChild(canvas);
      ctx = canvas.getContext('2d');
      ctx?.scale(dpr, dpr);
    };

    const palette = () => {
      const p = themeRef.current.palette;
      return [p.secondary.main, p.secondary.light, p.primary.main, p.primary.light, p.primary.dark];
    };

    const burst = (x: number, y: number) => {
      const colors = palette();
      const make = (p: Partial<Particle>): Particle => ({
        x, y, vx: 0, vy: 0, rot: rand(0, Math.PI * 2), spin: rand(-9, 9), size: rand(10, 22), drag: 0.3, age: 0, life: rand(2.6, 4),
        shape: Math.random() < 0.65 ? 'carrot' : 'rect', color: colors[Math.floor(Math.random() * colors.length)], ...p,
      });
      // Burst from the carrot, fast enough to reach every corner of the screen.
      for (let i = 0; i < 420; i++) {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(400, 1700);
        particles.push(make({ vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 300, size: rand(14, 32) }));
      }
      // Then confetti rains across the full width of the screen.
      for (let i = 0; i < 360; i++) {
        particles.push(make({
          x: rand(0, window.innerWidth), y: -30, vx: rand(-80, 80), vy: rand(150, 500), drag: 0.9, age: -rand(0.1, 1.6), life: rand(3.5, 5), size: rand(12, 26),
        }));
      }
      ensureCanvas();
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const draw = (c: CanvasRenderingContext2D, p: Particle) => {
      const p2 = themeRef.current.palette;
      c.save();
      c.globalAlpha = Math.min(1, (p.life - p.age) / 0.7);
      c.translate(p.x, p.y);
      c.rotate(p.rot);
      if (p.shape === 'carrot') {
        const s = p.size / 24;
        c.scale(s, s);
        c.translate(-12, -12);
        c.fillStyle = p2.secondary.main;
        c.fill(bodyPath);
        c.fillStyle = p2.primary.main;
        for (const angle of carrotLeafAngles) {
          c.save();
          c.translate(carrotLeafAnchor.x, carrotLeafAnchor.y);
          c.rotate((angle * Math.PI) / 180);
          c.fill(leafPath);
          c.restore();
        }
      } else {
        c.scale(1, Math.cos(p.age * 6 + p.rot)); // flutter
        c.fillStyle = p.color;
        c.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      c.restore();
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      particles = particles.filter((p) => p.age < p.life);
      if (!ctx || !canvas || particles.length === 0) {
        stop();
        return;
      }
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        p.age += dt;
        if (p.age < 0) continue;
        const drag = Math.pow(p.drag, dt);
        p.vx *= drag;
        p.vy = p.vy * drag + 1100 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.spin * dt;
        draw(ctx, p);
      }
      frame = requestAnimationFrame(tick);
    };

    const onClick = (event: MouseEvent) => {
      if (reduceMotion.matches) return;
      const button = (event.target as Element | null)?.closest?.('button');
      const icon = button?.querySelector('svg[data-testid="CarrotIcon"]');
      if (!icon) return;
      const rect = icon.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      // The carrot swells, pops, then grows back after the confetti.
      (icon as SVGElement).style.transformOrigin = 'center';
      icon.animate(
        [
          { transform: 'scale(1) rotate(0deg)', opacity: 1, offset: 0 },
          { transform: 'scale(1.9) rotate(-18deg)', opacity: 1, offset: 0.15 },
          { transform: 'scale(0) rotate(30deg)', opacity: 0, offset: 0.3 },
          { transform: 'scale(0) rotate(30deg)', opacity: 0, offset: 0.75 },
          { transform: 'scale(1) rotate(0deg)', opacity: 1, offset: 1 },
        ],
        { duration: 1800, easing: 'ease-in-out' },
      );
    };

    // Capture phase: read the carrot's position before a click handler removes the button.
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      stop();
    };
  }, []);

  return null;
}
