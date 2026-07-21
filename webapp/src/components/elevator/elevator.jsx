import React from 'react';
import PropTypes from 'prop-types';
import styles from './elevator.module.scss';
import clsx from 'clsx';

const Elevator = ({ state }) => {
  return (
    <div className={clsx(styles.container, styles.state)}></div>
  );
}

Elevator.propTypes = {
  state: PropTypes.oneOf(['moving', 'stopped', 'idle']).isRequired,
};

export default Elevator;