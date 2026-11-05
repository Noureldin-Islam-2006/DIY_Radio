/* EDIT THIS FILE: all project copy, media, and measurements live here.
   Use numbers (without units) for measurements; keep unknowns as [[TBD: ...]].
   Paths are relative to index.html. No server, imports, or fetch are needed. */
window.RADIO_CONTENT = {
  // Identity, dates, repository, and the opening story. Replace repo with your HTTPS URL.
  project: {
    name: 'هنا القاهرة', transliteration: 'HUNA AL-QAHIRA', team: '14',
    tagline: 'An AM radio, one milestone at a time.',
    intro: 'A coil of copper wire. A handful of components. A signal waiting to become sound. We’re three students building a medium-wave radio—and keeping the notes we wish we had at the start.',
    members: ['Rawan Kotb', 'Bassel Mostafa', 'Noureldin Islam'],
    department: 'SBME Department', course: 'ELEG103 · Analog and Digital Electronics',
    term: 'Fall 2026', date: '2026-11-05', dateLabel: '05 November 2026',
    repo: 'https://github.com/Noureldin-Islam-2006/DIY_Radio', source: 'LAB2.pdf',
    hero: { src: 'assets/m1/setup.jpg', alt: 'Hand-wound copper coil on a PVC pipe, tuning capacitor, breadboards, and oscilloscope probes on our workbench.', caption: '01 / On the bench · Our tuner and detector taking shape.' }
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
    chart: 'The detector’s response', chartEmpty: '[[TBD: add the six Table 6 measurement pairs to draw the chart]]',
    chartNote: 'Only entered measurements are plotted. At small TP1 peaks, look for a nearly flat TP3 region: the diode’s dead zone. No assumed threshold or invented curve is added.',
    chartAxisX: 'TP1 peak (mV)', chartAxisY: 'TP3 DC (mV)',
    mediaMissing: 'Awaiting a bench capture', loadEmbed: 'Load external video',
    embedNote: 'Loading connects to the video provider.',
    footer: 'Made by hand. Documented as we go.', repository: 'GitHub repository ↗',
    theme: 'Change colour theme', themes: ['System', 'Light', 'Dark'],
    print: 'Print this milestone', plannedNote: 'The next chapter is still on the drawing board.'
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
      status: 'In progress', statusNote: 'Build documented · measurements and sign-off [[TBD: confirm M1 completion]]',
      objective: 'Build the front end of an AM receiver. The coil and tuning capacitor form a tank circuit that selects one station’s frequency. A peak-rectifier detector then follows the wave’s envelope: a DC level for a steady sine, or the sound carried by an AM signal.',
      // Facts here are construction specifications, not measured results.
      specs: [
        { value: '75', unit: 'turns', label: 'Close-wound copper' },
        { value: '20–280', unit: 'pF', label: 'Tuning capacitor range' },
        { value: '≈ 50', unit: 'µs', label: 'Nominal detector RC' }
      ],
      // Tell the build in your own words. media refers to an ID in this milestone's media array.
      journey: [
        { title: 'First, make the coil.', text: 'We started with the LAB2 instructions: 75 turns of 0.3 mm enamelled copper wire on a 50 mm PVC pipe. The winding is about 25 mm long and uses about 12 m of wire. We scraped roughly 1 cm of enamel off each end so the connections reached bare copper.', note: '[[TBD: how we kept the turns together without gaps or crossings]]', media: 'setup' },
        { title: 'Give it a frequency to choose.', text: 'We fixed the 20–280 pF tuning capacitor to the pipe and connected its AM section across the coil. Turning the shaft changes the capacitance, which changes the frequency the tank prefers.', note: '[[TBD: the AM terminal pair we used and how we identified it]]', media: 'top' },
        { title: 'Follow the peaks.', text: 'Next came the detector: a 1N60P diode from TP1 to TP3, with its band facing TP3. A 15 kΩ resistor and a 3.3 nF capacitor sit in parallel between TP3 and ground. Their RC is 49.5 µs, rounded to the lab’s 50 µs. The diode charges the capacitor near each peak; the resistor gives that charge a controlled way to fall.', media: 'schematic' },
        { title: 'A detour through an ESP32.', text: 'The function generator available to us initially had a limited frequency range. With help from Team 20, we tried an ESP32 circuit as a signal source for the test loop. It became our workaround while we looked for a generator that could reach the range we needed.', note: 'This exact sketch produces a sampled sine, not an AM carrier. 100 samples × 10 µs suggests about 1 kHz before sinf(), dacWrite(), and loop overhead; the actual frequency is lower. FREQ is declared but unused. This was a proof-of-concept detour, not a verified medium-wave source.', media: 'esp32', code: '#include <Arduino.h>\n#include <math.h>\n\n#define DAC_PIN 25\n#define FREQ 1000\n#define SAMPLES 100\n\nvoid setup() {\n  Serial.begin(115200);\n}\n\nvoid loop() {\n  for (int i = 0; i < SAMPLES; i++) {\n    float phase = 2.0f * PI * i / SAMPLES;\n    int value = 128 + 100 * sinf(phase);\n\n    dacWrite(DAC_PIN, value);\n\n    delayMicroseconds(10);\n  }\n}', credit: 'Sketch credit: Team 20, who helped us try this approach. Hardware note: this uses a DAC-capable ESP32 with DAC output on GPIO25; it is not portable to every ESP32 variant.' },
        { title: 'Back to the signal generator.', text: 'We eventually found a function generator with a wider frequency range and moved on from the ESP32 approach. Our test arrangement uses a five-turn loop a few centimetres from the main coil, with both coils on the same axis. We read TP1 on the oscilloscope and TP3’s DC level on the multimeter.', note: 'The lab procedure calls for a compensated ×10 probe and the scope channel set to ×10. [[TBD: confirm our probe settings, generator model, and frequency range]]', media: 'generator1' },
        { title: 'Now, put numbers to the response.', text: 'The next documentation step is to record the resonance at half capacitor travel, find both tuning limits, then sweep to the 0.7-of-peak points for bandwidth. At resonance, six source amplitudes will let us map TP1’s peak to TP3’s DC output.', note: '[[TBD: our measurements and what changed as we turned the capacitor]]', media: 'wave' }
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
        { problem: 'The first generator could not reach the range we needed.', why: 'Its available frequency range was limited. [[TBD: original generator model and upper limit]]', solution: 'We tried the ESP32 approach with Team 20’s help, then switched to a function generator with a wider frequency range.' },
        { problem: 'Winding the coil without gaps or crossings.', why: '[[TBD: what happened while we wound our coil]]', solution: '[[TBD: our winding solution]]' },
        { problem: 'The probe can shift the resonance.', why: 'A ×1 probe adds about 100 pF across the tank, changing its effective capacitance.', solution: 'Compensate the probe and use ×10 on both the probe and scope channel. [[TBD: confirm we did this]]' },
        { problem: 'A weak signal may barely move TP3.', why: 'Small tank peaks can sit in the detector’s low-output region.', solution: '[[TBD: whether we encountered this and how we resolved it]]' },
        { problem: 'Finding the capacitor’s AM terminals.', why: '[[TBD: what made the terminal pair unclear on our capacitor]]', solution: '[[TBD: how we identified the right pair]]' },
        { problem: '[[TBD: another problem we actually faced]]', why: '[[TBD: its cause]]', solution: '[[TBD: our fix]]' }
      ],
      // Table 4 and Table 5: enter numeric values only (units are separate).
      results: {
        note: 'The construction is here; the measurement record is still being filled in. Blank values below are intentional. Nominal component values are not measured performance.',
        predictions: [
          { key: 'inductance', label: 'Coil inductance L', value: '[[TBD: predicted L]]', unit: 'µH' },
          { key: 'cap819', label: 'C for 819 kHz', value: '[[TBD: C at 819 kHz]]', unit: 'pF' },
          { key: 'bandLow', label: 'f at 280 pF', value: '[[TBD: predicted low end]]', unit: 'kHz' },
          { key: 'bandHigh', label: 'f at 20 pF', value: '[[TBD: predicted high end]]', unit: 'MHz' },
          { key: 'rc', label: 'RC (rounded nominal)', value: 50, unit: 'µs' }
        ],
        tank: [
          { key: 'bandLow', label: 'Band low end', value: '[[TBD: measured low end]]', unit: 'kHz' },
          { key: 'bandHigh', label: 'Band high end', value: '[[TBD: measured high end]]', unit: 'MHz' },
          { key: 'f0', label: 'f₀ at half travel', value: '[[TBD: measured f0]]', unit: 'kHz' },
          { key: 'fLow', label: 'f_low at 0.7 of peak', value: '[[TBD: measured f_low]]', unit: 'kHz' },
          { key: 'fHigh', label: 'f_high at 0.7 of peak', value: '[[TBD: measured f_high]]', unit: 'kHz' },
          { key: 'q', label: 'Quality factor Q', value: '[[TBD: Q]]', unit: '' }
        ],
        // Six Table 6 rows. Numeric tp1/tp3 pairs automatically draw the SVG chart.
        detector: [
          { source: '[[TBD]]', tp1: '[[TBD]]', tp3: '[[TBD]]' },
          { source: '[[TBD]]', tp1: '[[TBD]]', tp3: '[[TBD]]' },
          { source: '[[TBD]]', tp1: '[[TBD]]', tp3: '[[TBD]]' },
          { source: '[[TBD]]', tp1: '[[TBD]]', tp3: '[[TBD]]' },
          { source: '[[TBD]]', tp1: '[[TBD]]', tp3: '[[TBD]]' },
          { source: '[[TBD]]', tp1: '[[TBD]]', tp3: '[[TBD]]' }
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
        '[[TBD: what our measured bandwidth and detector curve taught us]]'
      ],
      next: { id: 'm2', text: 'Keep the tuner and detector intact: the later stages build on them. First, finish the M1 measurement record; then begin the next chapter.', label: 'M2 · Coming soon →' },
      // Media types: image, video, youtube, drive. Embed src must be a provider embed/preview URL.
      // Missing images stay attractive: use missing:true until the file exists, then remove it.
      // Videos default to muted, never autoplay, and download only on playback (preload:none).
      media: [
        { id: 'setup', type: 'image', src: 'assets/m1/setup.jpg', alt: 'Copper coil, tuning capacitor, two breadboards, and probes in the complete bench setup.', caption: 'The whole setup, with our wound coil at the centre.' },
        { id: 'top', type: 'image', src: 'assets/m1/top-view.jpg', alt: 'Top view of the coil between a capacitor breadboard and the ESP32 breadboard.', caption: 'An overhead view of the connections during the ESP32 experiments.' },
        { id: 'esp32', type: 'image', src: 'assets/m1/esp32-circuit.jpg', alt: 'ESP32 development board, jumper wires, and components on a breadboard beside the main coil.', caption: 'The ESP32 detour. Thanks to Team 20 for helping us try it.' },
        { id: 'wave', type: 'image', src: 'assets/m1/esp32-wave.jpg', alt: 'Oscilloscope photograph with cyan and yellow traces captured during the ESP32 experiments.', caption: 'Our scope capture during the ESP32 approach. [[TBD: channel connections and signal settings; this is not yet a verified TP1 resonance measurement]]' },
        { id: 'esp32video', type: 'video', src: 'assets/m1/esp32-wave.mp4', poster: 'assets/m1/esp32-wave.jpg', muted: true, caption: 'ESP32 waveform experiment · starts muted.', description: '[[TBD: describe the trace changes in this clip and add a transcript if speech is relevant]]' },
        { id: 'generator1', type: 'video', src: 'assets/m1/generator-01.mp4', muted: true, caption: 'After switching to the wider-range function generator · part 1.', description: '[[TBD: test settings and a text description of what this clip demonstrates]]' },
        { id: 'generator2', type: 'video', src: 'assets/m1/generator-02.mp4', muted: true, caption: 'After switching to the wider-range function generator · part 2.', description: '[[TBD: test settings and a text description of what this clip demonstrates]]' },
        { id: 'schematic', type: 'image', src: 'assets/m1/schematic.svg', alt: 'Five-turn generator loop inductively couples to a parallel 75-turn coil and 20–280 pF capacitor at TP1. A 1N60P diode points toward TP3, with a 15 kilohm resistor and 3.3 nanofarad capacitor in parallel to ground.', caption: 'M1 test circuit · redrawn from LAB2, Figure 3. The diode band faces TP3.' },
        { id: 'coil', type: 'image', src: 'assets/m1/coil.jpg', missing: true, alt: '[[TBD: description of our close-up coil photograph]]', caption: '[[TBD: a close-up of the winding and stripped wire ends]]' },
        { id: 'detector', type: 'image', src: 'assets/m1/detector.jpg', missing: true, alt: '[[TBD: description of our detector close-up]]', caption: '[[TBD: close-up of the 1N60P, 15 kΩ resistor, and 3.3 nF capacitor]]' },
        { id: 'resonance', type: 'image', src: 'assets/m1/resonance.jpg', missing: true, alt: '[[TBD: TP1 resonance scope screenshot]]', caption: '[[TBD: resonance at TP1 with frequency, probe ratio, and scale visible]]' },
        { id: 'tuning', type: 'video', src: 'assets/m1/tuning.mp4', missing: true, caption: '[[TBD: a short video turning the capacitor while TP3 changes]]' }
      ]
    },
    // M2: fill this same template when the next build starts; its tab is linkable now.
    {
      id: 'm2', label: 'M2', name: 'Coming soon', title: 'The next chapter.', status: 'Planned',
      summary: '[[TBD: milestone 2 title and short summary]]',
      objective: '[[TBD: what M2 adds to our radio and why it matters]]',
      journey: [{ title: '[[TBD: our first M2 step]]', text: '[[TBD: what we tried, built, and changed]]' }],
      problems: [{ problem: '[[TBD: M2 problem]]', why: '[[TBD: cause]]', solution: '[[TBD: solution]]' }],
      results: { note: '[[TBD: M2 measurements and results]]' },
      learned: ['[[TBD: what we learned in M2]]'],
      next: { id: 'm3', text: '[[TBD: how M2 leads into M3]]', label: 'M3 · Coming soon →' },
      media: [{ id: 'm2photo', type: 'image', src: 'assets/m2/placeholder.svg', missing: true, caption: '[[TBD: M2 build photographs and videos]]' }]
    },
    // M3: duplicate this object for M4, change its ID/label, then fill the sections.
    {
      id: 'm3', label: 'M3', name: 'Coming soon', title: 'More to tune into.', status: 'Planned',
      summary: '[[TBD: milestone 3 title and short summary]]',
      objective: '[[TBD: what M3 adds to our radio and why it matters]]',
      journey: [{ title: '[[TBD: our first M3 step]]', text: '[[TBD: what we tried, built, and changed]]' }],
      problems: [{ problem: '[[TBD: M3 problem]]', why: '[[TBD: cause]]', solution: '[[TBD: solution]]' }],
      results: { note: '[[TBD: M3 measurements and results]]' },
      learned: ['[[TBD: what we learned in M3]]'],
      next: { text: '[[TBD: the next milestone after M3]]' },
      media: [{ id: 'm3photo', type: 'image', src: 'assets/m3/placeholder.svg', missing: true, caption: '[[TBD: M3 build photographs and videos]]' }]
    }
  ]
};
