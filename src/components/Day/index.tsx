import styles from './Day.module.scss';

interface DayProps {
  id: number;
  onClick?: (day: number, event: React.MouseEvent<HTMLDivElement>) => void;
}

const Day = ({ id, onClick }: DayProps) => {
  // Check current date dynamically on each render
  const currentDay = new Date().getDate();

  let dayClass;

  // gray out past and future days

  // if (id < currentDay) {
  //   dayClass = `${styles.day} ${styles.past}`;
  // } else if (id === currentDay) {
  dayClass = `${styles.day} ${styles.present}`;
  // } else if (id > currentDay) {
  //   dayClass = `${styles.day} ${styles.future}`;
  // }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // block clicks on past and future days

    // if (id === currentDay && onClick) {
    onClick(id, e);
    // }
  };

  return (
    <div
      className={dayClass}
      id={`day${id}`}
      onClick={handleClick}
      style={{ cursor: id === currentDay ? 'pointer' : 'default' }}
    >
      <img
        src={`https://pictureserver.net/static/2025/advent_calendar/tiles/days/${id}.png`}
        alt={`Day ${id}`}
      />
    </div>
  );
};

export default Day;
