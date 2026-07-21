import React from 'react';
import styles from './floor.module.scss';
import FloorButton from '../floorButton/floorButton';

//topFloor, bottomFloor

const Floor = () => {
  return (
    <div className={styles.floorContainer}>
        <h1>Floor 1</h1>
        <div>
          <FloorButton direction="up" />
          <FloorButton direction="down" />
        </div>
        <div className={styles.elevatorContainer}>
          Elevator
          <div>
            Elevator Buttons
          </div>
        </div>
    </div>
  );
}

export default Floor;