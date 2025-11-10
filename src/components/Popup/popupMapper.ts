import type { PopupTranslations } from '../../types/PopupTranslations';
import type { PopupData } from './types';

// Image mapping (6 images recycled)
export const POPUP_IMAGES = {
  1: '1dev_v3',
  2: '2dev_v3',
  3: '3dev_v3',
  4: '4dev_v3',
  5: '5dev_v3',
  6: '6dev_v3',
} as const;

// Day to popup type mapping
export const DAY_POPUP_CONFIG: Record<
  number,
  { type: PopupData['type']; image: keyof typeof POPUP_IMAGES }
> = {
  3: { type: 'up_to_x_off', image: 1 },
  4: { type: 'free_x_spend_x', image: 2 },
  5: { type: 'free_x_spend_x', image: 2 },
  6: { type: 'free_x_spend_x', image: 2 },
  7: { type: 'free_x_spend_x', image: 2 },
  8: { type: 'up_to_x_off', image: 1 },
  9: { type: 'free_x_spend_x', image: 2 },
  10: { type: 'free_x_spend_x', image: 2 },
  11: { type: 'extra_x_off', image: 3 },
  12: { type: '4_for_3', image: 4 },
  13: { type: 'free_x_spend_x', image: 2 },
  14: { type: 'up_to_x_off', image: 1 },
  15: { type: 'cashback', image: 5 },
  16: { type: 'free_x_spend_x', image: 2 },
  17: { type: 'free_x_spend_x', image: 2 },
  18: { type: 'up_to_x_off', image: 1 },
  19: { type: 'up_to_x_off', image: 1 },
  20: { type: 'free_x_spend_x', image: 2 },
  21: { type: 'discount', image: 6 },
  22: { type: 'free_x_spend_x', image: 2 },
  23: { type: 'free_x_spend_x', image: 2 },
  24: { type: 'up_to_x_off', image: 1 },
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
const UP_TO_X_OFF_CATEGORY_KEYS: Record<number, string> = {
  3: 'christmas_accessories',
  8: 'textiles',
  14: 'kids_room',
  18: 'tableware',
  19: 'rugs',
  24: 'dining_room',
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
  day: number,
): keyof import('../../types/ConditionsTranslations').ConditionsTranslations {
  return DAY_CONDITION_KEYS[day] || 'regular';
}

export function getPopupData(
  day: number,
  translations: PopupTranslations,
): PopupData | null {
  // console.log("Getting popup data for day:", day, DAY_POPUP_CONFIG[day]);
  const config = DAY_POPUP_CONFIG[day];
  if (!config) {
    // console.log("nie ma takiego dnia w kalendarzu");
    return null;
  }

  const dayStr = day.toString().padStart(2, '0');
  const baseData = {
    imageDesktop: `https://pictureserver.net/static/2025/advent_calendar/popup/${
      POPUP_IMAGES[config.image]
    }_desktop.png`,
    imageMobile: `https://pictureserver.net/static/2025/advent_calendar/popup/${
      POPUP_IMAGES[config.image]
    }_mobile.png`,
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
