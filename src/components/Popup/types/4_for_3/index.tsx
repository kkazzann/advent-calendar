import styles from '../../Popup.module.scss';
import type { FourForThreePopup } from '../index';

interface Props {
  data: FourForThreePopup;
}

export const FourForThreeLayout = ({ data }: Props) => {
  // console.log(data);
  // {
  //     "type": "4_for_3",
  //     "imageDesktop": "https://pictureserver.net/static/2025/advent_calendar/popup/4dev_v3_desktop.png",
  //     "imageMobile": "https://pictureserver.net/static/2025/advent_calendar/popup/4dev_v3_mobile.png",
  //     "only_today": "Pouze dnes",
  //     "see_conditions": "Zobrazit podmínky",
  //     "deal": "4 za cenu 3",
  //     "buy_2_desktop": "",
  //     "buy_2_mobile": "",
  //     "code_2": "",
  //     "buy_3_desktop": "",
  //     "buy_3_mobile": "",
  //     "code_3": "",
  //     "buy_4_desktop": "",
  //     "buy_4_mobile": "",
  //     "code_4": ""
  // }

  // Replace className={styles.bold} with class="actual-css-class"
  const replaceBoldClass = (html: string) =>
    html.replace(/className=\{styles\.bold\}/g, `class="${styles.bold}"`);

  return (
    <div className={styles.container}>
      <div
        className={styles.title}
        dangerouslySetInnerHTML={{
          __html: data.deal || 'translations not found',
        }}
      />

      <div className={styles.deal_4for3_container}>
        {/* buy 2 */}
        <div className={styles.deal_4for3}>
          <div
            className={styles.desktop}
            dangerouslySetInnerHTML={{
              __html: replaceBoldClass(data.buy_2_desktop || ''),
            }}
          ></div>

          <div
            className={styles.mobile}
            dangerouslySetInnerHTML={{
              __html: replaceBoldClass(data.buy_2_mobile || ''),
            }}
          ></div>

          <div className={styles.code}>{data.code_2}</div>
        </div>

        {/* buy 3 */}
        <div className={styles.deal_4for3}>
          <div
            className={styles.desktop}
            dangerouslySetInnerHTML={{
              __html: replaceBoldClass(data.buy_3_desktop || ''),
            }}
          ></div>

          <div
            className={styles.mobile}
            dangerouslySetInnerHTML={{
              __html: replaceBoldClass(data.buy_3_mobile || ''),
            }}
          ></div>

          <div className={styles.code}>{data.code_3}</div>
        </div>

        {/* buy 4 */}
        <div className={styles.deal_4for3}>
          <div
            className={styles.desktop}
            dangerouslySetInnerHTML={{
              __html: replaceBoldClass(data.buy_4_desktop || ''),
            }}
          ></div>

          <div
            className={styles.mobile}
            dangerouslySetInnerHTML={{
              __html: replaceBoldClass(data.buy_4_mobile || ''),
            }}
          ></div>

          <div className={styles.code}>{data.code_4}</div>
        </div>
      </div>
    </div>
  );
};
