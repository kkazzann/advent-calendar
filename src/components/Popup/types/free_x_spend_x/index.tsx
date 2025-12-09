import styles from '../../Popup.module.scss';
import CodeBlock from '../../CodeBlock';
import type { FreeXSpendXPopup } from '../index';
import { Fragment } from 'react';

interface Props {
  data: FreeXSpendXPopup;
}

export const FreeXSpendXLayout = ({ data }: Props) => {
  // console.log(data);
  return (
    <div className={styles.container}>
      <div
        className={styles.title}
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
