import type { PopupTranslations } from '../../types/PopupTranslations';
import type { PopupData } from './types';

// unused...
// Image mapping (6 images recycled)
export const POPUP_IMAGES: Record<number, 'png' | 'gif'> = {
  3: 'png',
  4: 'png',
  5: 'gif',
  6: 'gif',
  7: 'gif',
  8: 'png',
  9: 'png',
  10: 'png',
  11: 'png',
  12: 'png',
  13: 'gif',
  14: 'png',
  15: 'png',
  16: 'gif',
  17: 'gif',
  18: 'png',
  19: 'png',
  20: 'gif',
  21: 'png',
  22: 'gif',
  23: 'gif',
  24: 'png',
};

// Day to popup type mapping
export const DAY_POPUP_CONFIG: Record<number, { type: PopupData['type'] }> = {
  3: { type: 'up_to_x_off' },
  4: { type: 'free_x_spend_x' },
  5: { type: 'free_x_spend_x' },
  6: { type: 'free_x_spend_x' },
  7: { type: 'free_x_spend_x' },
  8: { type: 'up_to_x_off' },
  9: { type: 'free_x_spend_x' },
  10: { type: 'free_x_spend_x' },
  11: { type: 'extra_x_off' },
  12: { type: '4_for_3' },
  13: { type: 'free_x_spend_x' },
  14: { type: 'up_to_x_off' },
  15: { type: 'cashback' },
  16: { type: 'free_x_spend_x' },
  17: { type: 'free_x_spend_x' },
  18: { type: 'up_to_x_off' },
  19: { type: 'up_to_x_off' },
  20: { type: 'free_x_spend_x' },
  21: { type: 'discount' },
  22: { type: 'free_x_spend_x' },
  23: { type: 'free_x_spend_x' },
  24: { type: 'up_to_x_off' },
};

// Mapping for free_x_spend_x deal names (varies per day)
const FREE_X_SPEND_X_DEAL_KEYS: Record<number, string> = {
  4: 'free_candle_holder',
  5: 'free_cake_stand',
  6: 'free_kids_cushion',
  7: 'free_table_lamp',
  9: 'free_clock',
  10: 'free_blanket',
  13: 'free_cushion_set',
  16: 'free_kids_wall_decor',
  17: 'free_wall_decor',
  20: 'free_vase',
  22: 'free_mirror',
  23: 'free_duvet_cover',
};

// Mapping for free_x_spend_x spend amount keys (varies per day)
const FREE_X_SPEND_X_SPEND_KEYS: Record<number, string> = {
  4: 'when_you_spend_min_200',
  5: 'when_you_spend_min_250',
  6: 'when_you_spend_min_200',
  7: 'when_you_spend_min_300',
  9: 'when_you_spend_min_250',
  10: 'when_you_spend_min_250',
  13: 'when_you_spend_min_200',
  16: 'when_you_spend_min_200',
  17: 'when_you_spend_min_200',
  20: 'when_you_spend_min_200',
  22: 'when_you_spend_min_350',
  23: 'when_you_spend_min_200',
};

// Mapping for up_to_x_off category names
export const UP_TO_X_OFF_CATEGORY_KEYS: Record<number, string> = {
  3: 'christmas_accessories',
  8: 'textiles',
  14: 'kids_room',
  18: 'tableware',
  19: 'rugs',
  24: 'dining_room',
};

// Explicit API keys (slugs) used by the category links service.
// These often differ from the human-readable translation keys above.
// Edit these to match the API's keys exactly (hyphenated, nested, etc.).
export const UP_TO_X_OFF_CATEGORY_LINKS: Record<number, string> = {
  3: '/christmas-shop/christmas-accessories/',
  8: '/textiles/',
  14: '/children-room/',
  18: '/home-accessories/kitchenware-tableware/',
  19: '/rugs/',
  24: '/dining-room-furniture/',
};

// Mapping days to condition keys from ConditionsTranslations
const DAY_CONDITION_KEYS: Record<
  number,
  keyof import('../../types/ConditionsTranslations').ConditionsTranslations
> = {
  3: 'regular', // up_to_x_off - christmas accessories
  4: 'free_candle_holder',
  5: 'free_cake_stands',
  6: 'free_kids_cushions',
  7: 'free_table_lamps',
  8: 'regular', // up_to_x_off - textiles
  9: 'free_clock',
  10: 'free_blanket',
  11: 'extra_10',
  12: '4_for_3',
  13: 'free_cushions',
  14: 'regular', // up_to_x_off - kids room
  15: 'cashback',
  16: 'free_kids_wall_decor',
  17: 'free_wall_decor',
  18: 'regular', // up_to_x_off - tableware
  19: 'regular', // up_to_x_off - rugs
  20: 'free_vases',
  21: '10_eur_discount',
  22: 'free_mirror',
  23: 'free_bed_linen',
  24: 'regular', // up_to_x_off - dining room
};

// Get the condition key for a specific day
export function getConditionKey(
  day: number
): keyof import('../../types/ConditionsTranslations').ConditionsTranslations {
  return DAY_CONDITION_KEYS[day] || 'regular';
}

export function getPopupData(
  day: number,
  translations: PopupTranslations,
  popupLinks?: Record<number, string>,
  origin?: string
): PopupData | null {
  // console.log("Getting popup data for day:", day, DAY_POPUP_CONFIG[day]);
  const config = DAY_POPUP_CONFIG[day];
  if (!config) {
    // console.log("nie ma takiego dnia w kalendarzu");
    return null;
  }

  const dayStr = day.toString().padStart(2, '0');

  const imageBase =
    'https://pictureserver.net/static/2025/advent_calendar/popup/new/';

  const imageVersion = '?ver=10';

  const baseData = {
    imageDesktop: `${imageBase}day${day}_desktop.${POPUP_IMAGES[day]}${imageVersion}`,
    imageMobile: `${imageBase}day${day}_mobile.${POPUP_IMAGES[day]}${imageVersion}`,
    only_today: translations.only_today,
    see_conditions: translations.see_conditions,
  };

  switch (config.type) {
    case 'up_to_x_off':
      const categoryKey = UP_TO_X_OFF_CATEGORY_KEYS[day];

      if (!categoryKey) {
        // console.error(`Missing category key mapping for day ${day}`);
        return null;
      }

      // try to find a link/url in translations for this day (if present)
      const possibleLinkKeys = [
        `${dayStr}12__link`,
        `${dayStr}12__url`,
        `${dayStr}12__shop_link`,
        `${dayStr}12__shop_url`,
        `${dayStr}12__category_url`,
      ] as const;

      let link: string | undefined = undefined;
      for (const k of possibleLinkKeys) {
        const v = translations[k as keyof PopupTranslations] as unknown as
          | string
          | undefined;
        if (v && v.trim()) {
          // sanitize: ensure it looks like a URL (very permissive)
          if (/^https?:\/\//i.test(v.trim())) {
            link = v.trim();
            break;
          }
          // allow protocol-relative or site-root paths as well
          if (/^\//.test(v.trim()) || /^\w+:/.test(v.trim())) {
            link = v.trim();
            break;
          }
        }
      }

      // if translations didn't include a full link, fallback to popupLinks map
      if (!link && popupLinks && popupLinks[day]) {
        const p = popupLinks[day];
        const base =
          origin || (typeof window !== 'undefined' ? window.origin : '');
        if (base) {
          // ensure no duplicate slashes
          link = base.replace(/\/$/, '') + (p.startsWith('/') ? p : '/' + p);
        } else {
          // fallback to relative path
          link = p;
        }
      }

      return {
        type: 'up_to_x_off',
        ...baseData,
        category_title:
          (translations[
            `${dayStr}12__${categoryKey}` as keyof PopupTranslations
          ] as string) || '',
        deal:
          (translations[
            `${dayStr}12__up_to_50_off` as keyof PopupTranslations
          ] as string) || '',
        link,
      };

    case 'free_x_spend_x':
      const dealKey = FREE_X_SPEND_X_DEAL_KEYS[day];
      const spendKey = FREE_X_SPEND_X_SPEND_KEYS[day];

      if (!dealKey || !spendKey) {
        // console.error(`Missing deal/spend key mapping for day ${day}`);
        return null;
      }

      return {
        type: 'free_x_spend_x',
        ...baseData,
        deal:
          (translations[
            `${dayStr}12__${dealKey}` as keyof PopupTranslations
          ] as string) || '',
        spend_amount:
          (translations[
            `${dayStr}12__${spendKey}` as keyof PopupTranslations
          ] as string) || '',
        code_xxx:
          (translations[
            `${dayStr}12__code_xxx` as keyof PopupTranslations
          ] as string) || '',
        voucherId:
          (translations[
            `${dayStr}12__voucherid` as keyof PopupTranslations
          ] as string) || undefined,
      };

    case 'extra_x_off':
      return {
        type: 'extra_x_off',
        ...baseData,
        deal: translations['1112__extra_10_off'],
        spend_amount: translations['1112__when_you_spend_min_500'],
        code_xxx: translations['1112__code_xxx'] || '',
        voucherId: translations['1112__voucherid'] || undefined,
      };

    case '4_for_3':
      return {
        type: '4_for_3',
        ...baseData,
        deal: translations['1212__4_for_3'],
        buy_2_desktop: translations['1212__buy_2_products_desktop'],
        buy_2_mobile: translations['1212__buy_2_products_mobile'],
        code_2: translations['1212__buy_2_code_xxx'] || '',
        buy_3_desktop: translations['1212__buy_3_products_desktop'],
        buy_3_mobile: translations['1212__buy_3_products_mobile'],
        code_3: translations['1212__buy_3_code_xxx'] || '',
        buy_4_desktop: translations['1212__buy_4_products_desktop'],
        buy_4_mobile: translations['1212__buy_4_products_mobile'],
        code_4: translations['1212__buy_4_code_xxx'] || '',
        voucherId: translations['1212__voucherid'] || undefined,
      };

    case 'cashback':
      return {
        type: 'cashback',
        ...baseData,
        deal: translations['1512__cashback'],
        spend_amount: translations['1512__when_you_spend_min_150'],
        code_xxx: translations['1512__code_xxx'] || '',
        voucherId: translations['1512__voucherid'] || undefined,
      };

    case 'discount':
      return {
        type: 'discount',
        ...baseData,
        deal: translations['2112__10_eur_discount'],
        spend_amount: translations['2112__when_you_spend_min_100'],
        code_xxx: translations['2112__code_xxx'] || '',
        voucherId: translations['2112__voucherid'] || undefined,
      };

    default:
      return null;
  }
}
