import React from 'react';
import PropTypes from 'prop-types';
import styles from './elevator.module.scss';
import clsx from 'clsx';

const Elevator = ({ state, activeFloor }) => {
  console.log()
  return (
    <div className={clsx(styles.container, (activeFloor && styles.active))}></div>
  );
}

Elevator.propTypes = {
  activeFloor: PropTypes.bool
};

export default Elevator;
