import styles from './Decorator.module.scss';

const Decorator = ({ id }: { id: number }) => {
  return (
    <div id={`decorator${id}`} className={styles.decorator}>
      <img
        src={`https://pictureserver.net/static/2025/advent_calendar/tiles/decorators/${id}.png`}
      />
    </div>
  );
};

export default Decorator;
