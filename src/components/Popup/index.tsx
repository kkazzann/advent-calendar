import { useEffect } from 'react';
import styles from './Popup.module.scss';
import type { PopupTranslations } from '../../types/PopupTranslations';
import { getPopupData } from './popupMapper';
import { UpToXOffLayout } from './types/up_to_x_off';
import { FreeXSpendXLayout } from './types/free_x_spend_x';
import { ExtraXOffLayout } from './types/extra_x_off';
import { FourForThreeLayout } from './types/4_for_3';
import { CashbackLayout } from './types/cashback';
import { DiscountLayout } from './types/discount';

interface PopupProps {
  isOpen: boolean;
  isClosing: boolean;
  day: number;
  translations: PopupTranslations;
  onClose: () => void;
  onShowConditions: () => void;
}

const Popup = ({
  isOpen,
  isClosing,
  day,
  translations,
  onClose,
  onShowConditions,
}: PopupProps) => {
  // useEffect(() => {
  //   // if (isOpen) {
  //   //   // Prevent body scroll when popup is open
  //   //   document.body.style.overflowY = "hidden";
  //   // }
  //   // return () => {
  //   //   document.body.style.overflowY = "unset";
  //   // };
  // }, [isOpen]);

  // Don't render if not open
  if (!isOpen) {
    return null;
  }

  const popupData = getPopupData(day, translations);

  // Don't render if no data
  if (!popupData) {
    return null;
  }

  const renderLayout = () => {
    switch (popupData.type) {
      case 'up_to_x_off':
        return <UpToXOffLayout data={popupData} />;
      case 'free_x_spend_x':
        return <FreeXSpendXLayout data={popupData} />;
      case 'extra_x_off':
        return <ExtraXOffLayout data={popupData} />;
      case '4_for_3':
        return <FourForThreeLayout data={popupData} />;
      case 'cashback':
        return <CashbackLayout data={popupData} />;
      case 'discount':
        return <DiscountLayout data={popupData} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`${styles.popup} ${
        popupData.type === '4_for_3' ? styles['_' + popupData.type] : ''
      } ${isClosing ? styles.closing : ''}`}
      onClick={onClose}
    >
      <div
        className={`${styles.content} ${isClosing ? styles.closing : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button, different on mobile since the image is light in this place */}
        <button className={styles.close} onClick={onClose}>
          <img
            className={styles.desktop}
            src="https://pictureserver.net/static/2025/advent_calendar/popup/close/lucide--x-desktop.svg"
            alt="Close Popup"
          />
          <img
            className={styles.mobile}
            src="https://pictureserver.net/static/2025/advent_calendar/popup/close/lucide--x-mobile.svg"
            alt="Close Popup"
          />
        </button>

        <div className={styles.imageContainer}>
          <a href="#">
            <img
              className={styles.desktop}
              src={popupData.imageDesktop}
              alt="Popup Image"
            />
            <img
              className={styles.mobile}
              src={popupData.imageMobile}
              alt="Popup Image"
            />
          </a>
        </div>

        <div className={styles.deal}>
          {renderLayout()}

          <div className={styles.footer}>
            <div className={styles.onlyToday}>{popupData.only_today}</div>

            <button className={styles.seeConditions} onClick={onShowConditions}>
              {popupData.see_conditions}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
