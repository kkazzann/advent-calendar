import styles from '../../Popup.module.scss';
import type { CashbackPopup } from '../index';

interface Props {
  data: CashbackPopup;
}

export const CashbackLayout = ({ data }: Props) => {
  // console.log(data);
  //   {
  //     "type": "cashback",
  //     "imageDesktop": "https://pictureserver.net/static/2025/advent_calendar/popup/5dev_v3_desktop.png",
  //     "imageMobile": "https://pictureserver.net/static/2025/advent_calendar/popup/5dev_v3_mobile.png",
  //     "only_today": "Vain tänään",
  //     "see_conditions": "Katso ehdot",
  //     "deal": "50 €<br />cashback",
  //     "spend_amount": "vähintään 150 € tilauksen yhteydessä",
  //     "code_xxx": ""
  // }
  return (
    <div className={styles.container}>
      <div
        className={styles.title}
        dangerouslySetInnerHTML={{
          __html: data.deal || 'translations not found',
        }}
      />

      <div className={styles.subtitle}>
        {data.spend_amount || 'translations not found'}

        <div className={styles.code}>
          {data.code_xxx || 'translations not found'}
        </div>
      </div>
    </div>
  );
};
