import React from "react";
import PropTypes from "prop-types";

const ElevatorButton = ({floor}) => {
  return (
    <button>{floor}</button>
  )
}

ElevatorButton.propTypes = {
  floor: PropTypes.number.isRequired,
}

export default ElevatorButton