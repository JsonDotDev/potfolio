// ─────────────────────────────────────────────────────────────────────────
// SITE CONTENT
// Edit everything in this file to make the site yours. No need to touch
// any component code for text changes — just update the values below.
// ─────────────────────────────────────────────────────────────────────────

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
  index: string; // e.g. '01'
  title: string;
  subtitle: string;
  category: 'University' | 'Internship';
  period: string;
  summary: string;
  details: string[]; // bullet points — what you built / what you learned
  stack: string[];
  diagram: 'controller' | 'vision' | 'mechanical' | 'firmware'; // which placeholder graphic to render
  links?: { label: string; href: string }[];
  overview?: string[];
  challenges?: string[];
  whatIdDoDifferently?: string[];
  gallery?: ('controller' | 'vision' | 'mechanical' | 'firmware')[];
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
    title: 'Mini WARMAN Competition',
    subtitle: 'Slurry-pump design challenge, scaled down',
    category: 'University',
    period: 'University Project',
    summary:
      'Contributed to a scaled-down version of the WARMAN Design & Build Competition, applying mechanical design and project-delivery skills to a slurry-handling system under tight constraints.',
    details: [
      'Collaborated within a team to design, build, and test a mechanical system against a fixed competition brief and budget.',
      'Iterated on design choices through hands-on prototyping and testing cycles.',
      'Practiced translating a design brief into manufacturable components under real time pressure.',
    ],
    stack: ['Mechanical Design', 'Teamwork', 'Prototyping', 'CAD'],
    diagram: 'mechanical',
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
  {
    label: 'Hardware & Prototyping',
    items: ['3D printing', 'CAD modelling', 'Mechanical design iteration', 'Resource-constrained scheduling'],
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
