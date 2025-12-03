/**
 * Generate SVG icon files from simple-icons
 * Run: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Icons mapping: our name -> simple-icons slug
const ICONS = {
  bootstrap: 'bootstrap',
  css3: 'css3',
  git: 'git',
  html5: 'html5',
  javascript: 'javascript',
  jquery: 'jquery',
  mysql: 'mysql',
  php: 'php',
  phpstorm: 'phpstorm',
  trello: 'trello',
  react: 'react',
  laravel: 'laravel',
  doctrine: 'doctrine',
  gulp: 'gulp',
  photoshop: 'adobephotoshop',
  sass: 'sass',
  postgresql: 'postgresql',
  svn: 'subversion',
  threejs: 'threedotjs',
  jest: 'jest',
  webstorm: 'webstorm',
  karma: 'karma',
  webpack: 'webpack',
  express: 'express',
};

const OUTPUT_DIR = path.join(__dirname, '../src/assets/icons');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateIcons() {
  const simpleIcons = await import('simple-icons');
  
  for (const [name, slug] of Object.entries(ICONS)) {
    // simple-icons exports icons as siIconname (camelCase)
    const iconKey = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
    const icon = simpleIcons[iconKey];
    
    if (!icon) {
      console.warn(`⚠️  Icon not found: ${name} (${iconKey})`);
      continue;
    }
    
    const svg = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#${icon.hex}"><title>${icon.title}</title><path d="${icon.path}"/></svg>`;
    
    const outputPath = path.join(OUTPUT_DIR, `${name}.svg`);
    fs.writeFileSync(outputPath, svg);
    console.log(`✓ Generated: ${name}.svg (#${icon.hex})`);
  }
  
  console.log(`\n✅ Icons generated in ${OUTPUT_DIR}`);
}

generateIcons().catch(console.error);
