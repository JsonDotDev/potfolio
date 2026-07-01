// ─────────────────────────────────────────────────────────────────────────
// SITE CONTENT
// Edit everything in this file to make the site yours. No need to touch
// any component code for text changes — just update the values below.
// ─────────────────────────────────────────────────────────────────────────
import warmanCardThumb from '../assets/warman/card-thumbnail.jpg';
import warmanHeroRobot from '../assets/warman/hero-robot.jpg';
import warmanDragon from '../assets/warman/dragon-backboard.jpg';
import warmanFinalArms from '../assets/warman/final-arms.jpg';
import warmanCompetitionRun from '../assets/warman/competition-run.mov';
import warmanWiring from '../assets/warman/wiring-diagram.jpg';
import vexCardThumb from '../assets/vex/card-thumbnail.jpg';
import vexDemoRun from '../assets/vex/demo-run.mp4';


export const profile = {
  name: 'Jason Chieng',
  role: 'Mechatronics Engineering Student',
  tagline:
    'I build systems that sense, decide, and move — from control loops on bare-metal microcontrollers to computer-vision tools used in industry.',
  location: 'Based in Auckland, New Zealand',
  email: 'jasonchieng99@email.com',
  linkedin: 'https://linkedin.com/in/jason-chieng',
  resumeUrl: '/resume.pdf', // drop your resume PDF into /public and keep this path
  status: 'Open to graduate & internship roles',
};

export type Stack = {
  label: string;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'University' | 'Internship';
  period: string;
  summary: string;
  details: string[];
  stack: string[];
  diagram: 'controller' | 'vision' | 'mechanical' | 'firmware';
  links?: { label: string; href: string }[];

  // Optional: real photo for the card + case study hero
  image?: { src: string; alt: string };

  // Optional case-study-only fields
  overview?: string[];
  challenges?: string[];
  whatIdDoDifferently?: string[];
  gallery?: (
    | { kind: 'diagram'; diagram: 'controller' | 'vision' | 'mechanical' | 'firmware'; caption?: string }
    | { kind: 'image'; src: string; alt: string; caption?: string }
    | { kind: 'video'; src: string; caption?: string; poster?: string; type?: string }
  )[];
  video?:
    | { embedUrl: string; caption?: string; label?: string }
    | { src: string; caption?: string; label?: string; poster?: string; type?: string };
};

export const projects: Project[] = [
  {
    id: 'vex-pi-controller',
    index: '01',
    title: 'VEX Autonomous Warehouse Robot',
    subtitle: 'PI-controlled navigation, line following, and payload delivery',
    category: 'University',
    period: 'MECHENG 201 — University of Auckland',
    summary:
      'Built an autonomous warehouse robot in C++ on VEX hardware with a group partner, implementing a PI-controlled drive system with anti-windup, a 3-sensor line follower with full 8-state logic and recovery, and ultrasonic positioning — completing a full pickup-and-delivery loop reliably across two demo sessions.',
    details: [
      'Implemented driveStraight using a PI controller that simultaneously corrects distance error and wheel imbalance from encoder counts, with smooth acceleration ramping and an anti-windup mechanism to prevent integrator saturation.',
      'Built a full 8-state line follower using three light sensors: straight driving (010), gentle curves (100/001), sharp pivots (110/011), line-lost recovery (000), stuck-in-corner handling (101/111).',
      'Wrote a recovery() routine using lastTurnDirection memory so the robot could relocate a lost brown line by rotating back in its last known turning direction.',
      'Implemented driveUltraSonic with up to 3 retry attempts on invalid sensor readings, and used it for precise payload pickup (400mm) and drop-off (390mm from wall).',
      'Added slack compensation to rotateRobotAngle — passing an offset angle to counteract surface slippage and achieve accurate net rotation on taped floors.',
      'Designed adaptive path planning: stored the actual pickup distance as d1, then reversed exactly d1+50mm to re-align the pivot point with the brown line regardless of payload position.',
    ],
    stack: ['C++', 'VEX Robotics', 'PI Control', 'Encoder Feedback', 'Ultrasonic Sensing', 'Line Following'],
    diagram: 'controller',
    image: { src: vexCardThumb, alt: 'VEX robot on the competition floor' },
    overview: [
      'Contracted (fictionally) by the Dairy Industry Cooperative, me and my group partner were tasked with building a fully autonomous robot that could leave a charging station, navigate to a predetermined pickup point, collect a fragile payload, follow a line to the drop-off zone, deposit the payload accurately in the centre of the target, and return to its start position — all without human input.',
      'The project was split into two distinct sub-problems: reliable straight-line and rotational movement (solved with PI/P controllers and encoder feedback), and accurate navigation along a course defined by a brown line and black stop markers (solved with a 3-sensor line follower). Getting both to work together consistently was the core engineering challenge.',
      'The robot completed the full course twice in the first demonstration session. After tuning speed and drop-off distance between sessions, it ran faster and more accurately in the second session.',
    ],
    challenges: [
      'Pure encoder-based navigation proved unreliable over longer distances — wheel slip and backlash caused small errors to accumulate, leading to inconsistent final positioning. This drove the decision to use the brown line as the primary navigation reference for the delivery leg, since it provides a constant external reference unaffected by the robot\'s hardware variability.',
      'Light sensor readings were occasionally inconsistent during the 90° right turn on demo day — in some runs the robot missed the brown line entirely. The root cause was brown detection thresholds needing tighter calibration for that specific section of the course.',
      'The PI controller\'s integrator would saturate the motors when error was large, causing overshoot. Implementing anti-windup (stopping integration when motors are already at their power limit) fixed this and significantly improved stopping accuracy.',
      'Line following broke down when the robot lost the brown line mid-turn (000 case) — the naive approach of just stopping didn\'t work since the robot was mid-rotation. The recovery() routine using lastTurnDirection memory solved this by continuing the turn in the correct direction until any sensor re-detected the line.',
      'Starting line following from a stationary position on the black line was impossible since the robot couldn\'t detect the brown line from that position. The searchBrown() function handled this by first moving forward, then performing a left-right sweeping manoeuvre if the line still wasn\'t found, ensuring the robot located the brown line every time.',
    ],
    whatIdDoDifferently: [
      'Tune the brown detection thresholds more carefully on the actual competition surface before the demo, rather than relying on values calibrated in a different environment — this was the direct cause of the inconsistent 90° turn readings.',
      'Replace the if/else if chain in the line following function with a switch-case statement from the start — the report flagged this as a code speed and efficiency improvement we didn\'t have time to implement.',
      'Add a helper function that aligns all three sensors with the black line before the payload drop-off, for more repeatable final positioning. We knew this would be more robust than relying on line following alone to straighten the robot, but our line follower was accurate enough that we deprioritised it.',
    ],
    video: {
      src: vexDemoRun,
      label: 'Demo Run',
      caption: 'Vex Robot — Demo run',
    },
    
  },
  {
    id: 'warman-mini',
    index: '02',
    title: 'The Royal Picker Upper',
    subtitle: '235 Design & Build — castle-themed pod-collection robot',
    category: 'University',
    period: 'University Project',
    summary:
      'Designed and built a castle-themed robot with a team of four to autonomously collect and deliver pods into an incinerator, placing 4th overall with a 3.7-second run.',
    details: [
      'Owned circuit design and manufacture: wiring layout, colour-coding, soldering, and heat-shrinking all electrical connections.',
      'Designed and manufactured the ramp mechanism end-to-end — CAD modelling, laser-cutting MDF, and assembly — including a backup ramp used in the final robot.',
      'Converted CAD models into laser-cutter-ready files for multiple subsystems.',
      'Assisted the team with debugging, component testing, and full robot assembly.',
      'Contributed to project documentation and report writing.',
    ],
    stack: ['Mechanical Design', 'CAD', 'Laser Cutting', 'Circuit Design', 'Soldering', 'Arduino', 'Teamwork'],
    diagram: 'mechanical',
    image: { src: warmanCardThumb, alt: 'The Royal Picker Upper robot arms and central tower' },
    overview: [
      '"The Royal Picker Upper" was built with teammates and it is our entry to a 235-style design-and-build competition: a fully mechanical robot that had to autonomously pick up pods (tennis balls) from two different heights and deliver them into an incinerator as quickly and reliably as possible.',
      'We leaned into a castle theme — laser-cut brick-pattern walls, a hand-painted dragon guarding its hoard on the backboard, a red "carpet" ramp, and a hidden Shrek-inspired donkey easter egg. The theme gave the team a shared identity to design around and made the robot far more memorable to judges.',
      'On competition day, despite an unexpected battery connection issue during setup (a soldered plug had broken — we caught it and swapped a backup in just before our run), the robot performed as intended both times and delivered a final time of 3.7 seconds, placing 4th overall.',
    ],
    challenges: [
      'Early arm designs were too heavy — we iterated through four major revisions, cutting weight-saving slots and reworking geometry until the torque requirements were actually achievable by the motors.',
      'The first ramp concept used spring-loaded extending poles that needed multiple 3D-printed iterations, but proved inconsistent: pods would spin unpredictably or the poles would release at wrong angles. We scrapped it for a simpler "red carpet" ramp that used the pod\'s own momentum and gravity instead of extra mechanisms.',
      'Initial wiring had no colour-coding and several exposed connections that were genuinely hard to debug. I led the rework into a consistent colour scheme (black/ground, red/power, purple and green/signal, blue/limit switches) and added heat-shrink over every exposed joint.',
      'Balancing efficiency, manufacturing cost, aesthetics, time to manufacture, and maintainability across four competing early concepts using a weighting and valuation matrix before committing to a final direction.',
    ],
    whatIdDoDifferently: [
      'Prototype two competing ramp concepts in parallel from the start — we spent too long on the spring-loaded design before confirming it was unreliable. An earlier parallel build would have de-risked that decision much sooner.',
      'Mount the motor driver and battery plug permanently to the backboard — loose connections were the cause of the pre-run scare on competition day.',
    ],
    gallery: [
      { kind: 'image', src: warmanHeroRobot, alt: 'Final built robot on the competition floor', caption: 'The finished robot ready for competition' },
      { kind: 'image', src: warmanDragon, alt: 'Hand-painted dragon on the robot backboard', caption: 'Hand-painted dragon backboard — guarding its hoard' },
      { kind: 'image', src: warmanFinalArms, alt: 'Final arm mechanism during testing', caption: 'Final arm mechanism during testing' },
      { kind: 'image', src: warmanWiring, alt: 'Colour-coded wiring diagram', caption: 'Colour-coded wiring — black/ground, red/power, purple+green/signal, blue/limit switches' },
    ],
    video: {
      src: warmanCompetitionRun,
      label: 'Competition Run',
      caption: 'The Royal Picker Upper — competition run',
    },
  },
  {
    id: 'matlab-image-filter',
    index: '03',
    title: 'Image Filtering in MATLAB',
    subtitle: 'Signal & image processing coursework',
    category: 'University',
    period: 'University Coursework',
    summary:
      'Implemented image filters in MATLAB, building intuition for spatial-domain and frequency-domain filtering techniques used widely in vision and signal-processing systems.',
    details: [
      'Coded convolution-based filters from first principles rather than relying solely on built-in toolbox functions.',
      'Explored the effect of kernel choice and filter parameters on noise reduction and edge preservation.',
      'Built a foundation in image processing that later carried directly into computer-vision work during internship.',
    ],
    stack: ['MATLAB', 'Image Processing', 'Linear Algebra'],
    diagram: 'vision',
  },
  {
    id: 'baremetal-microcontroller',
    index: '04',
    title: 'Bare-Metal Microcontroller Programming',
    subtitle: 'Register-level C, no HAL, no shortcuts',
    category: 'University',
    period: 'University Coursework',
    summary:
      'Programmed a microcontroller in C at the register level — no hardware abstraction layer — which forced a close reading of datasheets to configure peripherals correctly.',
    details: [
      'Learned to navigate datasheets and reference manuals to configure registers directly for GPIO, timers, and communication peripherals.',
      'Debugged at the hardware/software boundary, building a mental model of how C code maps to physical pin and register behaviour.',
      'Developed comfort with low-level systems work that underpins reliable embedded development.',
    ],
    stack: ['C', 'Bare-Metal', 'Datasheets', 'Embedded Systems'],
    diagram: 'firmware',
  },
  {
    id: 'hydraulic-fitting-cv',
    index: '05',
    title: 'Hydraulic Fitting Identification Tool',
    subtitle: 'Computer vision for parts ID, built in industry',
    category: 'Internship',
    period: 'Industry Internship',
    summary:
      'Built a desktop tool that identifies hydraulic fittings from images using a YOLOv11 object-detection model, with a PyQt6 interface so non-technical staff could use it on the shop floor.',
    details: [
      'Trained and integrated a YOLOv11 model to detect and classify hydraulic fitting types from camera input.',
      'Designed and built the application UI in PyQt6, focused on a simple workflow for staff with no coding background.',
      'Wrote the Python backend connecting model inference, image handling, and the UI layer into one tool.',
      'Worked through the practical gap between a model that performs well in testing and a tool that performs reliably in daily use.',
    ],
    stack: ['Python', 'YOLOv11', 'Computer Vision', 'PyQt6'],
    diagram: 'vision',
  },
  {
    id: 'horse-reel-redesign',
    index: '06',
    title: 'Horse Reel System Redesign',
    subtitle: 'Prototyping under real manufacturing constraints',
    category: 'Internship',
    period: 'Industry Internship',
    summary:
      'Redesigned and prototyped a horse-reel system, learning to plan around the realities of 3D-printing lead times rather than around the design alone.',
    details: [
      'Designed prototype iterations and produced them via 3D printing, validating fit and function before committing to further changes.',
      'Managed project timelines around a shared, limited 3D printer — print queue time became the real constraint, not design time.',
      'Learned to sequence design decisions to minimise costly reprints when iteration speed was the bottleneck.',
    ],
    stack: ['3D Printing', 'CAD', 'Prototyping', 'Project Planning'],
    diagram: 'mechanical',
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { label: 'Programming Languages', items: ['C', 'C++', 'Python', 'MATLAB'] },
  {
    label: 'Embedded & Controls',
    items: ['Bare-metal MCU programming', 'PI control', 'Datasheet-level register config', 'Sensor integration'],
  },
  {
    label: 'Computer Vision & Software',
    items: ['YOLOv11', 'PyQt6', 'Python', 'Image filtering & processing'],
  },
  { label: 'Hardware & Prototyping', 
    items: ['3D printing / FDM', 'Laser cutting', 'CAD modelling', 'Soldering', 'Mechanical design iteration', 'Resource-constrained scheduling'] 
  },
];

export const experience = [
  {
    id: 'internship',
    role: 'Engineering Intern',
    org: 'BOA Hydraulics',
    period: '2025 - 2026',
    points: [
      'Built a YOLOv11-based computer vision tool with a PyQt6 interface for identifying hydraulic fittings on-site.',
      'Redesigned and prototyped a horse reel system, iterating via 3D printing under tight resource and time constraints.',
    ],
  },
  {
    id: 'university',
    role: 'Mechatronics Engineering Student',
    org: 'University of Auckland',
    period: '2024 - Present',
    points: [
      'Coursework and project work spanning control systems, embedded C, image processing, and mechanical design.',
      'Hands-on robotics and competition projects applying control theory to physical systems.',
    ],
  },
];
