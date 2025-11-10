import type { ConditionsTranslations } from '../types/ConditionsTranslations';

// map to match translations
export function mapArrayToConditions(arr: any[]): ConditionsTranslations {
  return {
    regular: arr[0] || '',
    free_candle_holder: arr[1] || '',
    free_cake_stands: arr[2] || '',
    free_kids_cushions: arr[3] || '',
    free_table_lamps: arr[4] || '',
    free_clock: arr[5] || '',
    free_blanket: arr[6] || '',
    extra_10: arr[7] || '',
    '4_for_3': arr[8] || '',
    free_cushions: arr[9] || '',
    cashback: arr[10] || '',
    free_kids_wall_decor: arr[11] || '',
    free_wall_decor: arr[12] || '',
    free_vases: arr[13] || '',
    '10_eur_discount': arr[14] || '',
    free_mirror: arr[15] || '',
    free_bed_linen: arr[16] || '',
  };
}
