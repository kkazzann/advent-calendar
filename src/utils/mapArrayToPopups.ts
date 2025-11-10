import type { PopupTranslations } from '../types/PopupTranslations';

// map to match translations
export function mapArrayToPopups(arr: any[]): PopupTranslations {
  // console.log(`map array:`, arr);

  return {
    conditions: arr[0] || '',
    see_conditions: arr[1] || '',
    shop_now: arr[2] || '',
    only_today: arr[3] || '',
    choose_from: arr[4] || '',

    // 03.12
    '0312__christmas_accessories': arr[5] || '',
    '0312__up_to_50_off': arr[6] || '',

    // 04.12
    '0412__free_candle_holder': arr[7] || '',
    '0412__when_you_spend_min_200': arr[8] || '',
    '0412__code_xxx': arr[9] || '',
    '0412__voucherid': arr[10] || '',

    // 05.12
    '0512__free_cake_stand': arr[11] || '',
    '0512__when_you_spend_min_250': arr[12] || '',
    '0512__code_xxx': arr[13] || '',
    '0512__voucherid': arr[14] || '',

    // 06.12
    '0612__free_kids_cushion': arr[15] || '',
    '0612__when_you_spend_min_200': arr[16] || '',
    '0612__code_xxx': arr[17] || '',
    '0612__voucherid': arr[18] || '',

    // 07.12
    '0712__free_table_lamp': arr[19] || '',
    '0712__when_you_spend_min_300': arr[20] || '',
    '0712__code_xxx': arr[21] || '',
    '0712__voucherid': arr[22] || '',

    // 08.12
    '0812__textiles': arr[23] || '',
    '0812__up_to_50_off': arr[24] || '',

    // 09.12
    '0912__free_clock': arr[25] || '',
    '0912__when_you_spend_min_250': arr[26] || '',
    '0912__code_xxx': arr[27] || '',
    '0912__voucherid': arr[28] || '',

    // 10.12
    '1012__free_blanket': arr[29] || '',
    '1012__when_you_spend_min_250': arr[30] || '',
    '1012__code_xxx': arr[31] || '',
    '1012__voucherid': arr[32] || '',

    // 11.12
    '1112__extra_10_off': arr[33] || '',
    '1112__when_you_spend_min_500': arr[34] || '',
    '1112__code_xxx': arr[35] || '',
    '1112__voucherid': arr[36] || '',

    // 12.12
    '1212__4_for_3': arr[37] || '',
    '1212__buy_2_products_desktop': arr[38] || '',
    '1212__buy_3_products_desktop': arr[39] || '',
    '1212__buy_4_products_desktop': arr[40] || '',
    '1212__buy_2_products_mobile': arr[41] || '',
    '1212__buy_3_products_mobile': arr[42] || '',
    '1212__buy_4_products_mobile': arr[43] || '',
    '1212__buy_2_code_xxx': arr[44] || '',
    '1212__buy_3_code_xxx': arr[45] || '',
    '1212__buy_4_code_xxx': arr[46] || '',
    '1212__voucherid': arr[47] || '',

    // 13.12
    '1312__free_cushion_set': arr[48] || '',
    '1312__when_you_spend_min_200': arr[49] || '',
    '1312__code_xxx': arr[50] || '',
    '1312__voucherid': arr[51] || '',

    // 14.12
    '1412__kids_room': arr[52] || '',
    '1412__up_to_50_off': arr[53] || '',

    // 15.12
    '1512__cashback': arr[54] || '',
    '1512__when_you_spend_min_150': arr[55] || '',
    '1512__code_xxx': arr[56] || '',
    '1512__voucherid': arr[57] || '',

    // 16.12
    '1612__free_kids_wall_decor': arr[58] || '',
    '1612__when_you_spend_min_200': arr[59] || '',
    '1612__code_xxx': arr[60] || '',
    '1612__voucherid': arr[61] || '',

    // 17.12
    '1712__free_wall_decor': arr[62] || '',
    '1712__when_you_spend_min_200': arr[63] || '',
    '1712__code_xxx': arr[64] || '',
    '1712__voucherid': arr[65] || '',

    // 18.12
    '1812__tableware': arr[66] || '',
    '1812__up_to_50_off': arr[67] || '',

    // 19.12
    '1912__rugs': arr[68] || '',
    '1912__up_to_50_off': arr[69] || '',

    // 20.12
    '2012__free_vase': arr[70] || '',
    '2012__when_you_spend_min_200': arr[71] || '',
    '2012__code_xxx': arr[72] || '',
    '2012__voucherid': arr[73] || '',

    // 21.12
    '2112__10_eur_discount': arr[74] || '',
    '2112__when_you_spend_min_100': arr[75] || '',
    '2112__code_xxx': arr[76] || '',
    '2112__voucherid': arr[77] || '',

    // 22.12
    '2212__free_mirror': arr[78] || '',
    '2212__when_you_spend_min_350': arr[79] || '',
    '2212__code_xxx': arr[80] || '',
    '2212__voucherid': arr[81] || '',

    // 23.12
    '2312__free_duvet_cover': arr[82] || '',
    '2312__when_you_spend_min_200': arr[83] || '',
    '2312__code_xxx': arr[84] || '',
    '2312__voucherid': arr[85] || '',

    // 24.12
    '2412__dining_room': arr[86] || '',
    '2412__up_to_50_off': arr[87] || '',
  };
}
