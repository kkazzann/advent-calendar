import styles from '../../Popup.module.scss';
import CodeBlock from '../../CodeBlock';
import type { ExtraXOffPopup } from '../index';
import { Fragment } from 'react/jsx-runtime';

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
    `class="${styles.offpercentage}"`
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

      {/* <div
        className={styles.subtitle}
        dangerouslySetInnerHTML={{
          __html: data.spend_amount || 'translations not found',
        }}
      />

      <div className={styles.code}>
        {data.code_xxx || 'translations not found'}
      </div> */}

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
