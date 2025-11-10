import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Read template
const templatePath = path.join(__dirname, 'calendar-entry.template.txt');
const template = fs.readFileSync(templatePath, 'utf-8');

// Get country and translations from command line args
const country = process.argv[2];
const popupTranslations = process.argv[3];
const conditionsTranslations = process.argv[4];

if (!country || !popupTranslations || !conditionsTranslations) {
  console.error(
    'Usage: node generate-entry.js <COUNTRY> <POPUP_JSON> <CONDITIONS_JSON>',
  );
  process.exit(1);
}

// Replace placeholders
const output = template
  .replace('"{{COUNTRY_CODE}}"', `"${country}"`)
  .replace('{{POPUP_TRANSLATIONS}}', popupTranslations)
  .replace('{{CONDITIONS_TRANSLATIONS}}', conditionsTranslations);

// Write to calendar-entry.tsx in root
const outputPath = path.join(rootDir, 'calendar-entry.tsx');
fs.writeFileSync(outputPath, output, 'utf-8');

console.log(`Generated calendar-entry.tsx for country: ${country}`);
