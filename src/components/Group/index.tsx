import type { JSX } from 'react';
import styles from './Group.module.scss';
import globalstyles from '../../Advent.module.scss';

const Group = ({
  extraClass = '',
  children,
}: {
  extraClass?: string;
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <div className={`${styles.group} ${globalstyles['gap-20']} ${extraClass}`}>
      {children}
    </div>
  );
};

export default Group;
