import React from "react";
import PropTypes from "prop-types";

const ElevatorButton = ({ floor, onClick}) => {
  return (
    <button onClick={onClick}>{floor}</button>
  )
}

ElevatorButton.propTypes = {
  floor: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ElevatorButton