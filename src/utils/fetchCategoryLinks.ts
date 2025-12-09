/**
 * Fetch category slugs/translations from the provided API and build
 * a mapping from day number -> localized path (ready to append to origin).
 *
 * Usage:
 *   // optional mapping day->apiKey (if your API key differs from our internal keys)
 *   const dayToApiKey = { 3: 'home-accessories', 24: 'dining-room' };
 *   const popupLinks = await fetchCategoryLinks('uk', dayToApiKey);
 *   // popupLinks -> { 3: '/home-accessories', 24: '/dining-room' }
 *
 */
import { getCategoryLinks } from './api/getCategoryLinks';

export async function fetchCategoryLinks(
  countryCode: string,
  dayToApiKey?: Record<number, string>,
  apiUrl?: string
): Promise<Record<number, string>> {
  // fetch the category links JSON from provided API helper
  const json = await getCategoryLinks(apiUrl);
  if (!json || !json.data) {
    throw new Error('Invalid category links response');
  }

  const data = json.data as Record<string, string[]>;
  const slugs = data['slug'];
  if (!Array.isArray(slugs)) {
    throw new Error('Category links response missing slug array');
  }

  // find index for the requested country code in the slug array
  const normalized = countryCode ? countryCode.toLowerCase() : '';
  let countryIndex = slugs.findIndex((s) => s === normalized);
  if (countryIndex === -1) {
    // try to match with small variants (e.g. CHDE might be chde)
    countryIndex = slugs.findIndex((s) => s === normalized.replace(/_/g, '-'));
  }

  if (countryIndex === -1) {
    // fallback to first locale
    countryIndex = 0;
  }

  const out: Record<number, string> = {};

  if (!dayToApiKey) {
    // nothing to map — return empty object
    return out;
  }

  for (const [dayStr, apiKey] of Object.entries(dayToApiKey)) {
    const day = Number(dayStr);
    // apiKey may be a nested path like '/home-accessories/kitchenware-tableware/'
    const rawKey = (apiKey as string) || '';
    const segments = rawKey.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);

    if (segments.length === 0) {
      // eslint-disable-next-line no-console
      console.warn(
        `Category links API: invalid empty key provided for day ${day}.`,
      );
      continue;
    }

    const localizedSegments: string[] = [];
    let missingSegment = false;

    for (const seg of segments) {
      const segKey = seg; // seg is expected to match API's key
      const segTranslations = data[segKey];
      if (!segTranslations || !Array.isArray(segTranslations)) {
        // try without hyphens/with underscores fallback
        const altKey = seg.replace(/-/g, '_');
        const altTranslations = data[altKey];
        if (altTranslations && Array.isArray(altTranslations)) {
          // use alt
          const localizedAlt = altTranslations[countryIndex] || altTranslations[0];
          if (localizedAlt) {
            localizedSegments.push(
              String(localizedAlt).replace(/^\/+|\/+$/g, '').trim(),
            );
            continue;
          }
        }

        // log missing API key for this segment
        // eslint-disable-next-line no-console
        console.warn(
          `Category links API: missing key "${segKey}" (segment of "${apiKey}") for day ${day}. Please add it to the category links service.`,
        );
        missingSegment = true;
        break;
      }

      const localized = segTranslations[countryIndex] || segTranslations[0];
      if (!localized) {
        // log missing localized slug for this country
        // eslint-disable-next-line no-console
        console.warn(
          `Category links API: no localized slug for key "${segKey}" and country "${countryCode}" (day ${day}). Please add the translation in the API.`,
        );
        missingSegment = true;
        break;
      }

      // clean localized segment and push
      localizedSegments.push(String(localized).replace(/^\/+|\/+$/g, '').trim());
    }

    if (missingSegment) continue;

    // join localized segments into a path
    const path = '/' + localizedSegments.join('/');
    out[day] = path;
  }

  return out;
}

export default fetchCategoryLinks;
