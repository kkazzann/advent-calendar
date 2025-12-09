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
  country?: string;
  popupLinks?: Record<number, string>;
}

const Popup = ({
  isOpen,
  isClosing,
  day,
  translations,
  onClose,
  onShowConditions,
  country,
  popupLinks,
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

  // compute origin safely
  const origin = typeof window !== 'undefined' ? window.origin : undefined;

  const popupDataNoLinks = getPopupData(day, translations);
  const popupDataWithLinks = getPopupData(
    day,
    translations,
    popupLinks,
    origin
  );
  const finalPopupData = popupDataWithLinks || popupDataNoLinks;

  if (!finalPopupData) return null;

  const renderLayout = () => {
    switch (finalPopupData.type) {
      case 'up_to_x_off':
        return <UpToXOffLayout data={finalPopupData} />;
      case 'free_x_spend_x':
        return <FreeXSpendXLayout data={finalPopupData} />;
      case 'extra_x_off':
        return <ExtraXOffLayout data={finalPopupData} />;
      case '4_for_3':
        return <FourForThreeLayout data={finalPopupData} />;
      case 'cashback':
        return <CashbackLayout data={finalPopupData} />;
      case 'discount':
        return <DiscountLayout data={finalPopupData} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`${styles.popup} ${
        finalPopupData.type === '4_for_3'
          ? styles['_' + finalPopupData.type]
          : ''
      } ${isClosing ? styles.closing : ''}`}
      onClick={onClose}
    >
      <div
        className={`${styles.content} ${isClosing ? styles.closing : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={
          (() => {
            // some countries have long translations, add adjustments here
            const FONT_OVERRIDES: Record<string, Record<string, string>> = {
              // default:
              // $font-100: clamp(30px, 5vw, 64px);
              // $font-50: clamp(24px, 4vw, 50px);
              // $font-40: clamp(28px, 4vw, 40px);
              // $font-25: clamp(16px, 2vw, 25px);
              // $font-20: clamp(12px, 2vw, 20px);
              CHDE: {
                '--font-100': 'clamp(30px, 5vw, 64px)',
                '--font-50': 'clamp(24px, 4vw, 42px)',
                '--font-20': 'clamp(12px, 2vw, 18px)',
                '--font-25': 'clamp(16px, 2vw, 25px)',
              },
              DE: {
                '--font-100': 'clamp(30px, 5vw, 64px)',
                '--font-50': 'clamp(24px, 4vw, 42px)',
                '--font-20': 'clamp(12px, 2vw, 18px)',
                '--font-25': 'clamp(16px, 2vw, 25px)',
              },
              AT: {
                '--font-100': 'clamp(30px, 5vw, 64px)',
                '--font-50': 'clamp(24px, 4vw, 42px)',
                '--font-20': 'clamp(12px, 2vw, 18px)',
                '--font-25': 'clamp(16px, 2vw, 25px)',
              },
              NL: {
                '--font-100': 'clamp(30px, 5vw, 64px)',
                '--font-50': 'clamp(24px, 4vw, 42px)',
                '--font-20': 'clamp(12px, 2vw, 18px)',
                '--font-25': 'clamp(16px, 2vw, 25px)',
              },
              BENL: {
                '--font-100': 'clamp(30px, 5vw, 64px)',
                '--font-50': 'clamp(24px, 4vw, 42px)',
                '--font-20': 'clamp(12px, 2vw, 18px)',
                '--font-25': 'clamp(16px, 2vw, 25px)',
              },
              HU: {
                '--font-100': 'clamp(30px, 5vw, 64px)',
                '--font-50': 'clamp(24px, 4vw, 42px)',
                '--font-20': 'clamp(12px, 2vw, 18px)',
                '--font-25': 'clamp(16px, 2vw, 25px)',
              },
              FI: {
                '--font-100': 'clamp(30px, 5vw, 64px)',
                '--font-50': 'clamp(24px, 4vw, 42px)',
                '--font-20': 'clamp(12px, 2vw, 18px)',
                '--font-25': 'clamp(16px, 3vw, 25px)',
              },
            };
            return (country && FONT_OVERRIDES[country]) || undefined;
          })() as React.CSSProperties
        }
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

        {/* If this is an up_to_x_off popup and it has a link, wrap image and main deal area separately
            so we preserve the original sibling layout (imageContainer + deal) which CSS depends on. */}
        {finalPopupData.type === 'up_to_x_off' &&
        (finalPopupData as any).link ? (
          <>
            <div className={styles.imageContainer}>
              <a
                href={(finalPopupData as any).link}
                target="_blank"
                rel="noreferrer"
                className={styles.popupLink}
                onClick={(e) => {
                  e.stopPropagation();
                  // Push event for promo link click
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({
                    event: 'custom_event',
                    eventCategory: 'AdventCalendar',
                    eventAction: 'Click',
                    eventLabel: 'PopUp',
                    eventValue: 'Promo',
                    eventOption: '',
                    eventID: ''
                  });
                }}
              >
                <img
                  className={styles.desktop}
                  src={finalPopupData.imageDesktop}
                  alt="Popup Image"
                />
                <img
                  className={styles.mobile}
                  src={finalPopupData.imageMobile}
                  alt="Popup Image"
                />
              </a>
            </div>

            <div className={styles.deal}>
              <a
                href={(finalPopupData as any).link}
                target="_blank"
                rel="noreferrer"
                className={styles.popupLink}
                onClick={(e) => {
                  e.stopPropagation();
                  // Push event for promo link click
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({
                    event: 'custom_event',
                    eventCategory: 'AdventCalendar',
                    eventAction: 'Click',
                    eventLabel: 'PopUp',
                    eventValue: 'Promo',
                    eventOption: '',
                    eventID: ''
                  });
                }}
              >
                <div className={styles.container}>{renderLayout()}</div>
              </a>

              <div className={styles.footer}>
                <div className={styles.onlyToday}>
                  {finalPopupData.only_today}
                </div>

                <button
                  className={styles.seeConditions}
                  onClick={onShowConditions}
                >
                  {finalPopupData.see_conditions}
                </button>
              </div>
            </div>
          </>
        ) : (
          // non-clickable: original structure
          <>
            <div className={styles.imageContainer}>
              <img
                className={styles.desktop}
                src={finalPopupData.imageDesktop}
                alt="Popup Image"
              />
              <img
                className={styles.mobile}
                src={finalPopupData.imageMobile}
                alt="Popup Image"
              />
            </div>

            <div className={styles.deal}>
              <div className={styles.container}>{renderLayout()}</div>

              <div className={styles.footer}>
                <div className={styles.onlyToday}>
                  {finalPopupData.only_today}
                </div>

                <button
                  className={styles.seeConditions}
                  onClick={onShowConditions}
                >
                  {finalPopupData.see_conditions}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
