import React from "react";
import PropTypes from "prop-types";

const ElevatorButton = ({ floor, elevatorId}) => {
  return (
    <button>{floor}</button>
  )
}

ElevatorButton.propTypes = {
  floor: PropTypes.number.isRequired,
  elevatorId: PropTypes.string.isRequired,
}

export default ElevatorButton