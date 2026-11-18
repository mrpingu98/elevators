import React from 'react';
import PropTypes from 'prop-types';
import styles from './elevator.module.scss';
import { request } from '../../api/request';
import ElevatorButton from '../elevatorButton/elevatorButton';

const Elevator = ({ numberOfFloors, elevatorId }) => {

  const handleOnClick = async (floorNumber) => {
    try {
      await request({
        url: `http://localhost:8080/elevator/${elevatorId}/elevatorButtonRequest`,
        method: 'POST',
        body: { requestFloor: floorNumber }
      })
    } catch (error) {
      console.error(error.status, error.message)
    }
  }

  const floorButtons = []
  if (numberOfFloors) {
    for (let i = 0; i < numberOfFloors; i++) {
      floorButtons.push(<ElevatorButton floor={i} onClick={() => handleOnClick(i)} />)
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
