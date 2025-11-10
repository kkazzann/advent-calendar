import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

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

  // Rename output file
  const builtFile = path.join(rootDir, 'dist-calendar', 'calendar.html');
  const outputFile = path.join(rootDir, 'dist-calendar', `${country}.html`);
  await fs.rename(builtFile, outputFile);

  console.log(`✅ Built: dist-calendar/${country}.html\n`);
}

async function buildAllCountries() {
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

  // Cleanup
  const entryPath = path.join(__dirname, 'calendar-entry.tsx');
  await fs.unlink(entryPath);

  console.log(
    `\n🎉 All ${Object.keys(data).length} calendars built successfully!`,
  );
}

buildAllCountries().catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
