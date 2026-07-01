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
  )[];
  video?:
    | { embedUrl: string; caption?: string }
    | { src: string; caption?: string; poster?: string; type?: string };
};

export const projects: Project[] = [
  {
    id: 'vex-pi-controller',
    index: '01',
    title: 'VEX Autonomous Navigation',
    subtitle: 'PI-controlled robot navigating a complex course',
    category: 'University',
    period: 'University Project',
    summary:
      'Designed and tuned a PI controller so a VEX robot could autonomously navigate a multi-stage obstacle course, correcting for drift and disturbance in real time.',
    details: [
      'Implemented a proportional-integral (PI) control loop to track heading and distance setpoints, reducing steady-state error from wheel-slip and uneven terrain.',
      'Tuned gains experimentally on-hardware, balancing response speed against overshoot across varied course sections.',
      'Built sensor feedback handling (encoders / IMU) into the control loop to keep the robot on-path through turns and obstacles.',
      'Worked in a small team to integrate control code with mechanical subsystems under competition time pressure.',
    ],
    stack: ['VEX Robotics', 'PI Control', 'C++', 'Sensor Fusion'],
    diagram: 'controller',
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
    image: { src: warmanCardThumb, alt: 'CAD render of the Royal Picker Upper robot arms and central tower' },
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
