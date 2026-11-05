# A livelier radio guide, without copying another team's site

## Reference review

Reviewed the [Electronics Lab Radio reference](https://ahmadenan.github.io/Electronics-Lab-Radio/?step=wind), including its winding, detector, and signal-model views.

Strengths observed:

- A rotatable assembly explains relationships that photographs alone cannot show.
- Build steps, materials, checks, and cautions make the guide usable at the bench.
- Keyboard camera controls provide an alternative to dragging.
- The signal model explicitly separates calculations from recorded measurements.
- Photographs anchor the polished diagrams in a real build.

Design tradeoffs observed (design judgment, not an accessibility audit):

- Milestone links, build-step navigation, visualization tabs, camera controls, and an assembly timeline create several competing navigation layers.
- At the inspected medium viewport, the two-column layout leaves relatively narrow space for both instructions and the model; the build-step navigation needs horizontal scrolling.
- Many useful controls are visible together. A newcomer must choose what to operate before understanding what matters.

Our response: keep Team 14's narrative, original copper-and-paper design, real photographs, and ESP32 story. Add one dedicated workbench rather than reproducing the reference's eight-step interface. Inspect parts through a simple labelled tray, explore one tuning challenge, and keep measurement tables untouched. No reference source code, images, or 3D assets were copied.

## Research and creative elements

- **Exploded assemblies:** spatial separation makes the relationship between components easier to inspect. [Advanta's product-experience case study](https://www.advanta-group.com/work/interactive-product-experience) illustrates the general technique. Our interpretation uses a manual separation button, not scroll hijacking.
- **Component inspection:** give each object a purpose, connection note, and visual reference. [Model-viewer's annotation examples](https://modelviewer.dev/examples/annotations/) demonstrate the broader principle of attaching readable HTML explanations to a 3D experience. Our implementation uses an accessible component tray and inspector; it does not load model-viewer.
- **Native interaction:** [MDN Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Using_Pointer_Events) documents unified mouse/pen/touch handling. Pointer capture keeps our orbit drag reliable outside the canvas bounds.
- **Motion only when needed:** [MDN's Canvas animation guide](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations) explains requestAnimationFrame. Our 3D renderer draws on interaction or during the short separation transition, not in an endless idle animation loop.

Implemented: photo-informed component illustrations, rotatable and separable 3D assembly, component inspector, downloadable GLB, a resonance dial, a probe-loading challenge, response-driven waveform, optional synthesized sound, reduced-motion behavior, and offscreen audio shutdown.

Useful future additions once the team supplies the relevant content:

1. A measured-versus-predicted overlay once Tables 5 and 6 are filled in.
2. A short annotated tuning video tied to the recorded source settings.
3. A before/after comparison of the ESP32 experiment and the replacement generator, using confirmed frequencies and channel labels.

Avoided: autoplay sound, scroll-jacking, a replacement cursor, random particle backgrounds, invented bench readings, and a framework migration merely to add animation.

## Does this need React?

No. React is a UI framework; it is not a prerequisite for animation or 3D. Native HTML controls, CSS transitions, Pointer Events, Web Audio, and WebGL support this experience. The delivered implementation has no React, npm, build step, CDN, Three.js, or other runtime dependency.

## What the model represents

The component PNGs were generated using the built-in Image Generation tool with the team's two bench photographs as visual references. The prompts and provenance are in `assets/components/GENERATION.md`. The small diode/capacitor packages and test loop contain representative details where the photos do not resolve the hardware. Illustrations are labelled as illustrations, not evidence.

The 3D assembly is original procedural geometry informed by those visual references and nominal LAB2 dimensions. It is **not** photogrammetry, an automatic image-to-mesh conversion, a precision scan, or a pin-accurate breadboard reconstruction. The source loop is placed above the upright main coil on the same axis. Its source wiring and the circuit's jumpers are illustrative. The schematic remains the electrical reference.

The viewer renders actual three-dimensional triangle meshes with depth testing, perspective, and lighting; it is not a flat image that rotates. The standalone GLB contains the same assembled geometry, vertex colours, separate named meshes, and metre units. It can be imported into a 3D editor. No captured images of the reference website are distributed.
# November 5 refinement

Reviewed the visual hierarchy of [Money in Check](https://moneyincheck.org/) and the published experiences at [Lusion](https://lusion.co/), [Linear](https://linear.app/) and [Bruno Simon](https://bruno-simon.com/). These are selected benchmarks, not a verified popularity ranking. Money in Check's dominant object and restrained palette are effective; its elaborate spectacle is more than this guide needs. Lusion foregrounds visual storytelling, Linear provides a useful benchmark for clear information hierarchy, and Bruno Simon demonstrates exploratory 3D interaction, with a larger interaction/learning burden than a short lab guide needs.

Our interpretation: a copper-coil opening exhibit, large editorial typography, a visitor-operated radio dial, and component close-ups that explain the build. No copied layouts, assets or implementation. The left chapter index appears while reading the build, leaving the opening uncluttered. Technical content and real photos remain in the story.

Review passes: (1) desktop composition, then tightened opening typography; (2) close-up camera, then added automatic viewer positioning and ensured lazy initialization before focus; (3) all eight selections, return-to-assembly option, keyboard dial and tabs, both themes, and 320/390 px widths. No horizontal page overflow or browser JavaScript errors observed. Existing content/calculation checks pass. Visual taste remains subjective; hardware fidelity still requires the additional captures described in MODEL-CAPTURE-GUIDE.md.

