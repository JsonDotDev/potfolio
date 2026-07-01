import { useEffect, useRef } from 'react';

export default function SettlingWave() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let t = 0;

    function tick() {
      t += 0.012;

      // ── Robotic arm joint angles ──
      const shoulder = -30 + Math.sin(t * 0.7) * 28;
      const elbow    = 50  + Math.sin(t * 0.9 + 1.2) * 35;
      const wrist    = -20 + Math.sin(t * 1.1 + 2.1) * 25;

      // Shoulder pivot at (120, 210)
      const sx = 120, sy = 210;
      const seg1 = 80; // upper arm length
      const seg2 = 65; // forearm length
      const seg3 = 40; // wrist length

      const s1 = (shoulder * Math.PI) / 180;
      const elbowX = sx + Math.cos(s1 - Math.PI / 2) * seg1;
      const elbowY = sy + Math.sin(s1 - Math.PI / 2) * seg1;

      const s2 = ((shoulder + elbow) * Math.PI) / 180;
      const wristX = elbowX + Math.cos(s2 - Math.PI / 2) * seg2;
      const wristY = elbowY + Math.sin(s2 - Math.PI / 2) * seg2;

      const s3 = ((shoulder + elbow + wrist) * Math.PI) / 180;
      const tipX = wristX + Math.cos(s3 - Math.PI / 2) * seg3;
      const tipY = wristY + Math.sin(s3 - Math.PI / 2) * seg3;

      // Gripper fingers
      const gripOpen = 7 + Math.abs(Math.sin(t * 0.5)) * 5;
      const perpX =  Math.sin(s3 - Math.PI / 2);
      const perpY = -Math.cos(s3 - Math.PI / 2);
      const f1x = tipX + perpX * gripOpen;
      const f1y = tipY + perpY * gripOpen;
      const f2x = tipX - perpX * gripOpen;
      const f2y = tipY - perpY * gripOpen;
      const fLen = 12;
      const fDirX = Math.cos(s3 - Math.PI / 2);
      const fDirY = Math.sin(s3 - Math.PI / 2);

      // Update arm segments
      setLine('hw-seg1', sx, sy, elbowX, elbowY);
      setLine('hw-seg2', elbowX, elbowY, wristX, wristY);
      setLine('hw-seg3', wristX, wristY, tipX, tipY);

      // Update joints
      setCircle('hw-joint-shoulder', sx, sy);
      setCircle('hw-joint-elbow', elbowX, elbowY);
      setCircle('hw-joint-wrist', wristX, wristY);

      // Update gripper
      setLine('hw-grip1', f1x, f1y, f1x + fDirX * fLen, f1y + fDirY * fLen);
      setLine('hw-grip2', f2x, f2y, f2x + fDirX * fLen, f2y + fDirY * fLen);
      setCircle('hw-tip', tipX, tipY);

      // ── Software panel: scrolling code lines ──
      const codeEl = document.getElementById('hw-code-scroll');
      if (codeEl) {
        const offset = (t * 18) % 120;
        codeEl.setAttribute('transform', `translate(0, ${-offset})`);
      }

      // ── Angle readouts ──
      setText('hw-read-s', `θ1: ${shoulder.toFixed(1)}°`);
      setText('hw-read-e', `θ2: ${elbow.toFixed(1)}°`);
      setText('hw-read-w', `θ3: ${wrist.toFixed(1)}°`);

      // ── Signal pulse on trace ──
      const pulseX = 340 + Math.sin(t * 3) * 40;
      setCircleX('hw-pulse', pulseX);

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="settling-wave" ref={containerRef}>
      <svg
        viewBox="0 0 480 280"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', display: 'block' }}
        aria-label="Animated mechatronics diagram with robotic arm and software panel"
      >
        <defs>
          <pattern id="hw-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none"
              stroke="rgba(124,255,178,0.06)" strokeWidth="0.8" />
          </pattern>
          <clipPath id="hw-code-clip">
            <rect x="302" y="20" width="165" height="200" />
          </clipPath>
          <clipPath id="hw-chart-clip">
            <rect x="302" y="228" width="165" height="44" />
          </clipPath>
        </defs>

        {/* Background */}
        <rect width="480" height="280" fill="#141a17" />
        <rect width="480" height="280" fill="url(#hw-grid)" />

        {/* ══════════════════════════════════
            LEFT PANEL — Mechanical robotic arm
            ══════════════════════════════════ */}

        {/* Panel label */}
        <text x="12" y="16" fontFamily="'JetBrains Mono',monospace"
          fontSize="8" fill="#4f9c73" letterSpacing="0.08em">MECHANICAL</text>
        <line x1="12" y1="20" x2="140" y2="20" stroke="#243029" strokeWidth="1" />

        {/* Base plate */}
        <rect x="85" y="212" width="70" height="10" rx="2"
          fill="#1c2521" stroke="#4f9c73" strokeWidth="1.5" />
        <rect x="95" y="222" width="50" height="5" rx="1"
          fill="#243029" stroke="#243029" strokeWidth="1" />

        {/* Arm segments — updated each frame */}
        <line id="hw-seg1" x1="120" y1="210" x2="120" y2="130"
          stroke="#7cffb2" strokeWidth="7" strokeLinecap="round" />
        <line id="hw-seg2" x1="120" y1="130" x2="120" y2="65"
          stroke="#7cffb2" strokeWidth="5" strokeLinecap="round" />
        <line id="hw-seg3" x1="120" y1="65" x2="120" y2="30"
          stroke="#7cffb2" strokeWidth="3.5" strokeLinecap="round" />

        {/* Joints */}
        <circle id="hw-joint-shoulder" cx="120" cy="210" r="9"
          fill="#0e1210" stroke="#7cffb2" strokeWidth="2" />
        <circle id="hw-joint-elbow" cx="120" cy="130" r="7"
          fill="#0e1210" stroke="#7cffb2" strokeWidth="2" />
        <circle id="hw-joint-wrist" cx="120" cy="65" r="5"
          fill="#0e1210" stroke="#5b7c99" strokeWidth="1.8" />
        <circle id="hw-tip" cx="120" cy="30" r="3"
          fill="#ffb454" stroke="#ffb454" strokeWidth="1" />

        {/* Gripper fingers */}
        <line id="hw-grip1" x1="120" y1="30" x2="128" y2="18"
          stroke="#ffb454" strokeWidth="3" strokeLinecap="round" />
        <line id="hw-grip2" x1="120" y1="30" x2="112" y2="18"
          stroke="#ffb454" strokeWidth="3" strokeLinecap="round" />

        {/* Angle arc indicators */}
        <path id="hw-arc-s" d="M120,210 m20,0 a20,20 0 0,0 0,-20"
          fill="none" stroke="#4f9c73" strokeWidth="1"
          strokeDasharray="2 2" opacity="0.6" />

        {/* ══════════════════════════════════
            MIDDLE PANEL — Electronics / control
            ══════════════════════════════════ */}

        <text x="175" y="16" fontFamily="'JetBrains Mono',monospace"
          fontSize="8" fill="#5b7c99" letterSpacing="0.08em">ELECTRICAL</text>
        <line x1="175" y1="20" x2="290" y2="20" stroke="#243029" strokeWidth="1" />

        {/* MCU chip */}
        <rect x="185" y="28" width="72" height="54" rx="3"
          fill="#161d1a" stroke="#5b7c99" strokeWidth="1.5" />
        <text x="221" y="50" fontFamily="'JetBrains Mono',monospace"
          fontSize="8" fill="#5b7c99" textAnchor="middle" fontWeight="600">MCU</text>
        <text x="221" y="62" fontFamily="'JetBrains Mono',monospace"
          fontSize="6.5" fill="#647066" textAnchor="middle">PI CTRL</text>
        {/* MCU pins left */}
        {[36, 44, 52, 62, 70].map((y, i) => (
          <line key={`ml${i}`} x1="179" y1={y} x2="185" y2={y}
            stroke="#5b7c99" strokeWidth="1.5" />
        ))}
        {/* MCU pins right */}
        {[36, 44, 52, 62, 70].map((y, i) => (
          <line key={`mr${i}`} x1="257" y1={y} x2="263" y2={y}
            stroke="#5b7c99" strokeWidth="1.5" />
        ))}
        {/* Status LED blink */}
        <circle cx="248" cy="36" r="3" fill="#7cffb2">
          <animate attributeName="opacity" values="1;0.1;1"
            dur="1.3s" repeatCount="indefinite" />
        </circle>

        {/* Motor driver */}
        <rect x="185" y="100" width="72" height="38" rx="3"
          fill="#161d1a" stroke="#ffb454" strokeWidth="1.3" />
        <text x="221" y="116" fontFamily="'JetBrains Mono',monospace"
          fontSize="7.5" fill="#ffb454" textAnchor="middle">MOTOR</text>
        <text x="221" y="129" fontFamily="'JetBrains Mono',monospace"
          fontSize="7.5" fill="#ffb454" textAnchor="middle">DRIVER</text>

        {/* Encoder block */}
        <rect x="185" y="155" width="72" height="34" rx="3"
          fill="#161d1a" stroke="#7cffb2" strokeWidth="1.3" />
        <text x="221" y="169" fontFamily="'JetBrains Mono',monospace"
          fontSize="7.5" fill="#7cffb2" textAnchor="middle">ENCODER</text>
        <text x="221" y="181" fontFamily="'JetBrains Mono',monospace"
          fontSize="7.5" fill="#7cffb2" textAnchor="middle">FEEDBACK</text>

        {/* Sensor block */}
        <rect x="185" y="205" width="72" height="34" rx="3"
          fill="#161d1a" stroke="#4f9c73" strokeWidth="1.3" />
        <text x="221" y="219" fontFamily="'JetBrains Mono',monospace"
          fontSize="7.5" fill="#4f9c73" textAnchor="middle">ULTRASONIC</text>
        <text x="221" y="231" fontFamily="'JetBrains Mono',monospace"
          fontSize="7.5" fill="#4f9c73" textAnchor="middle">SENSOR</text>

        {/* Connecting traces between blocks */}
        {/* MCU → Motor driver */}
        <line x1="221" y1="82" x2="221" y2="100"
          stroke="#ffb454" strokeWidth="1.5" />
        {/* MCU → Encoder (feedback loop) */}
        <polyline points="257,62 275,62 275,172 257,172"
          fill="none" stroke="#7cffb2" strokeWidth="1.5" strokeDasharray="4 2" />
        {/* MCU → Sensor */}
        <polyline points="185,66 170,66 170,222 185,222"
          fill="none" stroke="#4f9c73" strokeWidth="1.3" strokeDasharray="3 2" />
        {/* Motor driver → arm (goes left) */}
        <polyline points="185,119 160,119 160,180 148,180"
          fill="none" stroke="#ffb454" strokeWidth="1.5" />

        {/* Signal pulse travelling on MCU→Motor trace */}
        <circle id="hw-pulse" cx="221" cy="88" r="3.5" fill="#ffb454" opacity="0.9">
          <animateMotion dur="1.5s" repeatCount="indefinite">
            <mpath xlinkHref="#hw-ctrl-path" />
          </animateMotion>
        </circle>
        <path id="hw-ctrl-path" d="M221,82 L221,100" fill="none" stroke="none" />

        {/* Encoder feedback pulse */}
        <circle r="3" fill="#7cffb2" opacity="0.85">
          <animateMotion dur="2s" begin="0.4s" repeatCount="indefinite">
            <mpath xlinkHref="#hw-enc-path" />
          </animateMotion>
        </circle>
        <path id="hw-enc-path"
          d="M257,172 L275,172 L275,62 L257,62"
          fill="none" stroke="none" />

        {/* Angle readouts beside arm */}
        <text id="hw-read-s" x="10" y="195"
          fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="#4f9c73">θ1: 0.0°</text>
        <text id="hw-read-e" x="10" y="207"
          fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="#4f9c73">θ2: 0.0°</text>
        <text id="hw-read-w" x="10" y="219"
          fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="#5b7c99">θ3: 0.0°</text>

        {/* ══════════════════════════════════
            RIGHT PANEL — Software / code
            ══════════════════════════════════ */}

        <text x="307" y="16" fontFamily="'JetBrains Mono',monospace"
          fontSize="8" fill="#7cffb2" letterSpacing="0.08em">SOFTWARE</text>
        <line x1="307" y1="20" x2="468" y2="20" stroke="#243029" strokeWidth="1" />

        {/* Code panel background */}
        <rect x="302" y="24" width="170" height="196" rx="3"
          fill="#0e1210" stroke="#243029" strokeWidth="1" />

        {/* Scrolling code lines */}
        <g clipPath="url(#hw-code-clip)">
          <g id="hw-code-scroll">
            {[
              { t: 'void driveStraight(', c: '#7cffb2' },
              { t: '  float dist) {',     c: '#7cffb2' },
              { t: '  float err = dist',  c: '#edefea' },
              { t: '    - encoder();',    c: '#edefea' },
              { t: '  float iErr +=',     c: '#edefea' },
              { t: '    err * dt;',       c: '#edefea' },
              { t: '  // anti-windup',    c: '#647066' },
              { t: '  if (saturated)',    c: '#ffb454' },
              { t: '    iErr = 0;',       c: '#ffb454' },
              { t: '  power = Kp*err',    c: '#edefea' },
              { t: '    + Ki*iErr;',      c: '#edefea' },
              { t: '}',                   c: '#7cffb2' },
              { t: '',                    c: '#647066' },
              { t: 'bool isBrown(',       c: '#5b7c99' },
              { t: '  int sensor) {',     c: '#5b7c99' },
              { t: '  return sensor',     c: '#edefea' },
              { t: '   >= LO_BROWN',      c: '#edefea' },
              { t: '   && sensor',        c: '#edefea' },
              { t: '   <= HI_BROWN;',     c: '#edefea' },
              { t: '}',                   c: '#5b7c99' },
              { t: '',                    c: '#647066' },
              { t: '// 8-state follower', c: '#647066' },
              { t: 'if (state==010)',      c: '#ffb454' },
              { t: '  driveFwd();',       c: '#edefea' },
              { t: 'else if (000)',        c: '#ffb454' },
              { t: '  recovery();',       c: '#edefea' },
              { t: 'else if (110)',        c: '#ffb454' },
              { t: '  pivotLeft();',      c: '#edefea' },
              { t: '',                    c: '#647066' },
              { t: 'void driveStraight(', c: '#7cffb2' },
              { t: '  float dist) {',     c: '#7cffb2' },
              { t: '  float err = dist',  c: '#edefea' },
              { t: '    - encoder();',    c: '#edefea' },
              { t: '  float iErr +=',     c: '#edefea' },
              { t: '    err * dt;',       c: '#edefea' },
            ].map((line, i) => (
              <text
                key={i}
                x="310"
                y={148 + i * 14}
                fontFamily="'JetBrains Mono',monospace"
                fontSize="7.5"
                fill={line.c}
              >
                {line.t}
              </text>
            ))}
          </g>
        </g>

        {/* Cursor blink at bottom of code panel */}
        <rect x="310" y="208" width="5" height="9" fill="#7cffb2">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </rect>

        {/* ── PI chart at bottom of right panel ── */}
        <rect x="302" y="228" width="170" height="44" rx="3"
          fill="#0e1210" stroke="#243029" strokeWidth="1" />
        <text x="310" y="240" fontFamily="'JetBrains Mono',monospace"
          fontSize="7" fill="#647066">error → PI → output</text>

        {/* Mini PI response curve */}
        <polyline
          points="310,265 323,255 333,245 343,251 353,255 363,252 373,251 383,250 393,250 400,250 460,250"
          fill="none" stroke="#7cffb2" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Setpoint line */}
        <line x1="310" y1="250" x2="465" y2="250"
          stroke="#4f9c73" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        {/* Moving dot on curve */}
        <circle r="3" fill="#7cffb2">
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath xlinkHref="#hw-pi-path" />
          </animateMotion>
        </circle>
        <path id="hw-pi-path"
          d="M310,265 C318,248 328,238 338,245 S353,258 363,252 S378,248 400,250 L460,250"
          fill="none" stroke="none" />

        {/* ── Bottom label ── */}
        <text x="12" y="274" fontFamily="'JetBrains Mono',monospace"
          fontSize="8" fill="#647066" letterSpacing="0.04em">
          MECH + ELEC + SOFTWARE — INTEGRATED SYSTEM
        </text>
      </svg>
    </div>
  );
}

// ── Helpers ──
function setLine(id: string, x1: number, y1: number, x2: number, y2: number) {
  const el = document.getElementById(id);
  if (!el) return;
  el.setAttribute('x1', String(x1));
  el.setAttribute('y1', String(y1));
  el.setAttribute('x2', String(x2));
  el.setAttribute('y2', String(y2));
}

function setCircle(id: string, cx: number, cy: number) {
  const el = document.getElementById(id);
  if (!el) return;
  el.setAttribute('cx', String(cx));
  el.setAttribute('cy', String(cy));
}

function setCircleX(id: string, cx: number) {
  const el = document.getElementById(id);
  if (el) el.setAttribute('cx', String(cx));
}

function setText(id: string, value: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}