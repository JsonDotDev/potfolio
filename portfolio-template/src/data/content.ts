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
import warmanLeaderboard from '../assets/warman/leaderboard.jpg';
import vexCardThumb from '../assets/vex/card-thumbnail.jpg';
import vexDemoRun from '../assets/vex/demo-run.mp4';
import baremetalFSM from '../assets/baremetal/fsm-diagram.png';
import baremetalCircuit from '../assets/baremetal/circuit-diagram.png';
import threadIDDemo from '../assets/threadID/Thread ID Demo Video.mp4';
import threadIDCardThumb from '../assets/threadID/data-collection-setup.png';
import threadIDFinalFidelity from '../assets/threadID/final-ui.jpg';
import threadIDModelTrainingResults from '../assets/threadID/thread-id-results.png';
import threadIDModelTraining from '../assets/threadID/data-augmentation.jpg';
import hoseReelCircuit from '../assets/hosereel/circuit-diagram.png';
import hoseReelCardThumb from '../assets/hosereel/hose-reel-thumbnail.png';
import hoseReelDemo from '../assets/hosereel/hose-reel-demo.mov';


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
  diagram: 'controller' | 'vision' | 'mechanical' | 'firmware' ;
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
      { kind: 'image', src: warmanLeaderboard, alt: 'Competition leaderboard', caption: 'Competition leaderboard — 4th place with a 3.7-second run' },
    ],
    video: {
      src: warmanCompetitionRun,
      label: 'Competition Run',
      caption: 'The Royal Picker Upper — competition run',
    },
  },
  {
    id: 'baremetal-microcontroller',
    index: '03',
    title: 'ATmega328P ADC Performance',
    subtitle: 'Bare-metal C, register-level config, and ADC performance analysis',
    category: 'University',
    period: 'MECHENG 313 — University of Auckland',
    summary:
      'Characterised the ADC performance of the ATmega328P by sampling a 200mHz sawtooth waveform at multiple prescaler values, measuring offset and gain error from datasheet-derived calculations, and identifying the speed-accuracy trade-off — all configured at register level in bare-metal C with no HAL.',
    details: [
      'Configured the ATmega328P ADC entirely at register level — reference voltage selection, prescaler bits, input pin mux — by reading section 23 of the ATmega328P datasheet rather than using Arduino library functions.',
      'Built a finite state machine in firmware: State 0 continuously samples pin A1 at 200 samples/sec into a 1000-sample ring buffer; State 1 halts sampling and transmits the buffer to a PC over USB serial for analysis.',
      'Wired the hardware from scratch: signal generator → 1kΩ resistor → A1 pin, and a voltage divider (two 1kΩ resistors off the 5V rail) to generate a 2.5V AREF reference voltage.',
      'Calculated offset and gain error in LSB at each prescaler value using the method from ATmega328P datasheet section 23.6.3, then plotted results in MATLAB.',
      'Proposed a firmware correction formula to compensate measured offset and gain error: ADC_corrected = (ADC_raw − Offset) × GainFactor, where GainFactor = 255 / (255 − GainError_LSB).',
    ],
    stack: ['C', 'Bare-Metal', 'ATmega328P', 'ADC', 'Datasheets'],
    diagram: 'firmware',
    image: { src: baremetalCircuit, alt: 'Bare-metal ADC circuit' },
    overview: [
      'The goal was to quantify how accurately the ATmega328P\'s built-in ADC could sample an analog signal at different clock speeds — specifically a 200mHz sawtooth waveform (0–2.5V) fed in from a signal generator. The prescaler divides the system clock down to the ADC clock; changing it trades conversion speed for accuracy, and we wanted to measure exactly how much.',
      'Every peripheral was configured by writing directly to registers — ADMUX for reference voltage and input channel, ADCSRA for prescaler bits and enable flags — guided entirely by the ATmega328P datasheet. No library functions abstracted any of this away.',
      'The firmware ran a two-state FSM: in State 0, the ADC sampled pin A1 every 5ms (200 samples/sec) and stored results in a circular ring buffer of 1000 samples, with a 1Hz LED blink as a status indicator. Pressing Button 1 toggled to State 1, which stopped sampling and blinked the LED at 2Hz. Pressing Button 2 in State 1 transmitted the full buffer over serial to a PC, where MATLAB was used to convert raw ADC counts to voltages and compute offset and gain error.',
      'We tested prescaler values of 2, 4, 8, 16, 32, 64, and 128, reconfiguring the ADCSRA register for each run and analysing the resulting data in MATLAB to produce offset error and gain error plots across the prescaler range.',
    ],
    challenges: [
      'Configuring the ADC purely from the datasheet meant there was no error message when a register bit was set incorrectly — just unexpected or absent readings. Misreading the ADMUX reference voltage selection bits early on produced readings that were simply wrong with no obvious indication of why, which required re-reading the relevant datasheet section carefully to spot the mistake.',
      'The 2.5V AREF reference was generated by a voltage divider using 1kΩ resistors with ±5% tolerance, which introduced external measurement uncertainty into the results — meaning some of the measured offset and gain error reflected resistor inaccuracy rather than the ADC\'s intrinsic characteristics alone.',
      'At low prescaler values (prescaler 2), the ADC clock runs at 8MHz — far faster than the 50–200kHz range recommended in the datasheet for full accuracy. The sample-and-hold capacitor doesn\'t fully charge in time, causing the conversion to read a lower voltage than was actually present. Understanding this mechanism (from the datasheet and supporting references) was key to explaining why the offset error reached 2.45 LSB and gain error reached −3.64 LSB at that setting.',
      'Full-scale output (255) was never reached in our data, so gain error at the top of the range had to be approximated using the highest observed transition rather than the true final code transition — a limitation worth noting when comparing results to ideal ADC behaviour.',
    ],
    whatIdDoDifferently: [
      'Use a precision voltage reference IC for AREF instead of a resistor voltage divider — the ±5% resistor tolerance was a meaningful source of external error that partially obscured the ADC\'s intrinsic characteristics, making it harder to attribute results cleanly to the prescaler.',
      'Implement the firmware correction formula (ADC_corrected = (ADC_raw − Offset) × GainFactor) in the actual firmware and measure corrected vs uncorrected error side by side, rather than only proposing it as a recommendation at the end.',
    ],
    gallery: [
      { kind: 'image', src: baremetalFSM, alt: 'FSM diagram', caption: 'Finite State Machine diagram' },
      { kind: 'image', src: baremetalCircuit, alt: 'Circuit', caption: 'Circuitary' },
    ],
  },
  {
    id: 'hydraulic-fitting-cv',
    index: '04',
    title: 'Smart Hose End Thread Identification Tool',
    subtitle: 'YOLOv11 computer vision + PyQt6 desktop app — built for BOA Hydraulics',
    category: 'Internship',
    period: 'BOA Hydraulics — Dec 2025 to Feb 2026',
    summary:
      'Built a desktop application for BOA Hydraulics that identifies hydraulic fitting thread types from photos using three YOLOv11 models (gender, angle, type) combined with user measurements — matching against a 218-fitting catalogue with 0.5mm tolerance and returning ranked results in seconds.',
    details: [
      'Trained three separate YOLOv11 object-detection models from scratch on a custom dataset of ~1100 images: one each for fitting gender (male/female/SAE), angle (straight/45°/90°), and thread type (BSP/JIC/ORFS/SAE flange).',
      'Built a layered PyQt6 desktop application with a 4-page workflow (shape check → type check → measurement input → results), a business logic layer coordinating inference and validation, a camera service running on QThread to prevent UI freezing, and a product lookup service matching against a CSV catalogue.',
      'Designed a hybrid matching algorithm that prioritises user-entered measurements over model predictions — filtering by gender and angle from the model, then matching measurements within ±0.5mm tolerance and returning up to 3 ranked results.',
      'Collected and labelled ~2000 images manually using a structured naming convention (ProductCode_Model_Background_Lighting_Condition), split 70/15/15 into train/validation/test sets using a Python script.',
      'Identified and resolved significant overfitting: initial models trained on white backgrounds achieved high mAP50 but failed on real workshop images. Expanding the dataset to varied backgrounds and lighting conditions fixed generalisation.',
      'All 9 held-out test fittings passed in both indoor and outdoor conditions across the full range of fitting types, with the combined image + measurement approach consistently outperforming image-only detection.',
    ],
    stack: ['Python', 'YOLOv11', 'PyQt6', 'OpenCV', 'PyTorch', 'Computer Vision'],
    diagram: 'vision',
    image: { src: threadIDCardThumb, alt: 'Data Collection Setup' },
    overview: [
      'Beginner hydraulic technicians regularly misidentify thread types — BSP, JIC, ORFS, and SAE flanges can look nearly identical to an untrained eye, and getting it wrong means expensive rework or, worse, a safety risk under pressure. BOA Hydraulics wanted a tool that could put expert-level identification ability in every technician\'s pocket without requiring years of experience to use.',
      'The solution was a desktop application that lets a user photograph a fitting or upload an existing image, runs it through three computer vision models, and combines those predictions with a simple measurement input to return the closest matching product from BOA\'s catalogue of 218 fittings — all within seconds.',
      'The key architectural decision was splitting detection into three separate YOLOv11 models (gender, angle, type) rather than attempting a single multi-output model. This made each task simpler and more accurate, and allowed the results to be combined downstream with different confidence weights. Measurement input was prioritised in the matching logic because it proved more reliable than image prediction alone, with model outputs used to narrow the search space rather than make the final call.',
    ],
    challenges: [
      'The first models trained on clean white-background images converged well in training (mAP50 > 95%) but failed almost completely on real workshop photos. The fix was expanding the dataset to include varied lighting (bright/dim), backgrounds (white/workshop), and conditions (hand-held, hose-attached, standalone) — which required recapturing a significant portion of the dataset and retraining from scratch.',
      'Image-only detection was never reliable enough for production use — similar-looking fittings from different standards are genuinely hard to distinguish visually, especially at different orientations or in poor lighting. This drove the hybrid approach where measurements do the heavy lifting and model predictions constrain the search space.',
      'The catalogue contains 218 fittings with measurements in millimetres, and many fittings differ by only 1–2mm in key dimensions. Setting the matching tolerance too tight (< 0.5mm) produced too many "no match found" results due to measurement error; too loose produced too many false positives. 0.5mm was the sweet spot found through testing.',
      'Running camera capture on the main UI thread caused the interface to freeze during preview. Moving the camera stream to a QThread (PyQt6\'s threading model) fixed this but required careful signal/slot design to pass frames back to the UI without race conditions.',
      'Limited variation in fitting sizes in the training data reduced the model\'s ability to generalise to unseen fittings — the models learned to detect the specific sizes photographed rather than the thread type in general. More size variation in future training runs would address this.',
    ],
    whatIdDoDifferently: [
      'Collect a more size-diverse training dataset from the start — photographing only 23 of 218 fittings meant the models learned features specific to certain sizes. Training on a wider size range would significantly improve generalisation to unseen fittings.',
      'Build the mobile version earlier in the project timeline rather than as a future enhancement — the application was designed to be used in the field, and a phone-native interface would have enabled more realistic testing under actual workshop conditions.',
      'Add a feedback loop to the application that lets technicians flag incorrect predictions, so misclassified real-world cases feed back into improving the model over time rather than relying solely on the initial training set.',
    ],
    gallery: [
      { kind: 'image', src: threadIDFinalFidelity, alt: 'Final Fidelity UI', caption: 'Final Fidelity User Interface' },
      { kind: 'image', src: threadIDModelTrainingResults, alt: 'Model Training Results', caption: 'Model Training Results' },
      { kind: 'image', src: threadIDModelTraining, alt: 'Model Training', caption: 'Model Training Process' },
    ],
    video: {
      src: threadIDDemo,
      label: 'Demo',
      caption: 'Smart Hose End Thread Identification Tool — live demo',
    },
  },
  {
    id: 'horse-reel-redesign',
    index: '05',
    title: 'BOApod Hose Reel System Redesign',
    subtitle: 'Single-motor drive replacing seven — rack-and-pinion selector with Arduino',
    category: 'Internship',
    period: 'BOA Hydraulics — Dec 2025 to Feb 2026',
    summary:
      'Redesigned the BOApod\'s seven-motor hose reel drive system down to a single DC motor with a servo-actuated rack-and-pinion selector mechanism, prototyped entirely in 3D-printed PLA with an Arduino FSM controlling engagement, direction, and reel selection.',
    details: [
      'Designed a single-motor drive architecture: one DC motor drives a shared shaft, with a rack-and-pinion mechanism shifting a sprocket into engagement with the selected hose reel via roller chain — all others remain stationary.',
      'Iterated the chain-ring design from two prototypes: added a retaining disc beside the sprocket (inspired by bicycle chain-retention systems) to prevent the roller chain derailing sideways during lateral sprocket movement.',
      'Replaced an initial solenoid actuator with a rack-and-pinion mechanism after testing confirmed the solenoid couldn\'t generate sufficient force to shift the sprocket under load.',
      'Added a semicircular chain guide beside the sprocket after the first rack-and-pinion prototype allowed the chain to partially disengage during lateral movement — the guide keeps the chain fully seated on the teeth throughout the selector travel.',
      'Simplified the drive shaft from a tapered design (intended to reduce disengagement friction) to a straight shaft after testing showed the taper provided no measurable improvement while increasing manufacturing complexity.',
      'Programmed a 3-state Arduino FSM (Idle / Engage Reel / Drive Reel) coordinating the DC motor via H-Bridge and two servo motors for engagement/disengagement, enforcing single-reel-active-at-a-time and preventing unintended rotation during transitions.',
    ],
    stack: ['3D Printing', 'CAD', 'Arduino', 'Mechanical Design', 'Prototyping', 'H-Bridge Motor Control'],
    diagram: 'mechanical',
    image: { src: hoseReelCardThumb, alt: 'BOApod Hose Reel System Redesign' },
    overview: [
      'The BOApod is a mobile hydraulic service trailer designed for fast on-site hose assembly and repair. Its original design used seven stepper motors — one per hose reel — each independently driven. While functional, this created seven independent failure points, high wiring complexity, inconsistent reel speeds, and significant manufacturing cost.',
      'Working with HaoYu Pang, the goal was to consolidate this down to a single motor while preserving the ability to independently control any individual reel. The solution centres on a shared drive shaft driven by one DC motor, with a servo-actuated rack-and-pinion mechanism that slides a sprocket into mesh with a roller chain on the selected reel. All non-selected reels remain decoupled and stationary.',
      'Every mechanical component — the chain ring, retaining disc, rack-and-pinion assembly, chain guide, and drive shaft — was prototyped in 3D-printed PLA to allow fast iteration. The electronics used an Arduino, H-Bridge motor driver, two servo motors, and push buttons, with firmware implementing a simple three-state FSM to manage reel selection, drive direction, and engagement sequencing.',
    ],
    challenges: [
      'The initial chain ring had no sideways retention — as the modular reel assembly shifted laterally during reel selection, the roller chain could follow and jump off the sprocket teeth entirely, causing unreliable torque transfer. The fix was a retaining disc added flush beside the chain ring to physically block the chain from moving sideways, a solution borrowed directly from bicycle chain-retention design.',
      'A solenoid was the first choice for actuating the sprocket into position because of its simplicity. Physical testing showed it couldn\'t generate enough force to push the sprocket under realistic load — not enough linear force for the required travel. This required a complete rethink of the actuation method, which led to the rack-and-pinion mechanism.',
      'The first rack-and-pinion prototype worked for engagement, but the sprocket\'s side-to-side travel during selection caused the chain to partially lift off the teeth and occasionally disengage. Adding a semicircular chain guide beside the sprocket — again drawing on bicycle chain-guide design — solved this by physically constraining the chain\'s path during the lateral shift.',
      'A tapered drive shaft was designed to reduce friction between the shaft and disengaged sprockets, preventing unintended rotation when a reel wasn\'t selected. After prototyping and testing, the taper produced no measurable improvement over a plain straight shaft — the sprocket disengaged just as cleanly without it. The tapered version was dropped, simplifying the part and reducing machining cost.',
      'Managing the 3D printing queue was a genuine project constraint. Each design iteration required a print run, and a shared, limited printer meant that poorly sequenced design decisions — printing a full assembly only to find a single feature needed changing — could cost most of a day. This forced more deliberate upfront thinking before committing each part to print.',
    ],
    whatIdDoDifferently: [
      'Prototype only the specific feature being tested rather than reprinting full assemblies — several prints were full mechanism builds when only one subsystem (the chain guide, the shaft taper) was actually changing, wasting significant print time.',
      'Test actuation force requirements on the bench before committing to a mechanism — quantifying the force needed to shift the sprocket under load earlier would have ruled out the solenoid on paper before building and testing a physical prototype.',
      'Design parts to be printed in smaller separable sections — large single-piece prints have higher failure rates and longer recovery times. Splitting into joinable sections would have reduced the cost of a failed print significantly.',
    ],
    gallery: [
      { kind: 'image', src: hoseReelCircuit, alt: 'Circuit Diagram', caption: 'Circuit Diagram' },
    ],
    video: {
      src: hoseReelDemo,
      label: 'Demo',
      caption: 'BOApod Hose Reel System Redesign — demo run',
    },
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
    items: ['YOLOv11', 'PyQt6', 'Python'],
  },
  { label: 'Hardware & Prototyping', 
    items: ['3D printing', 'Laser cutting', 'CAD modelling', 'Soldering', 'Mechanical design iteration', 'Resource-constrained scheduling'] 
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
