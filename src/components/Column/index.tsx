import type { JSX } from 'react/jsx-runtime';
import Group from '../Group';
import styles from './Column.module.scss';

const Column = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <Group extraClass={styles.column} children={children} />;
};

export default Column;
