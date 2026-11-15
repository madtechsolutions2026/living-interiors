# living-interiors

A responsive website concept for The Living Interiors, inspired by its earthy logo and sculptural visual identity.

## Preview locally

Serve the `dist` directory with a static HTTP server. For example, with Python installed:

```sh
python -m http.server 4173 --directory dist
```

Open http://localhost:4173 in your browser.

## Deploy to Vercel

Import this repository with the repository root as the Root Directory. The included `vercel.json` selects the static `dist` folder as the output directory; no build command is required.

## Features

- Interactive hero with generated daylight and evening room imagery
- Room-by-room services, a filterable gallery, and image viewing controls
- Animated room design journey with replay and manual stage controls
- Interactive material samples and colour stories
- Studio team profiles, directions, and WhatsApp enquiry links
- Illustrated interior footer with a lighting control
- Responsive layouts, keyboard controls, and reduced-motion support

## Files

- `dist/`: static website and assets, ready for a static host
- `hero-image-prompts.md`: image generation prompts and asset provenance

Existing studio images and content were adapted from https://thelivinginteriors.com/ for this demo. Generated hero imagery is labelled as concept imagery, not a completed client project.
