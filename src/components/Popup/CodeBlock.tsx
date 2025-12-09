import { useState } from 'react';
import styles from './Popup.module.scss';

interface Props {
  raw?: string | null;
}

export default function CodeBlock({ raw }: Props) {
  const [copied, setCopied] = useState(false);
  const text = raw || '';

  // try to split label and code by first colon (supports various spaces and unicode colon)
  const m = text.match(/^\s*(.+?)\s*[:：]\s*(.+)\s*$/);
  let label = 'Code';
  let code = text.trim();
  if (m) {
    label = m[1] || label;
    code = m[2] || code;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);

      // Push event for voucher code copy
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'custom_event',
        eventCategory: 'AdventCalendar',
        eventAction: 'Verify',
        eventLabel: 'Promo',
        eventValue: 'Voucher',
        eventOption: '',
        eventID: ''
      });
    } catch (e) {
      // ignore
    }
  };

  if (!code) return null;

  return (
    <div className={styles.codeBlock}>
      <span className={styles.codeLabel}>{label}:</span>
      <span className={styles.codeValue}>{code}</span>
      <button
        className={styles.copyBtn}
        aria-label={`Copy ${code}`}
        onClick={handleCopy}
        type="button"
      >
        <img
          src="https://pictureserver.net/static/2025/advent_calendar/popup/si--copy-line.svg"
          alt="copy"
        />
      </button>
    </div>
  );
}
