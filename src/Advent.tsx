import { useState, useEffect } from 'react';
import styles from './Advent.module.scss';
import Group from './components/Group';
import Column from './components/Column';
import Day from './components/Day';
import Decorator from './components/Decorator';
import Popup from './components/Popup';
import confetti from 'canvas-confetti';
import type { PopupTranslations } from '../src/types/PopupTranslations';
import type { ConditionsTranslations } from '../src/types/ConditionsTranslations';
import { getConditionKey } from './components/Popup/popupMapper';
import { fetchCategoryLinks } from './utils/fetchCategoryLinks';
import {
  UP_TO_X_OFF_CATEGORY_KEYS,
  UP_TO_X_OFF_CATEGORY_LINKS,
} from './components/Popup/popupMapper';

interface AdventProps {
  country: string;
  popupTranslations: PopupTranslations;
  conditionsTranslations: ConditionsTranslations;
}

const Advent = ({
  country,
  popupTranslations,
  conditionsTranslations,
}: AdventProps) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [conditionDay, setConditionDay] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [conditionsVisible, setConditionsVisible] = useState(false);
  const [popupLinks, setPopupLinks] = useState<
    Record<number, string> | undefined
  >(undefined);

  // console.log("Advent render:", { country });
  // console.log("Popup Translations:", popupTranslations);

  // Push page view event on mount (once only, even in React StrictMode dev)
  useEffect(() => {
    // Prevent duplicate events in dev mode (React StrictMode)
    if ((window as any).__adventPageViewSent) return;
    (window as any).__adventPageViewSent = true;

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'custom_event',
      eventCategory: 'AdventCalendar',
      eventAction: 'View',
      eventLabel: 'Page',
      eventValue: '',
      eventOption: '',
      eventID: ''
    });
  }, []);

  const handleDayClick = (
    day: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    // Calculate button center position as percentage of viewport
    // const rect = event.currentTarget.getBoundingClientRect();
    // const x = (rect.left + rect.width / 2) / window.innerWidth;
    // const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Use mouse cursor position (viewport percentage) as confetti origin
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.6,
      decay: 0.95,
      zindex: 10,
      startVelocity: 10,
      colors: ['#750000', '#FFCCB7', '#FECD8C'],
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
        scalar: 1.5,
        shapes: ['star'],
        origin: { x, y },
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 150);
    setTimeout(shoot, 300);

    // Push event for day click / popup open
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'custom_event',
      eventCategory: 'AdventCalendar',
      eventAction: 'Click',
      eventLabel: 'Page',
      eventValue: 'PopUp',
      eventOption: '',
      eventID: ''
    });

    setSelectedDay(day);

    setTimeout(() => {
      setIsPopupOpen(true);
    }, 150);
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setIsClosing(false);
      setSelectedDay(null);
    }, 400); // Match animation duration
  };

  const handleShowConditions = () => {
    // Store which day's conditions to show before closing popup
    if (selectedDay !== null) {
      setConditionDay(selectedDay);
    }
    setConditionsVisible(true);
    closePopup();

    setTimeout(() => {
      const conditionsElement = document.getElementById('advent__conditions');
      if (conditionsElement) {
        conditionsElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 100);
  };

  // Page title & description: read from popupTranslations (injected at build time)
  const title =
    ((popupTranslations as any).page_title as string) || '[translation later]';
  const description =
    ((popupTranslations as any).page_description as string) ||
    '[translation later]';

  // Fetch category links once per country so up_to_x_off popups can link to categories
  // Build a day->apiKey map from UP_TO_X_OFF_CATEGORY_KEYS by converting underscores to hyphens
  // (API keys are hyphenated in the provided service)
  useEffect(() => {
    (async () => {
      try {
        // Use explicit API key mapping when available. Falls back to hyphenated
        // translation keys only if UP_TO_X_OFF_CATEGORY_LINKS is empty.
        const dayToApiKey =
          Object.keys(UP_TO_X_OFF_CATEGORY_LINKS).length > 0
            ? UP_TO_X_OFF_CATEGORY_LINKS
            : (Object.fromEntries(
                Object.entries(UP_TO_X_OFF_CATEGORY_KEYS).map(([d, k]) => [
                  Number(d),
                  (k as string).replace(/_/g, '-'),
                ])
              ) as Record<number, string>);

        const links = await fetchCategoryLinks(country, dayToApiKey);
        setPopupLinks(links);
      } catch (err) {
        // non-fatal — continue without links
        // eslint-disable-next-line no-console
        console.warn('Failed to fetch popup category links', err);
      }
    })();
    // run again when country changes
  }, [country]);

  return (
    <div id="advent__calendar" className={styles.calendar}>
      {/* Popup */}
      {selectedDay !== null && (
        <Popup
          isOpen={isPopupOpen}
          isClosing={isClosing}
          day={selectedDay}
          translations={popupTranslations}
          onClose={closePopup}
          onShowConditions={handleShowConditions}
          country={country}
          popupLinks={popupLinks}
        />
      )}

      {/* title & description */}
      <div className={styles.titleContainer}>
        <div
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      {/* tiles container */}
      <div className={[styles.tilesContainer, styles['gap-20']].join(' ')}>
        {/* first group of days: (1/2, (6, 23)) / 18, 8/16 */}
        <Group>
          {/* day day (1/2, (6, 23) / 18) */}
          <Column>
            {/* day 1/2, (6, 23) */}
            <Group>
              {/* day 1/2 */}
              <Column>
                <Day id={1} onClick={handleDayClick} />
                <Day id={2} onClick={handleDayClick} />
              </Column>

              {/* day 6, 23 */}
              <Group>
                <Day id={6} onClick={handleDayClick} />
                <Day id={23} onClick={handleDayClick} />
              </Group>
            </Group>

            <Day id={18} onClick={handleDayClick} />
          </Column>

          {/* day 8/16 */}
          <Column>
            <Day id={8} onClick={handleDayClick} />
            <Day id={16} onClick={handleDayClick} />
          </Column>
        </Group>

        {/* second group of days: 3/decorator, 12, 21 */}
        <Group>
          {/* day 3/decorator */}
          <Column>
            <Day id={3} onClick={handleDayClick} />
            <Decorator id={1} />
          </Column>

          {/* day 12, 21 */}
          <Group>
            <Day id={12} onClick={handleDayClick} />
            <Day id={21} onClick={handleDayClick} />
          </Group>
        </Group>

        {/* third group of days: 10, 9, 24 */}
        <Group>
          <Day id={10} onClick={handleDayClick} />
          <Day id={9} onClick={handleDayClick} />
          <Day id={24} onClick={handleDayClick} />
        </Group>

        {/* fourth group of days: (14 / 15, 5 / 19) / 20 + decorator, 22 / 7 + 4 */}
        <Group>
          {/* day (14 / 15, 5 / 19) / 20 */}
          <Column>
            {/* day (14 / 15, 5 / 19)  */}
            <Group>
              {/* day 14/15 */}
              <Column>
                <Day id={14} onClick={handleDayClick} />
                <Day id={15} onClick={handleDayClick} />
              </Column>

              {/* day 5/19 */}
              <Column>
                <Day id={5} onClick={handleDayClick} />
                <Day id={19} onClick={handleDayClick} />
              </Column>
            </Group>

            {/* day 20 + decorator */}
            <Group>
              <Day id={20} onClick={handleDayClick} />
              <Decorator id={2} />
            </Group>
          </Column>

          {/* day 22/(7 + 4) */}
          <Column>
            {/* day 22 */}
            <Day id={22} onClick={handleDayClick} />
            <Group>
              <Day id={7} onClick={handleDayClick} />
              <Day id={4} onClick={handleDayClick} />
            </Group>
          </Column>
        </Group>

        {/* fifth group of days: 13, 17, 11 */}
        <Group>
          <Day id={13} onClick={handleDayClick} />
          <Day id={17} onClick={handleDayClick} />
          <Day id={11} onClick={handleDayClick} />
        </Group>
      </div>

      {/* conditions, shown on click "see conditions" */}
      <div
        id="advent__conditions"
        className={[
          styles.conditionsContainer,
          conditionsVisible ? styles.visible : '',
        ].join(' ')}
      >
        {conditionsVisible && conditionDay && (
          <>
            <div className={styles.title}>{popupTranslations.conditions}</div>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: conditionsTranslations[getConditionKey(conditionDay)],
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Advent;
