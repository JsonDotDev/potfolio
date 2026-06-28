import { useEffect, useRef } from 'react';

// Renders an animated step-response curve that settles to steady state,
// drawn live on a canvas like an oscilloscope trace. This is a direct,
// literal nod to the PI-controller tuning work: a system overshoots,
// oscillates, and settles — the exact shape of a well-tuned response.
export default function SettlingWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let start: number | null = null;
    // Aspect ratio is fixed; actual pixel size is derived from the
    // container's rendered width so the canvas never overflows on mobile.
    const ASPECT = 280 / 480;
    let W = 480;
    let H = W * ASPECT;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const PADDING = 16; // matches .settling-wave's 8px padding on each side
      W = container!.clientWidth - PADDING;
      H = W * ASPECT;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    const accent = '#64d8ff';
    const gridColor = 'rgba(2, 3, 2, 0.08)';
    const setpointColor = 'rgba(159, 171, 159, 0.4)';

    // step response: underdamped, settling — y(t) = 1 - e^(-zt)cos(wt + phase), scaled
    function responseAt(t: number) {
      const zeta = 0.28; // damping
      const omega = 6.2; // frequency
      if (t < 0) return 0;
      return 1 - Math.exp(-zeta * t * 2.6) * Math.cos(omega * t);
    }

    function draw(progress: number) {
      ctx!.clearRect(0, 0, W, H);

      // grid
      ctx!.strokeStyle = gridColor;
      ctx!.lineWidth = 1;
      for (let x = 0; x <= W; x += 30) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, H);
        ctx!.stroke();
      }
      for (let y = 0; y <= H; y += 30) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(W, y);
        ctx!.stroke();
      }

      // setpoint line
      const setpointY = H * 0.32;
      ctx!.strokeStyle = setpointColor;
      ctx!.setLineDash([4, 4]);
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(40, setpointY);
      ctx!.lineTo(W - 20, setpointY);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // response curve
      const totalT = 4.2;
      const visibleT = totalT * progress;
      const baseline = H * 0.78;
      const amplitude = H * 0.46;

      ctx!.strokeStyle = accent;
      ctx!.lineWidth = 2.25;
      ctx!.shadowColor = accent;
      ctx!.shadowBlur = 8;
      ctx!.beginPath();

      const steps = 400;
      let lastX = 40;
      let lastY = baseline;
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * visibleT;
        if (t > visibleT) break;
        const x = 40 + (t / totalT) * (W - 60);
        const y = baseline - responseAt(t) * amplitude;
        if (i === 0) {
          ctx!.moveTo(x, y);
        } else {
          ctx!.lineTo(x, y);
        }
        lastX = x;
        lastY = y;
      }
      ctx!.stroke();
      ctx!.shadowBlur = 0;

      // leading dot
      if (progress < 1) {
        ctx!.fillStyle = accent;
        ctx!.beginPath();
        ctx!.arc(lastX, lastY, 4, 0, Math.PI * 2);
        ctx!.fill();
      }

      // axis labels
      ctx!.fillStyle = 'rgba(159, 171, 159, 0.55)';
      ctx!.font = '10px "JetBrains Mono", monospace';
      ctx!.fillText('setpoint', 44, setpointY - 8);
      ctx!.fillText('t →', W - 36, baseline + 18);
    }

    const DURATION = 2600; // ms
    const HOLD = 2600; // ms holding settled before replay
    function frame(timestamp: number) {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / DURATION, 1);
      draw(progress);

      if (elapsed < DURATION + HOLD) {
        raf = requestAnimationFrame(frame);
      } else {
        start = null;
        raf = requestAnimationFrame(frame);
      }
    }

    if (prefersReducedMotion) {
      draw(1);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="settling-wave" ref={containerRef}>
      <canvas ref={canvasRef} />
      <div className="settling-wave__label mono">
        <span className="settling-wave__readout">SYSTEM_RESPONSE.LOG</span>
      </div>
    </div>
  );
}
