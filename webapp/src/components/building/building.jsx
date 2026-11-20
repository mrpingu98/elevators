import React from 'react';
import PropTypes from 'prop-types';
import styles from './building.module.scss';
import Floor from "../floor/floor";
import Elevator from '../elevator/elevator';

const Building = ({ numberOfFloors, elevators }) => {
    const floors = []
    if (numberOfFloors) {
        for (let i = 0; i < numberOfFloors; i++) {
            floors.push(<Floor floorNumber={i} topFloor={i === (numberOfFloors - 1) ? true : false} bottomFloor={i === 0 ? true : false} elevators={elevators} />)
        }
    }

    return (
        <div className={styles.buildingContainer}>
            {floors.reverse()}
            {elevators?.map((elevator) => {
                return (
                    <div className={styles.elevatorsContainer}>
                        <h1>Elevators</h1>
                        <Elevator numberOfFloors={numberOfFloors} elevatorId={elevator.id} />
                    </div>
                )
            })
            }
        </div>
    )
}

Building.propTypes = {
    numberOfFloors: PropTypes.number.isRequired,
    elevators: PropTypes.array.isRequired,
};

export default Building;
