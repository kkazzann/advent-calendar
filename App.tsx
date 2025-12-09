import React, { useState, useEffect, useRef } from 'react';

import Advent from './src/Advent';

import { mapArrayToConditions } from './src/utils/mapArrayToConditions';
import { mapArrayToPopups } from './src/utils/mapArrayToPopups';
import { getConditions } from './src/utils/api/getConditions';
import { getPopups } from './src/utils/api/getPopups';

import type { ConditionsTranslations } from './src/types/ConditionsTranslations';
import type { PopupTranslations } from './src/types/PopupTranslations';

const countries = [
  'UK',
  'PL',
  'DE',
  'AT',
  'CHDE',
  'NL',
  'BENL',
  'FR',
  'CHFR',
  'BEFR',
  'ES',
  'PT',
  'IT',
  'DK',
  'NO',
  'FI',
  'SE',
  'CZ',
  'SK',
  'HU',
  'RO',
];

function App() {
  const [selectedCountry, setSelectedCountry] = useState('CZ');
  const [conditionsMap, setConditionsMap] = useState<
    Record<string, ConditionsTranslations>
  >({});
  const [popupsMap, setPopupsMap] = useState<Record<string, PopupTranslations>>(
    {},
  );
  const [htmlOutput, setHtmlOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [building, setBuilding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);

        const [conditions, popups] = await Promise.all([
          getConditions(),
          getPopups(),
        ]);

        // console.log("🔍 API Response - Countries available:");
        // console.log("Conditions countries:", Object.keys(conditions.data));
        // console.log("Popups countries:", Object.keys(popups.data));

        const cMap: Record<string, ConditionsTranslations> = {};
        const pMap: Record<string, PopupTranslations> = {};

        countries.forEach((country) => {
          if (conditions.data[country]) {
            cMap[country] = mapArrayToConditions(conditions.data[country]);
          } else {
            // console.warn(`⚠️ Missing conditions data for: ${country}`);
          }
          if (popups.data[country]) {
            pMap[country] = mapArrayToPopups(popups.data[country]);
          } else {
            // console.warn(`⚠️ Missing popups data for: ${country}`);
          }
        });

        // Fetch dynamic page title/description for preview and merge into popups map
        try {
          const TITLE_URL =
            'https://fed2n8e59dpq.share.zrok.io/dynamic/2025/03.12.25%20-%20Advent%20calendar/12:13';
          const DESC_URL =
            'https://fed2n8e59dpq.share.zrok.io/dynamic/2025/03.12.25%20-%20Advent%20calendar/15';

          const [tRes, dRes] = await Promise.all([
            fetch(TITLE_URL, { headers: { skip_zrok_interstitial: '1' } }),
            fetch(DESC_URL, { headers: { skip_zrok_interstitial: '1' } }),
          ]);

          const titleJson = tRes.ok ? await tRes.json() : null;
          const descJson = dRes.ok ? await dRes.json() : null;

          const titleData = titleJson && titleJson.data ? titleJson.data : {};
          const descData = descJson && descJson.data ? descJson.data : {};

          const joinNonNull = (arr: any) => {
            if (!Array.isArray(arr)) return undefined;
            return arr.filter((x) => x !== null && x !== undefined).map(String).join('<br/>');
          };

          for (const country of countries) {
            if (!pMap[country]) continue;
            const tArr = titleData[country] || titleData[country.toUpperCase()] || titleData[country.toLowerCase()];
            const dArr = descData[country] || descData[country.toUpperCase()] || descData[country.toLowerCase()];
            const pageTitle = joinNonNull(tArr);
            const pageDesc = joinNonNull(dArr);
            if (pageTitle) (pMap[country] as any).page_title = pageTitle;
            if (pageDesc) (pMap[country] as any).page_description = pageDesc;
          }
        } catch (err) {
          // non-fatal — preview will still work without dynamic page texts
          // eslint-disable-next-line no-console
          console.warn('Failed to fetch dynamic preview titles/descriptions', err);
        }

        setConditionsMap(cMap);
        setPopupsMap(pMap);
        setLoading(false);
      } catch (error) {
        // console.error("Failed to load data:", error);
        setError(
          error instanceof Error ? error.message : 'Failed to load data',
        );
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (
      !loading &&
      conditionsMap[selectedCountry] &&
      popupsMap[selectedCountry]
    ) {
      // Wait for DOM to render before generating HTML
      setTimeout(() => {
        generateHTML();
      }, 500);
    }
  }, [selectedCountry, loading, conditionsMap, popupsMap]);

  const previewRef = useRef<HTMLDivElement>(null);

  const generateHTML = async () => {
    if (!currentConditions || !currentPopups) return;

    // Create entry file for this country
    const templatePath = 'build/calendar-entry.template.tsx';
    const template = await fetch(templatePath).then((r) => r.text());

    const entryContent = template
      .replace('"{{COUNTRY_CODE}}"', `"${selectedCountry}"`)
      .replace('{{POPUP_TRANSLATIONS}}', JSON.stringify(currentPopups, null, 2))
      .replace(
        '{{CONDITIONS_TRANSLATIONS}}',
        JSON.stringify(currentConditions, null, 2),
      );

    // For now, just show the generated entry file content
    // In production, this would trigger a Vite build
    setHtmlOutput(entryContent);
  };

  const buildCalendar = async () => {
    setBuilding(true);

    try {
      // Collect all countries data
      const allCountriesData: Record<string, any> = {};
      const foundCountries: string[] = [];

      for (const country of countries) {
        if (conditionsMap[country] && popupsMap[country]) {
          allCountriesData[country] = {
            popups: popupsMap[country],
            conditions: conditionsMap[country],
          };
          foundCountries.push(country);
        }
      }

      if (foundCountries.length === 0) {
        alert(
          '⚠️ No country data available yet. Please wait for data to load.',
        );
        setBuilding(false);
        return;
      }

      // Download countries-data.json
      const dataStr = JSON.stringify(allCountriesData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'countries-data.json';
      a.click();
      URL.revokeObjectURL(url);

      alert(
        `✅ Downloaded countries-data.json with ALL ${foundCountries.length} countries!\n\n` +
          `Countries included:\n${foundCountries.join(', ')}\n\n` +
          `Next steps:\n` +
          `1. Save countries-data.json to build/ directory\n` +
          `2. Run: node build/build-calendars.js\n` +
          `3. Get ${foundCountries.length} HTML files in: dist-calendar/\n\n` +
          `Each country will be a single HTML file (~226 KB) with React bundle inline.`,
      );
    } catch (error) {
      // console.error("Build failed:", error);
      alert('Build failed: ' + error);
    } finally {
      setBuilding(false);
    }
  };

  const currentConditions = conditionsMap[selectedCountry];
  const currentPopups = popupsMap[selectedCountry];

  return (
    <div>
      {/* Sidebar */}
      <div>
        <div>Select Country</div>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <div>
          {!loading &&
            `${Object.keys(conditionsMap).length} / ${
              countries.length
            } countries loaded`}
        </div>
      </div>

      {/* Main content */}
      <main>
        {/* Top bar */}
        <div>
          <div>Advent Calendar - {selectedCountry} (Preview)</div>
          <button onClick={buildCalendar} disabled={building || loading}>
            {building ? 'Preparing...' : 'Download ALL Countries Data'}
          </button>
        </div>

        {/* Live Preview */}
        <div ref={previewRef}>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {!loading && !error && currentConditions && currentPopups && (
            <Advent
              country={selectedCountry}
              popupTranslations={currentPopups}
              conditionsTranslations={currentConditions}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
