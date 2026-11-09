import React from 'react';
import PropTypes from 'prop-types';
import Floor from "../floor/floor";

const Building = ({ numberOfFloors, elevators }) => {
    const floors = []
    if (numberOfFloors){
        for (let i = 0; i < numberOfFloors; i++) {
            floors.push(<Floor floorNumber={i} topFloor={i === (numberOfFloors - 1) ? true : false} bottomFloor={i === 0 ? true : false} elevators={elevators}/>)
        }
    }
    return(
        <div className="buildingContainer">
            {floors.reverse()}
        </div>
    )
}

Building.propTypes = {
  numberOfFloors: PropTypes.number.isRequired,
  elevators: PropTypes.array.isRequired,
};

export default Building;
