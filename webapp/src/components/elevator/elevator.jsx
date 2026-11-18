import React from 'react';
import PropTypes from 'prop-types';
import styles from './elevator.module.scss';
import ElevatorButton from '../elevatorButton/elevatorButton';

const Elevator = ({ numberOfFloors, elevatorId }) => {
      const floorButtons = []
      if (numberOfFloors){
          for (let i = 0; i < numberOfFloors; i++) {
              floorButtons.push(<ElevatorButton floor={i} elevatorId={elevatorId}/>)
          }
      }
  return (
    <div className={styles.container}>
      {floorButtons.reverse()}
    </div>
  );
}

Elevator.propTypes = {
  floors: PropTypes.number.isRequired,
  elevatorId: PropTypes.string.isRequired,
};

export default Elevator;
