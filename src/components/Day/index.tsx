import styles from './Day.module.scss';

interface DayProps {
  id: number;
  onClick?: (day: number, event: React.MouseEvent<HTMLDivElement>) => void;
}

const Day = ({ id, onClick }: DayProps) => {
  // Check current date dynamically on each render
  const date = new Date();
  const currentDay = date.getDate();

  let dayClass;

  // // gray out past and future days
  // if (id < currentDay) {
  //   dayClass = `${styles.day} ${styles.past}`;
  // } else if (id === currentDay) {
    dayClass = `${styles.day} ${styles.present}`;
  // } else if (id > currentDay) {
  //   dayClass = `${styles.day} ${styles.future}`;
  // }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // block clicks on past and future days - only present day can be clicked
    // if (id === currentDay && onClick) {
      onClick(id, e);
    // }
  };

  return (
    <div
      className={dayClass}
      id={`day${id}`}
      onClick={handleClick}
    >
      <img
        src={`https://pictureserver.net/static/2025/advent_calendar/tiles/days/${id}.png`}
        alt={`Day ${id}`}
      />
    </div>
  );
};

export default Day;
