const fs = require('fs');
const path = require('path');
const { createCanvas, Image } = require('canvas');

// Read the SVG content
const svgPath = path.join(__dirname, '../public/icon.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

// Create sizes for different favicon formats
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' }
];

// Function to create PNG from SVG data
async function createPNGFromSVG(size, outputName) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Create a simple representation of the clock icon
  // Since we can't directly render SVG, we'll draw it programmatically

  // Clear canvas with white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  // Scale factor
  const scale = size / 32;
  ctx.scale(scale, scale);

  // Draw outer circle
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(16, 16, 14.5, 0, Math.PI * 2);
  ctx.stroke();

  // Draw hour markers
  ctx.fillStyle = '#000000';
  ctx.globalAlpha = 0.4;

  // Top
  ctx.beginPath();
  ctx.arc(16, 3, 0.75, 0, Math.PI * 2);
  ctx.fill();

  // Right
  ctx.beginPath();
  ctx.arc(29, 16, 0.75, 0, Math.PI * 2);
  ctx.fill();

  // Bottom
  ctx.beginPath();
  ctx.arc(16, 29, 0.75, 0, Math.PI * 2);
  ctx.fill();

  // Left
  ctx.beginPath();
  ctx.arc(3, 16, 0.75, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;

  // Draw hour hand (pointing to 10)
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(16, 16);
  ctx.lineTo(11.4, 8.8);
  ctx.stroke();

  // Draw minute hand (pointing to 2)
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(16, 16);
  ctx.lineTo(23.2, 11.4);
  ctx.stroke();

  // Draw center dot
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(16, 16, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join(__dirname, '../public', outputName);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated ${outputName} (${size}x${size})`);
}

// Generate all sizes
async function generateAllFavicons() {
  for (const { size, name } of sizes) {
    await createPNGFromSVG(size, name);
  }
  console.log('All favicons generated successfully!');
}

// Check if canvas is available
try {
  generateAllFavicons().catch(console.error);
} catch (err) {
  console.log('Note: Install the "canvas" package to generate PNG favicons automatically.');
  console.log('Run: npm install canvas');
}