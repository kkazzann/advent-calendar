import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { fetchAndMergeDynamicTranslations } from './fetch-dynamic-translations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

async function buildCalendar(
  country,
  popupTranslations,
  conditionsTranslations,
) {
  console.log(`\n🎄 Building calendar for ${country}...`);

  // Read template
  const templatePath = path.join(__dirname, 'calendar-entry.template.txt');
  const template = await fs.readFile(templatePath, 'utf-8');

  // Replace placeholders
  const entryContent = template
    .replace('"{{COUNTRY_CODE}}"', `"${country}"`)
    .replace(
      '{{POPUP_TRANSLATIONS}}',
      JSON.stringify(popupTranslations, null, 2),
    )
    .replace(
      '{{CONDITIONS_TRANSLATIONS}}',
      JSON.stringify(conditionsTranslations, null, 2),
    );

  // Write calendar-entry.tsx to root
  const entryPath = path.join(rootDir, 'calendar-entry.tsx');
  await fs.writeFile(entryPath, entryContent, 'utf-8');

  // Build with Vite
  console.log(`⚡ Running Vite build...`);
  execSync('bunx vite build --config build/vite.config.calendar.ts', {
    stdio: 'inherit',
    cwd: rootDir,
  });

  // Rename output file - Vite may put calendar.html under a subfolder (eg. dist-calendar/build/calendar.html)
  const distDir = path.join(rootDir, 'dist-calendar');
  // helper: recursively find calendar.html inside distDir
  async function findBuiltFile(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isFile() && entry.name === 'calendar.html') return full;
      if (entry.isDirectory()) {
        const found = await findBuiltFile(full);
        if (found) return found;
      }
    }
    return null;
  }

  const builtFile = await findBuiltFile(distDir);
  if (!builtFile) {
    // list dist folder for debugging
    const list = (await (async function listDir(d) {
      try {
        return await fs.readdir(d);
      } catch (e) {
        return [];
      }
    })(distDir)).join(', ');
    throw new Error(
      `Built file not found. Checked ${distDir}. Contents: ${list}`,
    );
  }

  const outputFile = path.join(distDir, `${country}.html`);
  await fs.rename(builtFile, outputFile);

  console.log(`✅ Built: dist-calendar/${country}.html\n`);
}

async function buildAllCountries() {
  // Merge dynamic translations into countries-data.json before building
  try {
    await fetchAndMergeDynamicTranslations();
  } catch (e) {
    console.warn('Warning: dynamic translations merge failed, continuing with existing file.');
  }

  const countriesDataPath = path.join(__dirname, 'countries-data.json');
  const data = JSON.parse(await fs.readFile(countriesDataPath, 'utf-8'));

  // Clear dist-calendar folder once at the start
  const distPath = path.join(rootDir, 'dist-calendar');
  try {
    await fs.rm(distPath, { recursive: true, force: true });
  } catch (e) {
    // Folder doesn't exist, that's fine
  }
  await fs.mkdir(distPath, { recursive: true });

  console.log(`🚀 Building ${Object.keys(data).length} calendars...\n`);

  for (const [country, translations] of Object.entries(data)) {
    await buildCalendar(country, translations.popups, translations.conditions);
  }

  // Cleanup - remove temporary entry file from project root if it exists
  const entryPath = path.join(rootDir, 'calendar-entry.tsx');
  try {
    await fs.unlink(entryPath);
  } catch (e) {
    // ignore if file does not exist
  }

  console.log(
    `\n🎉 All ${Object.keys(data).length} calendars built successfully!`,
  );
}

buildAllCountries().catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
