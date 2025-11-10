# Build Scripts

This directory contains all scripts, configuration files, and data for building the production calendar HTML files.

## Files

- **`build-calendars.js`** - Main script that builds all country calendars
- **`calendar-entry.template.txt`** - Template file for calendar entry point
- **`calendar.html`** - HTML template for Vite entry
- **`vite.config.calendar.ts`** - Vite configuration for calendar builds
- **`generate-entry.js`** - Helper script to generate entry file (used by build-calendars.js)
- **`countries-data.json`** - Translation data for all countries (download from constructor app)

## Usage

From the project root directory:

```bash
# Build all calendars
bun run build
```

This will:

1. Read `build/countries-data.json`
2. For each country, generate a calendar-entry.tsx file in root
3. Build with Vite using vite-plugin-singlefile
4. Output self-contained HTML files to `dist-calendar/`

## Output

Each country gets a single HTML file (~220-230 KB) with:

- React bundle inline
- All translations embedded
- CSS & JS minified
- Ready to deploy

## Prerequisites

- `build/countries-data.json` must exist
- Download it from the constructor app using "Download ALL Countries Data" button
- Save it to the `build/` directory
