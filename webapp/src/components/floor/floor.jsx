import PropTypes from 'prop-types';
import React from 'react';
import styles from './floor.module.scss';
import FloorButton from '../floorButton/floorButton';
import Elevator from '../elevator/elevator';
import ElevatorButton from '../elevatorButton/elevatorButton';

//topFloor, bottomFloor

const FloorButtons = ({ topFloor, bottomFloor }) => {
  return (
    <div className={styles.floorButtonsContainer}>
      {topFloor && <FloorButton direction="down" />}
      {bottomFloor && <FloorButton direction="up" />}
      {!topFloor && !bottomFloor && (
        <>
          <FloorButton direction="up" />
          <FloorButton direction="down" />
        </>
      )}
    </div>
  );
}

FloorButtons.propTypes = {
  topFloor: PropTypes.bool,
  bottomFloor: PropTypes.bool,
};

const Floor = ({ floorNumber, topFloor, bottomFloor }) => {
  return (
    <div className={styles.floorContainer}>
      <h1>Floor {floorNumber}</h1>
      <FloorButtons topFloor={topFloor} bottomFloor={bottomFloor} />
      <div className={styles.elevatorContainer}>
        <Elevator />
        {bottomFloor &&
          <div className={styles.elevatorButtonsContainer}>
            <ElevatorButton floor={1} />
            <ElevatorButton floor={2} />
          </div>
        }
      </div>
    </div>
  );
}

Floor.propTypes = {
  floorNumber: PropTypes.number.isRequired,
  topFloor: PropTypes.bool,
  bottomFloor: PropTypes.bool,
};

export default Floor;
