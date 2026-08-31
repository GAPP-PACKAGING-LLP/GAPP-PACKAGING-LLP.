import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors exactly measured from the uploaded official logo:
// Cyan Blue: #008CE8
// Slate Navy / Charcoal: #262D38
// Deep Teal (Tagline): #0E525B

function buildSvg({ isDark = false, showBg = false, isIconOnly = false }) {
  const darkTextColor = isDark ? '#FFFFFF' : '#262D38';
  const darkShapeColor = isDark ? '#F1F5F9' : '#262D38';
  const taglineColor = isDark ? '#38BDF8' : '#0E525B';

  if (isIconOnly) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 420" width="100%" height="100%">
  <!-- Interlocking Icon Only -->
  <g transform="translate(250, 210)">
    <!-- 1. Dark Shape (Upper Right) -->
    <g transform="translate(56, -16) rotate(45)">
      <path fill="${darkShapeColor}" d="
        M -75 -75
        L 75 -75
        L 75 75
        L -75 75
        L -75 28
        L -28 28
        L -28 -28
        L -75 -28
        Z
      "/>
    </g>

    <!-- 2. Blue Shape (Lower Left) -->
    <g transform="translate(-56, 16) rotate(45)">
      <path fill="#008CE8" d="
        M -75 -75
        L 75 -75
        L 75 -28
        L 28 -28
        L 28 28
        L 75 28
        L 75 75
        L -75 75
        Z
      "/>
    </g>

    <!-- 3. Interlocking Weave: Dark Top Arm in front of Blue Top Arm -->
    <g transform="translate(56, -16) rotate(45)">
      <path fill="${darkShapeColor}" d="
        M -75 -75
        L 75 -75
        L 75 -28
        L -75 -28
        Z
      "/>
    </g>
  </g>
</svg>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 660" width="100%" height="100%">
  <defs>
    <style>
      .blue-color { fill: #008CE8; }
      .dark-color { fill: ${darkTextColor}; }
      .tagline-color { fill: ${taglineColor}; }
      .font-title {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-weight: 800;
      }
      .font-sub {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-weight: 600;
      }
    </style>
  </defs>

  ${showBg ? '<rect width="100%" height="100%" fill="#FFFFFF"/>' : ''}

  <!-- Interlocking Icon -->
  <g id="brand-symbol" transform="translate(300, 230)">
    <!-- 1. Dark Shape (Upper Right) -->
    <g transform="translate(56, -16) rotate(45)">
      <path fill="${darkShapeColor}" d="
        M -75 -75
        L 75 -75
        L 75 75
        L -75 75
        L -75 28
        L -28 28
        L -28 -28
        L -75 -28
        Z
      "/>
    </g>

    <!-- 2. Blue Shape (Lower Left) -->
    <g transform="translate(-56, 16) rotate(45)">
      <path fill="#008CE8" d="
        M -75 -75
        L 75 -75
        L 75 -28
        L 28 -28
        L 28 28
        L 75 28
        L 75 75
        L -75 75
        Z
      "/>
    </g>

    <!-- 3. Interlocking Weave: Dark Top Arm in front of Blue Top Arm -->
    <g transform="translate(56, -16) rotate(45)">
      <path fill="${darkShapeColor}" d="
        M -75 -75
        L 75 -75
        L 75 -28
        L -75 -28
        Z
      "/>
    </g>
  </g>

  <!-- Typography Line 1: GAPP PACKAGING -->
  <g transform="translate(300, 500)" text-anchor="middle">
    <text class="font-title" font-size="52" letter-spacing="1.2">
      <tspan class="blue-color">GAPP </tspan>
      <tspan class="dark-color">PACKAGING</tspan>
    </text>
  </g>

  <!-- Typography Line 2: Focus On Quality -->
  <g transform="translate(300, 568)" text-anchor="middle">
    <text class="font-sub tagline-color" font-size="34" letter-spacing="0.5">
      Focus On Quality
    </text>
  </g>
</svg>`;
}

// Favicon SVG (crisp icon with rounded white background)
function buildFavicon() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <rect width="128" height="128" rx="28" fill="#FFFFFF"/>
  <g transform="translate(64, 64) scale(0.34)">
    <g transform="translate(56, -16) rotate(45)">
      <path fill="#262D38" d="M -75 -75 L 75 -75 L 75 75 L -75 75 L -75 28 L -28 28 L -28 -28 L -75 -28 Z"/>
    </g>
    <g transform="translate(-56, 16) rotate(45)">
      <path fill="#008CE8" d="M -75 -75 L 75 -75 L 75 -28 L 28 -28 L 28 28 L 75 28 L 75 75 L -75 75 Z"/>
    </g>
    <g transform="translate(56, -16) rotate(45)">
      <path fill="#262D38" d="M -75 -75 L 75 -75 L 75 -28 L -75 -28 Z"/>
    </g>
  </g>
</svg>`;
}

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'logo.svg'), buildSvg({ showBg: false }), 'utf-8');
fs.writeFileSync(path.join(publicDir, 'logo-card.svg'), buildSvg({ showBg: true }), 'utf-8');
fs.writeFileSync(path.join(publicDir, 'logo-dark.svg'), buildSvg({ isDark: true }), 'utf-8');
fs.writeFileSync(path.join(publicDir, 'logo-icon.svg'), buildSvg({ isIconOnly: true }), 'utf-8');
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), buildFavicon(), 'utf-8');

console.log('[logo] Generated all official GAPP Packaging brand assets.');
