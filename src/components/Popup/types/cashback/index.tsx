import styles from '../../Popup.module.scss';
import CodeBlock from '../../CodeBlock';
import type { CashbackPopup } from '../index';
import { Fragment } from 'react/jsx-runtime';

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
        style={{ fontSize: 'clamp(26px, 6vw, 50px)' }}
        dangerouslySetInnerHTML={{
          __html: data.deal || 'translations not found',
        }}
      />

      <div className={styles.subtitle}>
        {(() => {
          const raw = data.spend_amount || '';
          // Split on <br />, <br> (case-insensitive) and render real line breaks
          const parts = raw.split(/<br\s*\/?\s*>/i).map((s) => s.trim());
          if (parts.length === 0) return 'translations not found';
          return (
            <>
              {parts.map((part, idx) => (
                <Fragment key={idx}>
                  {part}
                  {idx < parts.length - 1 && <br />}
                </Fragment>
              ))}
            </>
          );
        })()}

        <CodeBlock raw={data.code_xxx || ''} />
      </div>
    </div>
  );
};
