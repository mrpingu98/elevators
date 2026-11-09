import PropTypes from 'prop-types';
import React from 'react';
// import { useContext } from 'react'
import styles from './floor.module.scss';
import FloorButton from '../floorButton/floorButton';
// import Elevator from '../elevator/elevator';
// import ElevatorButton from '../elevatorButton/elevatorButton';
// import { CurrentFloorContext } from '../../context';

const FloorButtons = ({ topFloor, bottomFloor, floorNumber, elevator }) => {
  return (
    <div className={styles.floorButtonsContainer}>
      {topFloor && <FloorButton direction="down" floorNumber={floorNumber} elevator={elevator}/>}
      {bottomFloor && <FloorButton direction="up" floorNumber={floorNumber} elevator={elevator} />}
      {!topFloor && !bottomFloor && (
        <>
          <FloorButton direction="up" floorNumber={floorNumber} elevator={elevator} />
          <FloorButton direction="down" floorNumber={floorNumber} elevator={elevator} />
        </>
      )}
    </div>
  );
}

FloorButtons.propTypes = {
  topFloor: PropTypes.bool,
  bottomFloor: PropTypes.bool,
  floorNumber: PropTypes.number,
  elevator: PropTypes.string.isRequired
};

const Floor = ({ floorNumber, topFloor, bottomFloor, elevators }) => {
  return (
    <div className={styles.floorContainer}>
      <div>
        <h1>Floor {floorNumber}</h1>
      </div>
      {elevators?.map((elevator) => {
        return (
        <div className='elevatorEntranceContainer'>
            <FloorButtons topFloor={topFloor} bottomFloor={bottomFloor} floorNumber={floorNumber} elevator={elevator.id}/>
        <div className={`${styles.elevatorEntrance} , ${(floorNumber === elevator.currentFloor) ? styles.active : ''}`}></div>
        </div>
        )
      })}
    </div>
  );
}

Floor.propTypes = {
  floorNumber: PropTypes.number.isRequired,
  topFloor: PropTypes.bool,
  bottomFloor: PropTypes.bool,
  elevators: PropTypes.shape.isRequired
};

export default Floor;
