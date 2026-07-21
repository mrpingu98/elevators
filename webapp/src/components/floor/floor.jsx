import React from 'react';
import styles from './floor.module.scss';

const Floor = () => {
  return (
    <div className={styles.floorContainer}>
        <div>
            Floor 1
            Call Lift Button
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