import styles from '../../Popup.module.scss';
import type { UpToXOffPopup } from '../index';

interface Props {
  data: UpToXOffPopup;
}

export const UpToXOffLayout = ({ data }: Props) => {
  // console.log(data);
  //   {
  //     "type": "up_to_x_off",
  //     "image": "https://pictureserver.net/static/2025/advent_calendar/popup/1dev.png",
  //     "only_today": "Pouze dnes",
  //     "see_conditions": "Zobrazit podmínky",
  //     "category_title": "Vánoční doplňky",
  //     "deal": "Sleva až<span className=\"{styles.offpercentage}\"><br>50 %</span>"
  // }

  // Replace className={styles.offpercentage} with class="actual-css-class"
  // Also handle className={styles.bold} for 4_for_3 type
  const dealHtml = (data.deal || '')
    .replace(
      /className=\{styles\.offpercentage\}/g,
      `class="${styles.offpercentage}"`,
    )
    .replace(/className=\{styles\.bold\}/g, `class="${styles.bold}"`);

  return (
    <div className={styles.container}>
      {/* category title */}
      <div
        className={styles.category_title}
        dangerouslySetInnerHTML={{
          __html: data.category_title || 'translations not found',
        }}
      />

      {/* deal - Up to<span className={styles.offpercentage}>50%</span> */}
      <div
        className={styles.title}
        dangerouslySetInnerHTML={{
          __html: dealHtml || 'translations not found',
        }}
      />
    </div>
  );
};
