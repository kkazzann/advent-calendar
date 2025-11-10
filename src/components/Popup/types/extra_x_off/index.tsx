import styles from '../../Popup.module.scss';
import type { ExtraXOffPopup } from '../index';

interface Props {
  data: ExtraXOffPopup;
}

export const ExtraXOffLayout = ({ data }: Props) => {
  // console.log(data);
  // {
  //     "type": "extra_x_off",
  //     "image": "https://pictureserver.net/static/2025/advent_calendar/popup/3dev.png",
  //     "only_today": "Pouze dnes",
  //     "see_conditions": "Zobrazit podmínky",
  //     "deal": "Extra sleva<span className=\"{styles.offpercentage}\"><br>10 %</span>",
  //     "spend_amount": "při nákupu nad 13 000 Kč",
  //     "code_xxx": "cz10advent25",
  //     "voucherId": "1805930"
  // }

  // Replace className={styles.offpercentage} with class="actual-css-class"
  const dealHtml = (data.deal || '').replace(
    /className=\{styles\.offpercentage\}/g,
    `class="${styles.offpercentage}"`,
  );

  return (
    <div className={styles.container}>
      {/* deal 
      extra XX off - split in 2 lines in translations spreadsheet */}
      <div
        className={styles.title}
        dangerouslySetInnerHTML={{
          __html: dealHtml || 'translations not found',
        }}
      />

      <div
        className={styles.subtitle}
        dangerouslySetInnerHTML={{
          __html: data.spend_amount || 'translations not found',
        }}
      />

      <div className={styles.code}>
        {data.code_xxx || 'translations not found'}
      </div>
    </div>
  );
};
