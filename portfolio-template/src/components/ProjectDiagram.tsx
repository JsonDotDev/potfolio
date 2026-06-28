// Schematic-style placeholder diagrams for each project category.
// Swap these out for real screenshots later by replacing the <ProjectDiagram>
// usage in ProjectCard.tsx with an <img> tag.

type DiagramProps = {
  kind: 'controller' | 'vision' | 'mechanical' | 'firmware';
};

export default function ProjectDiagram({ kind }: DiagramProps) {
  switch (kind) {
    case 'controller':
      return <ControllerDiagram />;
    case 'vision':
      return <VisionDiagram />;
    case 'mechanical':
      return <MechanicalDiagram />;
    case 'firmware':
      return <FirmwareDiagram />;
    default:
      return null;
  }
}

// PI control loop block diagram
function ControllerDiagram() {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PI control loop block diagram">
      <rect x="0" y="0" width="400" height="220" fill="var(--bg-raised)" />
      {/* grid */}
      <g stroke="var(--line-soft)" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="220" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 55} x2="400" y2={i * 55} />
        ))}
      </g>

      {/* setpoint */}
      <text x="20" y="113" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-faint)">r(t)</text>
      <line x1="44" y1="110" x2="80" y2="110" stroke="var(--text-dim)" strokeWidth="1.5" markerEnd="url(#arrow)" />

      {/* sum junction */}
      <circle cx="92" cy="110" r="12" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="92" y="114" fontFamily="var(--font-mono)" fontSize="11" fill="var(--accent)" textAnchor="middle">Σ</text>
      <line x1="104" y1="110" x2="140" y2="110" stroke="var(--text-dim)" strokeWidth="1.5" markerEnd="url(#arrow)" />

      {/* PI block */}
      <rect x="140" y="86" width="90" height="48" rx="3" fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="185" y="106" fontFamily="var(--font-mono)" fontSize="11" fill="var(--accent)" textAnchor="middle">PI</text>
      <text x="185" y="120" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-dim)" textAnchor="middle">Kp·e + Ki∫e</text>
      <line x1="230" y1="110" x2="270" y2="110" stroke="var(--text-dim)" strokeWidth="1.5" markerEnd="url(#arrow)" />

      {/* Plant block */}
      <rect x="270" y="86" width="90" height="48" rx="3" fill="var(--bg-card)" stroke="var(--blueprint)" strokeWidth="1.5" />
      <text x="315" y="110" fontFamily="var(--font-mono)" fontSize="10.5" fill="var(--blueprint)" textAnchor="middle">ROBOT</text>
      <line x1="360" y1="110" x2="390" y2="110" stroke="var(--text-dim)" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="370" y="100" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-faint)">y(t)</text>

      {/* feedback path */}
      <line x1="385" y1="110" x2="385" y2="180" stroke="var(--text-faint)" strokeWidth="1.5" />
      <line x1="385" y1="180" x2="92" y2="180" stroke="var(--text-faint)" strokeWidth="1.5" />
      <line x1="92" y1="180" x2="92" y2="122" stroke="var(--text-faint)" strokeWidth="1.5" markerEnd="url(#arrow-faint)" />
      <text x="200" y="195" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-faint)" textAnchor="middle">encoder / IMU feedback</text>
      <text x="92" y="124" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-faint)" textAnchor="middle">−</text>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-dim)" />
        </marker>
        <marker id="arrow-faint" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-faint)" />
        </marker>
      </defs>
    </svg>
  );
}

// Object-detection bounding box diagram
function VisionDiagram() {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Computer vision detection diagram">
      <rect x="0" y="0" width="400" height="220" fill="var(--bg-raised)" />
      <g stroke="var(--line-soft)" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="220" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 55} x2="400" y2={i * 55} />
        ))}
      </g>

      {/* scan frame */}
      <rect x="40" y="30" width="320" height="160" fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="4 3" />

      {/* detected object 1 */}
      <rect x="80" y="60" width="100" height="70" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <rect x="80" y="46" width="90" height="16" fill="var(--accent)" />
      <text x="86" y="58" fontFamily="var(--font-mono)" fontSize="9.5" fill="#0a120d" fontWeight="600">FITTING_A 0.94</text>

      {/* detected object 2 */}
      <rect x="220" y="100" width="90" height="60" fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth="1.5" />
      <rect x="220" y="86" width="84" height="16" fill="var(--amber)" />
      <text x="226" y="98" fontFamily="var(--font-mono)" fontSize="9.5" fill="#0a120d" fontWeight="600">FITTING_B 0.88</text>

      {/* corner reticles */}
      {[[40, 30], [360, 30], [40, 190], [360, 190]].map(([cx, cy], i) => (
        <g key={i} stroke="var(--blueprint)" strokeWidth="1.5">
          <line x1={cx - 8} y1={cy} x2={cx + (cx < 200 ? 8 : -8)} y2={cy} />
          <line x1={cx} y1={cy - 8} x2={cx} y2={cy + (cy < 110 ? 8 : -8)} />
        </g>
      ))}

      <text x="200" y="206" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--text-faint)" textAnchor="middle">YOLOv11 — inference preview</text>
    </svg>
  );
}

// Exploded CAD / mechanical assembly diagram
function MechanicalDiagram() {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mechanical CAD exploded view diagram">
      <rect x="0" y="0" width="400" height="220" fill="var(--bg-raised)" />
      <g stroke="var(--line-soft)" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="220" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 55} x2="400" y2={i * 55} />
        ))}
      </g>

      {/* exploded parts stack */}
      <g>
        <rect x="140" y="30" width="120" height="22" rx="2" fill="var(--bg-card)" stroke="var(--blueprint)" strokeWidth="1.5" />
        <line x1="150" y1="52" x2="150" y2="80" stroke="var(--text-faint)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="250" y1="52" x2="250" y2="80" stroke="var(--text-faint)" strokeWidth="1" strokeDasharray="3 3" />

        <rect x="130" y="80" width="140" height="30" rx="2" fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="1.5" />
        <line x1="145" y1="110" x2="145" y2="140" stroke="var(--text-faint)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="255" y1="110" x2="255" y2="140" stroke="var(--text-faint)" strokeWidth="1" strokeDasharray="3 3" />

        <rect x="120" y="140" width="160" height="36" rx="2" fill="var(--bg-card)" stroke="var(--amber)" strokeWidth="1.5" />

        {/* center bolt line */}
        <line x1="200" y1="20" x2="200" y2="186" stroke="var(--text-faint)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
      </g>

      <text x="40" y="44" fontFamily="var(--font-mono)" fontSize="9" fill="var(--blueprint)">CAP</text>
      <text x="40" y="98" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent)">BODY</text>
      <text x="40" y="161" fontFamily="var(--font-mono)" fontSize="9" fill="var(--amber)">BASE</text>

      <text x="200" y="206" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--text-faint)" textAnchor="middle">exploded assembly — print-ready</text>
    </svg>
  );
}

// Register / memory map firmware diagram
function FirmwareDiagram() {
  const rows = [
    { addr: '0x4002_1000', name: 'GPIOA_MODER', val: '10' },
    { addr: '0x4002_1004', name: 'GPIOA_OTYPER', val: '00' },
    { addr: '0x4001_0000', name: 'TIM2_CR1', val: '01' },
    { addr: '0x4001_0400', name: 'USART1_BRR', val: '34' },
  ];
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Microcontroller register map diagram">
      <rect x="0" y="0" width="400" height="220" fill="var(--bg-raised)" />
      <g stroke="var(--line-soft)" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="220" />
        ))}
      </g>

      <text x="36" y="34" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-dim)" fontWeight="600">REGISTER MAP</text>
      <line x1="36" y1="42" x2="364" y2="42" stroke="var(--line)" strokeWidth="1" />

      {rows.map((r, i) => (
        <g key={r.addr}>
          <text x="36" y={68 + i * 32} fontFamily="var(--font-mono)" fontSize="10" fill="var(--blueprint)">{r.addr}</text>
          <text x="160" y={68 + i * 32} fontFamily="var(--font-mono)" fontSize="10" fill="var(--text)">{r.name}</text>
          <rect x="320" y={56 + i * 32} width="44" height="18" rx="2" fill={i === 1 ? 'var(--accent-soft)' : 'var(--bg-card)'} stroke={i === 1 ? 'var(--accent)' : 'var(--line)'} strokeWidth="1" />
          <text x="342" y={69 + i * 32} fontFamily="var(--font-mono)" fontSize="9.5" fill={i === 1 ? 'var(--accent)' : 'var(--text-dim)'} textAnchor="middle">{r.val}</text>
        </g>
      ))}

      <text x="200" y="206" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--text-faint)" textAnchor="middle">datasheet → register-level config</text>
    </svg>
  );
}
