/* EDIT THIS FILE: all project copy, media, and measurements live here.
   Use numbers (without units) for measurements; keep unknowns as.
   Paths are relative to index.html. No server, imports, or fetch are needed. */
window.RADIO_CONTENT = {
  // Identity, dates, repository, and the opening story. Replace repo with your HTTPS URL.
  project: {
    name: 'هنا القاهرة', transliteration: 'HUNA AL-QAHIRA', team: '14',
    tagline: 'Making the invisible audible.',
    // Opening exhibit: the real bench photo, a short headline and two routes into the build.
    exhibit: { kicker: 'COPPER. CURIOSITY. CAIRO.', headline: 'A small circuit. An invisible world.', detail: '75 turns / 3 students / 1 radio', action: 'Explore the circuit', signalLink: 'Follow the signal' },
    intro: 'A coil of copper wire. A handful of components. A signal waiting to become sound. We’re three students building a medium-wave radio—and keeping the notes we wish we had at the start.',
    members: ['Rawan Kotb', 'Bassel Mostafa', 'Noureldin Islam'],
    department: 'SBME Department', course: 'ELEG103 · Analog and Digital Electronics',
    term: 'Fall 2026', date: '2026-11-09', dateLabel: '09 November 2026',
    repo: 'https://github.com/Noureldin-Islam-2006/DIY_Radio', source: 'LAB2.pdf', capacitorGuide: {src:'assets/m1/variable-cap.pdf',label:'Variable capacitor pinout guide ↗'},
    hero: { src: 'assets/m1/setup.jpg', alt: 'Hand-wound copper coil on a PVC pipe, tuning capacitor, breadboards, and oscilloscope probes on our workbench.', caption: '01 / On the bench · Our tuner and detector taking shape.' }
  },
  // Interactive signal story: illustrative shapes, not oscilloscope readings. Add stages here.
  signalStory: {
    eyebrow: 'AN INVISIBLE JOURNEY', title: 'From the air. To your ears.',
    intro: 'Select a stage and see what changes. Two pieces belong to M1; the rest show where our radio is heading.',
    controls: 'Explore the radio signal path', screenLabel: 'SIGNAL STUDY / NOT TO SCALE',
    note: 'Illustrative waveforms · not measured data', next: 'Next stage',
    stages: [
      {name:'Airwaves',status:'The starting point',wave:'air',title:'Many signals. One piece of wire.',text:'Different radio signals reach the receiver together. Our first task is to pick out a narrow band around the station we want.',waveAlt:'Illustration of several oscillations added together.'},
      {name:'Tune',status:'M1 · tank circuit',wave:'tuned',title:'Choose a frequency.',text:'The coil and capacitor exchange energy. Near resonance, the tank responds strongly; turning the capacitor changes the frequency it selects.',waveAlt:'Illustrative carrier oscillations inside a slowly changing amplitude envelope.'},
      {name:'RF gain',status:'Later stage',wave:'gain',title:'Give the carrier a little help.',text:'A later amplifier will increase the selected radio-frequency signal before detection. This is a planned stage, not a measured result from our build.',waveAlt:'The illustrative amplitude-modulated carrier with increased amplitude.'},
      {name:'Detect',status:'M1 · diode + RC',wave:'detected',title:'Keep the shape. Lose the carrier.',text:'The diode charges the capacitor near the peaks. The resistor lets it discharge between them, following the envelope that carries the audio.',waveAlt:'A slowly varying positive envelope without the fast carrier oscillations.'},
      {name:'Audio + sound',status:'Later stages',wave:'audio',title:'Make the message audible.',text:'Later audio stages will amplify the recovered signal and drive an output transducer. This simplified view shows the audio variation around its average level.',waveAlt:'An illustrative low-frequency audio waveform centred around zero.'}
    ]
  },
  // Interface labels can also be edited here without changing rendering logic.
  ui: {
    sectionNav: 'In this chapter', journal: 'THE RADIO BUILD LOG', team: 'TEAM', read: 'Follow the build',
    source: 'Read the lab brief ↗', overview: 'FROM AIRWAVES TO SOUND',
    overviewTitle: 'One radio. Built in stages.',
    overviewText: 'M1 gives us two pieces of the signal chain: select a frequency, then recover its envelope. Later stages will add the gain needed to bring weak signals to life.',
    progress: 'Milestone progress', done: 'done', soon: 'Soon', milestones: 'Build milestones',
    objective: 'The objective', journey: 'The journey', theory: 'A little theory, a lot of meaning',
    problems: 'What got in the way', results: 'The bench notes',
    learned: 'What we learned', next: 'Next on the bench', gallery: 'From the workbench',
    galleryHint: 'Select a photograph to take a closer look. Videos play only when you ask.',
    problem: 'Problem', why: 'Why it happened', solution: 'How we solved it',
    code: 'The sketch we tried', predictions: 'Table 4 · Predictions',
    tank: 'Table 5 · Tank measurements', detector: 'Table 6 · Detector response at f₀',
    quantity: 'Quantity', value: 'Value', sourceAmplitude: 'Source amplitude (V)',
    tp1: 'TP1 peak (mV)', tp3: 'TP3 DC (mV)',
    comparison: 'Predicted vs measured', prediction: 'Prediction', measured: 'Measured', error: 'Error (%)',
    errorFormula: 'Signed error = 100 × (prediction − measured) / measured. Values must use the same unit; a zero measured value has no defined percentage error.',
    chart: 'The detector’s response', chartEmpty: 'No measured data yet.',
    chartNote: 'Only entered measurements are plotted. At small TP1 peaks, look for a nearly flat TP3 region: the diode’s dead zone. No assumed threshold or invented curve is added.',
    chartAxisX: 'TP1 peak (mV)', chartAxisY: 'TP3 DC (mV)',
    mediaMissing: 'Awaiting a bench capture', loadEmbed: 'Load external video',
    embedNote: 'Loading connects to the video provider.',
    footer: 'Made by hand. Documented as we go.', repository: 'GitHub repository ↗',
    theme: 'Change colour theme', themes: ['System', 'Light', 'Dark'],
    print: 'Print this milestone', plannedNote: 'The next chapter is still on the drawing board.'
  },
  // Workbench copy and part catalogue. Illustrations are AI reconstructions, not bench evidence.
  workbench: {
    title: 'Take the radio apart.', eyebrow: 'THE INTERACTIVE WORKBENCH',
    intro: 'Meet the pieces before following the build. Turn the assembly, lift its components apart, and discover how a small change in capacitance changes the frequency we hear.',
    modelNote: 'Photo-informed 3D reconstruction · nominal dimensions · illustrative placement. Use the schematic for electrical connections, not the model’s breadboard holes.',
    imageNote: 'Reference photographs and original instrument diagrams. The 3D reconstruction follows visible shapes; unmeasured dimensions and wire routing remain approximate.',
    parts: [
      {id:'coil',name:'The hand-wound coil',short:'Coil',value:'75 turns · Ø 60 mm',image:'assets/m1/setup.jpg',role:'Stores energy in a magnetic field. Together with the tuning capacitor, it chooses the resonant frequency.',detail:'Our pale PVC former, copper winding, and black tape are reconstructed from the bench photographs. The model uses the team-confirmed 60 mm diameter, the confirmed 75 main-coil turns, and the team-confirmed 29 mm axial winding length. Both windings share this PVC former: the 75-turn band is 29 mm wide, and the five-turn band is below it. The axial gap is illustrated as about 24 mm; its exact value and the pipe height are not measured. Four leads connect the two electrically separate windings.',connection:'Two receiver leads go to TP1 and ground; the other two leads belong to the generator winding.'},
      {id:'tuning-capacitor',name:'The tuning capacitor',short:'Tuner',value:'20–280 pF',image:'assets/components/tuning-capacitor-reference.png',role:'Changes the electric energy stored in the tank. More capacitance moves resonance down the dial.',detail:'The square housing and shaft follow the visible component. We used the supplied variable-capacitor pinout guide to identify its terminals.',connection:'AM section across the coil: TP1 to ground.'},
      {id:'diode',name:'The envelope’s gatekeeper',short:'Diode',value:'1N60P',image:'assets/components/diode-reference.png',role:'Conducts near positive peaks to charge the detector capacitor. Small signals produce very little output.',detail:'Orange glass-style axial package with a dark cathode band, following the supplied 1N60P reference. The band faces TP3.',connection:'Anode at TP1; banded cathode toward TP3.'},
      {id:'resistor',name:'A controlled way to discharge',short:'Resistor',value:'15 kΩ',image:'assets/components/resistor-reference.png',role:'Lets the detector capacitor discharge between peaks instead of holding its voltage indefinitely.',detail:'Brown–green–orange is the nominal 15 kΩ colour code. The illustration is not a resistance measurement.',connection:'TP3 to ground, in parallel with 3.3 nF.'},
      {id:'detector-capacitor',name:'Hold the peaks, follow the sound',short:'3.3 nF',value:'RC = 49.5 µs',image:'assets/components/detector-capacitor-reference.png',role:'Smooths the carrier peaks while the resistor sets how quickly its stored charge falls.',detail:'Yellow dipped radial package marked 332: 3300 pF, or 3.3 nF, following the supplied reference.',connection:'TP3 to ground, in parallel with 15 kΩ.'},
      {id:'breadboard',name:'Our temporary workbench',short:'Boards',value:'Two solderless boards',image:'assets/components/breadboard.png',role:'Holds the connections while we experiment, measure, and make changes.',detail:'The two-board arrangement follows our overhead photo. Hole positions and hidden contacts are illustrative, not a pin-by-pin wiring plan.',connection:'Check continuity on the actual board before wiring.'},
      {id:'generator',name:'The function generator',short:'Generator',value:'GW Instek GFG-8020H',image:'assets/components/generator.svg',role:'Supplies the test signal to the five-turn winding. Magnetic coupling excites the receiver tank.',detail:'Based on the supplied GFG-8020H reference: grey case, carry handle, counter, range buttons and tuning controls. Panel geometry is approximate; the display is illustrative. Product reference: https://www.rapidonline.com/gw-instek-function-generator-gfg-8020h-85-2064',connection:'Output centre and return connect to the two leads of the five-turn winding, not directly to the 75-turn tank.'},
      {id:'oscilloscope',name:'Watch the tank respond',short:'Scope',value:'SDS1102 reference',image:'assets/components/oscilloscope.svg',role:'Shows the waveform at TP1 while we sweep the source and find resonance.',detail:'Front-panel layout follows the supplied SDS1102 listing, with a wide screen, controls and two channel connectors. The trace is illustrative, not a recorded measurement. Reference: https://www.ebay.com/itm/365605442585',connection:'Probe tip at TP1, ground clip at circuit ground. The lab calls for a compensated ×10 probe and matching channel setting.'},
      {id:'probe',name:'The probe is part of the circuit',short:'Probe',value:'Compensated ×10 probe',image:'assets/components/probe-reference.png',role:'Connects TP1 to the oscilloscope while reducing capacitive loading compared with ×1.',detail:'Black probe body, yellow selector and collar, metal tip, ground lead and coaxial cable follow the supplied reference. The generator instead uses its output cable and a two-lead breakout.',connection:'Oscilloscope channel → probe tip at TP1; short ground clip → circuit ground.'},
      {id:'test-loop',name:'A station, a few centimetres away',short:'Test loop',value:'5 turns · magnetic coupling',image:'assets/m1/setup.jpg',role:'Transfers the test source’s magnetic field into the main coil without a direct electrical connection.',detail:'Five turns around the same 60 mm PVC former, separated from the 75-turn winding by a few centimetres. The exact separation remains approximate in the model.',connection:'Confirmed: five-turn loop connected to the generator; magnetically coupled to the electrically separate 75-turn winding on the same PVC pipe.'}
    ],
    tuningTitle: 'Find the signal.',
    tuningIntro: 'A small experiment: aim the tank at an illustrative 819 kHz carrier. Move the capacitor and watch the alignment change. Try adding probe capacitance, then retune.',
    tuningNote: 'Teaching model, not a measurement or live station. L = 249.43 µH uses the submitted Table 4 value; Q = 4.48 uses Table 5. Response = 1 / √(1 + Q²(f/f₀ − f₀/f)²). Extra probe capacitance is an illustrative 100 pF. Real parasitics, coupling, loading and tolerances are omitted.',
    targetKhz:819, assumedQ:4.48,
    challenge:'Can you bring the resonance within 5 kHz of the target?',
    matched:'On target. Now add the probe and try again.',
    unmatched:'Keep tuning: more capacitance lowers the resonant frequency.'
  },
  // The radio's signal flow, in order. M1 appears twice because it includes both halves.
  chain: [
    { title: 'Airwaves', detail: 'The starting point' },
    { title: 'Tuned circuit', detail: 'M1 · Select', current: true },
    { title: 'RF gain', detail: 'Later' },
    { title: 'Detector', detail: 'M1 · Recover', current: true },
    { title: 'Audio gain', detail: 'Later' },
    { title: 'Sound', detail: 'The destination' }
  ],
  // Add a milestone object to this array to add a tab, panel, and progress entry.
  // IDs must be unique, start with a letter, and contain only letters, numbers, or hyphens.
  // Status is 'Done', 'In progress', or 'Planned'. Do not mark a milestone Done until confirmed.
  milestones: [
    {
      id: 'm1', label: 'M1', title: 'Finding our frequency.', name: 'Tuner & detector',
      summary: 'From 75 turns of copper to our first experiments with a signal.',
      status: 'Done', statusNote: 'M1 signed off · confirmed by the team.',
      objective: 'Build the front end of an AM receiver. The coil and tuning capacitor form a tank circuit that selects one station’s frequency. A peak-rectifier detector then follows the wave’s envelope: a DC level for a steady sine, or the sound carried by an AM signal.',
      // Facts here are construction specifications, not measured results.
      specs: [
        { value: '75', unit: 'turns', label: 'Close-wound copper' },
        { value: '20–280', unit: 'pF', label: 'Tuning capacitor range' },
        { value: '≈ 50', unit: 'µs', label: 'Nominal detector RC' }
      ],
      // Tell the build in your own words. media refers to an ID in this milestone's media array.
      journey: [
        { title: 'First, make the coil.', text: 'We followed the LAB2 winding method, but our coil diameter was 60 mm rather than the brief’s 50 mm. Our receiver coil has 75 turns of 0.3 mm enamelled copper wire. At a 30 mm radius, 2πr × 75 estimates about 14.14 m of wire around the pipe, excluding the connection leads. The axial winding length—the width of the copper-covered band along the pipe—is 29 mm, confirmed by our team. We scraped roughly 1 cm of enamel off each end so the connections reached bare copper.', note: 'We kept neighbouring turns as close together as we could. After every few turns, we secured the winding with tape, then repeated the process along the pipe.', media: 'setup' },
        { title: 'Give it a frequency to choose.', text: 'We fixed the 20–280 pF tuning capacitor to the pipe and connected its AM section across the coil. Turning the shaft changes the capacitance, which changes the frequency the tank prefers.', media: 'top' },
        { title: 'Follow the peaks.', text: 'Next came the detector: a 1N60P diode from TP1 to TP3, with its band facing TP3. A 15 kΩ resistor and a 3.3 nF capacitor sit in parallel between TP3 and ground. Their RC is 49.5 µs, rounded to the lab’s 50 µs. The diode charges the capacitor near each peak; the resistor gives that charge a controlled way to fall.', media: 'schematic' },
        { title: 'A detour through an ESP32.', text: 'The function generator available to us initially had a limited frequency range. With help from Team 20, we tried an ESP32 circuit as a signal source for the test loop. It became our workaround while we looked for a generator that could reach the range we needed.', note: 'This exact sketch produces a sampled sine, not an AM carrier. 100 samples × 10 µs suggests about 1 kHz before sinf(), dacWrite(), and loop overhead; the actual frequency is lower. FREQ is declared but unused. This was a proof-of-concept detour, not a verified medium-wave source.', media: 'esp32', code: '#include <Arduino.h>\n#include <math.h>\n\n#define DAC_PIN 25\n#define FREQ 1000\n#define SAMPLES 100\n\nvoid setup() {\n  Serial.begin(115200);\n}\n\nvoid loop() {\n  for (int i = 0; i < SAMPLES; i++) {\n    float phase = 2.0f * PI * i / SAMPLES;\n    int value = 128 + 100 * sinf(phase);\n\n    dacWrite(DAC_PIN, value);\n\n    delayMicroseconds(10);\n  }\n}', credit: 'Sketch credit: Team 20, who helped us try this approach. Hardware note: this uses a DAC-capable ESP32 with DAC output on GPIO25; it is not portable to every ESP32 variant.' },
        { title: 'Back to the signal generator.', text: 'We eventually found a function generator with a wider frequency range and moved on from the ESP32 approach. Our test arrangement uses a five-turn winding on the same PVC pipe as the 75-turn receiver winding, separated along the pipe by a few centimetres. Its two leads connect to the generator output and return; the receiver winding has its own two leads to the tank circuit. We read TP1 on the oscilloscope and TP3’s DC level on the multimeter.', note: 'The lab procedure calls for a compensated ×10 probe and the scope channel set to ×10.', media: 'generator1' },
        { title: 'The response gets a measurement record.', text: 'Our solved sheet records a resonance of 1065 kHz at half travel and tuning limits of 965.5 kHz and 1.119 MHz. At the fixed half-travel setting, the 0.7-of-peak frequencies are 956.3 and 1194 kHz: a 237.7 kHz bandwidth and Q of about 4.48. Six amplitude settings now trace how TP3 rises with TP1.', note: 'These numbers come from Tables 5 and 6.', media: 'wave' }
      ],
      // Formula text is rendered with native MathML; descriptions should explain the intuition.
      theory: [
        { title: 'The frequency the tank prefers', kind: 'resonance', text: 'f₀ = 1 / (2π√(LC)). Use L in henries and C in farads to obtain hertz. More inductance or capacitance lowers the resonant frequency.' },
        { title: 'Estimate before winding', kind: 'wheeler', text: 'Wheeler’s single-layer estimate gives L in µH when diameter d and winding length l are in mm, with n turns. It is a prediction to compare with the real coil.' },
        { title: 'How selective is it?', kind: 'quality', text: 'At half capacitor travel, find f₀, then f_low and f_high where TP1 falls to about 0.7 of its peak. Use the same frequency unit throughout. A higher Q means a narrower response.' },
        { title: 'Keep the envelope', kind: 'rc', text: 'The diode conducts near positive peaks and charges the capacitor. Between peaks, the resistor discharges it. RC should be long compared with a carrier cycle but short enough to follow the sound’s envelope. Very small peaks produce little output: the diode’s “dead zone” is a gradual practical effect, not a perfectly fixed threshold.' }
      ],
      // Record what actually happened. Unconfirmed starter cards deliberately retain TBD markers.
      problems: [
        { problem: 'The first generator could not reach the range we needed.', why: 'Its available frequency range was limited.', solution: 'We tried the ESP32 approach with Team 20’s help, then switched to a function generator with a wider frequency range.' },
        { problem: 'Winding the coil without gaps or crossings.', why: 'Keeping neighbouring turns close together took care as we wound the wire.', solution: 'We wound a few turns at a time and secured them with tape before continuing. The tape is visible in our coil photograph.' },
        { problem: 'The probe can shift the resonance.', why: 'A ×1 probe adds about 100 pF across the tank, changing its effective capacitance.', solution: 'We compensated the probe and used ×10 on both the probe and the scope channel.' },
        { problem: 'Finding the capacitor’s AM terminals.', why: 'The capacitor has several terminals and sections, so we needed a pinout guide.', solution: 'We used the variable-capacitor pinout PDF to identify the terminals and guide our connections. The guide is included in the gallery below.' },
      ],
      // Table 4 and Table 5: enter numeric values only (units are separate).
      results: {
        note: 'Tables 4–6 are transcribed from our solved Part B sheet, pages 5–6. Predictions remain as submitted; measurements are recorded separately. The comparison errors below use those submitted predictions.',
        source: { src: 'LAB2solvedpartB.pdf', label: 'Read our solved Part B sheet ↗' },
        reviewNotes: [
          'L = 249.43 µH, as recorded in our submitted Table 4.',
          'The recorded bandwidth is 1194 − 956.3 = 237.7 kHz, giving Q = 1065 / 237.7 ≈ 4.4804, consistent with the reported 4.48. Tuning limits and the bandwidth points are different measurements: bandwidth is swept at a fixed capacitor position.',
          'The six recorded points rise from TP1 = 44.53 mV / TP3 = 11.72 mV to TP1 = 1348 mV / TP3 = 851.9 mV. They do not establish a flat dead zone or a precise diode threshold. More points below 44.53 mV at TP1 would help characterize the low-output region.'
        ],
        predictions: [
          { key: 'inductance', label: 'Coil inductance L', value: 249.43, unit: 'µH' },
          { key: 'cap819', label: 'C for 819 kHz', value: 151.4, unit: 'pF' },
          { key: 'bandLow', label: 'f at 280 pF', value: 602.24, unit: 'kHz' },
          { key: 'bandHigh', label: 'f at 20 pF', value: 2.253, unit: 'MHz' },
          { key: 'rc', label: 'RC (nominal calculation)', value: 49.5, unit: 'µs' }
        ],
        tank: [
          { key: 'bandLow', label: 'Band low end', value: 965.5, unit: 'kHz' },
          { key: 'bandHigh', label: 'Band high end', value: 1.119, unit: 'MHz' },
          { key: 'f0', label: 'f₀ at half travel', value: 1065, unit: 'kHz' },
          { key: 'fLow', label: 'f_low at 0.7 of peak', value: 956.3, unit: 'kHz' },
          { key: 'fHigh', label: 'f_high at 0.7 of peak', value: 1194, unit: 'kHz' },
          { key: 'q', label: 'Quality factor Q', value: 4.48, unit: '' }
        ],
        // Six Table 6 rows. Numeric tp1/tp3 pairs automatically draw the SVG chart.
        detector: [
          { source: 1.035, tp1: 1348, tp3: 851.9 },
          { source: 0.5, tp1: 656.3, tp3: 430.1 },
          { source: 0.304, tp1: 382.8, tp3: 257.8 },
          { source: 0.2031, tp1: 250, tp3: 158.2 },
          { source: 0.09961, tp1: 109.4, tp3: 60.55 },
          { source: 0.05, tp1: 44.53, tp3: 11.72 }
        ],
        // Match prediction/tank keys so comparisons update from the tables above.
        comparisons: [
          { label: 'Low end (kHz)', predictionKey: 'bandLow', measuredKey: 'bandLow' },
          { label: 'High end (MHz)', predictionKey: 'bandHigh', measuredKey: 'bandHigh' }
        ],
        stats: [
          { label: 'Resonance at half travel', key: 'f0', unit: 'kHz' },
          { label: 'Quality factor', key: 'q', unit: '' }
        ]
      },
      // Lessons and the handoff to the next milestone. Keep unverified observations explicit.
      learned: [
        'A source that produces a visible waveform is not automatically a source that reaches the tank’s resonant band. Our ESP32 detour made that distinction concrete.',
        'The measuring instrument is part of the circuit: probe capacitance changes what the tank sees.',
        'A steady sine gives the detector a DC level; an AM wave gives it an envelope to follow.',
        'Our recorded Q is about 4.48: the bandwidth is 237.7 kHz around a 1065 kHz resonance. The detector output rises across all six readings, but these points alone do not locate the diode’s dead zone.'
      ],
      next: { id: 'm2', text: 'Keep the tuner and detector intact: the later stages build on them. The measurement record is now entered. M1 is signed off. We are ready to prepare for the next chapter.', label: 'M2 · Coming soon →' },
      // Media types: image, video, youtube, drive. Embed src must be a provider embed/preview URL.
      // Missing images stay attractive: use missing:true until the file exists, then remove it.
      // Videos default to muted, never autoplay, and download only on playback (preload:none).
      media: [
        { id: 'setup', type: 'image', src: 'assets/m1/setup.jpg', alt: 'Copper coil, tuning capacitor, two breadboards, and probes in the complete bench setup.', caption: 'The whole setup, with our wound coil at the centre.' },
        { id: 'top', type: 'image', src: 'assets/m1/top-view.jpg', alt: 'Top view of the coil between a capacitor breadboard and the ESP32 breadboard.', caption: 'An overhead view of the connections during the ESP32 experiments.' },
        { id: 'esp32', type: 'image', src: 'assets/m1/esp32-circuit.jpg', alt: 'ESP32 development board, jumper wires, and components on a breadboard beside the main coil.', caption: 'The ESP32 detour. Thanks to Team 20 for helping us try it.' },
        { id: 'wave', type: 'image', src: 'assets/m1/lower-limit.png', alt: 'Oscilloscope showing a yellow waveform, 942.1 kHz frequency and 1.836 V peak-to-peak.', caption: 'Capture near the lower tuning limit: the screen reads 942.1 kHz and 1.836 V peak-to-peak. Table 5 retains the separately recorded lower limit of 965.5 kHz.' },
        { id: 'esp32video', type: 'video', src: 'assets/m1/esp32-wave.mp4', poster: 'assets/m1/esp32-wave.jpg', muted: true, caption: 'ESP32 waveform experiment · starts muted.', description: '' },
        { id: 'generator1', type: 'video', src: 'assets/m1/generator-01.mp4', muted: true, caption: 'After switching to the wider-range function generator · part 1.', description: '' },
        { id: 'generator2', type: 'video', src: 'assets/m1/generator-02.mp4', muted: true, caption: 'After switching to the wider-range function generator · part 2.', description: '' },
        { id: 'schematic', type: 'image', src: 'assets/m1/schematic.svg', alt: 'Five-turn generator loop inductively couples to a parallel 75-turn coil and 20–280 pF capacitor at TP1. A 1N60P diode points toward TP3, with a 15 kilohm resistor and 3.3 nanofarad capacitor in parallel to ground.', caption: 'M1 test circuit · redrawn from LAB2, Figure 3. The diode band faces TP3.' },
      ]
    },
    // M2: fill this same template when the next build starts; its tab is linkable now.
    {
      id: 'm2', label: 'M2', name: 'Coming soon', title: 'The next chapter.', status: 'Planned',
      media: [], summary: 'Coming soon.',
      objective: 'Coming soon.',
      journey: [{ title: 'Coming soon.', text: 'Coming soon.' }],
      problems: [{ problem: 'Coming soon.', why: 'Coming soon.', solution: 'Coming soon.' }],
      results: { note: 'Coming soon.' },
      learned: ['Coming soon.'],
      next: { id: 'm3', text: 'Coming soon.', label: 'M3 · Coming soon →' },
    },
    // M3: duplicate this object for M4, change its ID/label, then fill the sections.
    {
      id: 'm3', label: 'M3', name: 'Coming soon', title: 'More to tune into.', status: 'Planned',
      media: [], summary: 'Coming soon.',
      objective: 'Coming soon.',
      journey: [{ title: 'Coming soon.', text: 'Coming soon.' }],
      problems: [{ problem: 'Coming soon.', why: 'Coming soon.', solution: 'Coming soon.' }],
      results: { note: 'Coming soon.' },
      learned: ['Coming soon.'],
      next: { text: 'Coming soon.' },
    }
  ]
};
