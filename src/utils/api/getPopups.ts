import { getData } from './getData';

const POPUP_TAB = 'kk_advent_pops';

export async function getPopups() {
  return await getData(POPUP_TAB);
}
