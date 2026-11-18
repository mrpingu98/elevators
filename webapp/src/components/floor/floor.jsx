import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx'
import styles from './floor.module.scss';
import FloorButton from '../floorButton/floorButton';
import { request } from '../../api/request';


const Floor = ({ floorNumber, topFloor, bottomFloor, elevators }) => {

  const handleOnClick = async (elevatorId) => {
    try {
      await request({
        url: `http://localhost:8080/elevator/${elevatorId}/call`,
        method: 'POST',
        body: { requestFloor: floorNumber }
      })
    } catch (error) {
      console.error(error.status, error.message)
    }
  }

  return (
    <div className={styles.floorContainer}>
      <div>
        <h1>Floor {floorNumber}</h1>
      </div>
      {elevators?.map((elevator) => {
        return (
          <div className={styles.elevatorEntranceContainer}>
            <div className={styles.floorButtonsContainer}>
              {topFloor && <FloorButton direction="down" handleOnClick={() => handleOnClick(elevator.id)} />}
              {bottomFloor && <FloorButton direction="up" handleOnClick={() => handleOnClick(elevator.id)} />}
              {!topFloor && !bottomFloor && (
                <>
                  <FloorButton direction="up" handleOnClick={() => handleOnClick(elevator.id)} />
                  <FloorButton direction="down" handleOnClick={() => handleOnClick(elevator.id)} />
                </>
              )}
            </div>
            <div className={clsx(styles.elevatorEntrance, (floorNumber === elevator.currentFloor) && styles.active)}></div>
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
