import PropTypes from 'prop-types';
import React from 'react';
import styles from './floor.module.scss';
import FloorButton from '../floorButton/floorButton';
import Elevator from '../elevator/elevator';
import ElevatorButton from '../elevatorButton/elevatorButton';

const FloorButtons = ({ topFloor, bottomFloor, floorNumber}) => {
  return (
    <div className={styles.floorButtonsContainer}>
      {topFloor && <FloorButton direction="down" floorNumber={floorNumber}/>}
      {bottomFloor && <FloorButton direction="up" floorNumber={floorNumber} />}
      {!topFloor && !bottomFloor && (
        <>
          <FloorButton direction="up" floorNumber={floorNumber} />
          <FloorButton direction="down" floorNumber={floorNumber} />
        </>
      )}
    </div>
  );
}

FloorButtons.propTypes = {
  topFloor: PropTypes.bool,
  bottomFloor: PropTypes.bool,
  floorNumber: PropTypes.number
};

const Floor = ({ floorNumber, topFloor, bottomFloor }) => {
  return (
    <div className={styles.floorContainer}>
      <h1>Floor {floorNumber}</h1>
      <FloorButtons topFloor={topFloor} bottomFloor={bottomFloor} floorNumber={floorNumber}/>
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
