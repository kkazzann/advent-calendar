import { useState } from 'react';
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

  // console.log("Advent render:", { country });
  // console.log("Popup Translations:", popupTranslations);

  const handleDayClick = (
    day: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    // Calculate button center position as percentage of viewport
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.5,
      decay: 0.96,
      startVelocity: 20,
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

    setSelectedDay(day);
    setIsPopupOpen(true);
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

  // todo
  // will change when newsletter is accepted and we have translations to use
  const title = 'Advent calendar<br />new deal every day';
  const description =
    "Unwrap a new surprise every day and make this Christmas truly magical. Hurry, today's deal disappears at midnight.";

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
        />
      )}

      {/* title & description */}
      <div className={styles.titleContainer}>
        <div
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className={styles.description}>{description}</div>
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
            <div className={styles.description}>
              {conditionsTranslations[getConditionKey(conditionDay)]}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Advent;
