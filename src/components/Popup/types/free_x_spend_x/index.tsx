import styles from '../../Popup.module.scss';
import type { FreeXSpendXPopup } from '../index';

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
        {data.spend_amount || 'translations not found'}

        <div className={styles.code}>
          {data.code_xxx || 'translations not found'}
        </div>
      </div>
    </div>
  );
};
