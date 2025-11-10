import { getData } from './getData';

const CONDITIONS_TAB = 'kk_advent_cond';

export async function getConditions() {
  return await getData(CONDITIONS_TAB);
}
