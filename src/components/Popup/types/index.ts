// Base popup data structure
export interface BasePopupData {
  imageDesktop: string;
  imageMobile: string;
  only_today: string;
  see_conditions: string;
}

// up_to_x_off: Category sales (03, 08, 14, 18, 19, 24)
export interface UpToXOffPopup extends BasePopupData {
  type: 'up_to_x_off';
  category_title: string;
  deal: string;
  // optional URL to the category / shop page — if present the popup (except code/conditions)
  // can link to this URL
  link?: string;
}

// free_x_spend_x: Free item with minimum spend (04, 05, 06, 07, 09, 10, 13, 16, 17, 20, 22, 23)
export interface FreeXSpendXPopup extends BasePopupData {
  type: 'free_x_spend_x';
  deal: string;
  spend_amount: string;
  code_xxx: string;
  voucherId?: string;
}

// extra_x_off: Extra discount (11)
export interface ExtraXOffPopup extends BasePopupData {
  type: 'extra_x_off';
  deal: string;
  spend_amount: string;
  code_xxx: string;
  voucherId?: string;
}

// 4_for_3: Buy multiple get discount (12)
export interface FourForThreePopup extends BasePopupData {
  type: '4_for_3';
  deal: string;
  buy_2_desktop: string;
  buy_2_mobile: string;
  code_2: string;
  buy_3_desktop: string;
  buy_3_mobile: string;
  code_3: string;
  buy_4_desktop: string;
  buy_4_mobile: string;
  code_4: string;
  voucherId?: string;
}

// cashback: Cashback offer (15)
export interface CashbackPopup extends BasePopupData {
  type: 'cashback';
  deal: string;
  spend_amount: string;
  code_xxx: string;
  voucherId?: string;
}

// discount: Fixed discount (21)
export interface DiscountPopup extends BasePopupData {
  type: 'discount';
  deal: string;
  spend_amount: string;
  code_xxx: string;
  voucherId?: string;
}

export type PopupData =
  | UpToXOffPopup
  | FreeXSpendXPopup
  | ExtraXOffPopup
  | FourForThreePopup
  | CashbackPopup
  | DiscountPopup;
