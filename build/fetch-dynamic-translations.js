import fs from 'fs/promises';
import path from 'path';

const TITLE_URL = 'https://fed2n8e59dpq.share.zrok.io/dynamic/2025/03.12.25%20-%20Advent%20calendar/12:13';
const DESC_URL = 'https://fed2n8e59dpq.share.zrok.io/dynamic/2025/03.12.25%20-%20Advent%20calendar/15';

async function fetchJson(url) {
  const res = await fetch(url, { headers: { skip_zrok_interstitial: '1' } });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url} - ${res.status}`);
  }
  return res.json();
}

function joinNonNull(arr) {
  if (!Array.isArray(arr)) return undefined;
  return arr.filter((x) => x !== null && x !== undefined).map(String).join('<br/>');
}

export async function fetchAndMergeDynamicTranslations() {
  const filePath = path.join(__dirname, 'countries-data.json');
  let countriesJson;
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    countriesJson = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Unable to read countries-data.json: ${err}`);
  }

  try {
    const [titleResp, descResp] = await Promise.all([
      fetchJson(TITLE_URL),
      fetchJson(DESC_URL),
    ]);

    const titleData = titleResp && titleResp.data ? titleResp.data : {};
    const descData = descResp && descResp.data ? descResp.data : {};

    for (const country of Object.keys(countriesJson)) {
      const titleArr = titleData[country] || titleData[country.toUpperCase()] || titleData[country.toLowerCase()];
      const descArr = descData[country] || descData[country.toUpperCase()] || descData[country.toLowerCase()];

      const pageTitle = joinNonNull(titleArr) || undefined;
      const pageDesc = joinNonNull(descArr) || undefined;

      // Ensure popups object exists
      countriesJson[country].popups = countriesJson[country].popups || {};

      if (pageTitle) countriesJson[country].popups['page_title'] = pageTitle;
      if (pageDesc) countriesJson[country].popups['page_description'] = pageDesc;
    }

    // Write back
    await fs.writeFile(filePath, JSON.stringify(countriesJson, null, 2), 'utf-8');
    console.log('✅ Merged dynamic translations into build/countries-data.json');
  } catch (err) {
    console.warn('⚠️  Could not fetch/merge dynamic translations:', err);
  }
}

if (require.main === module) {
  fetchAndMergeDynamicTranslations().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

export default fetchAndMergeDynamicTranslations;
