import { GoArrowUp, GoArrowDown } from "react-icons/go";
import React from 'react';
import PropTypes from 'prop-types';
import styles from './floorbutton.module.scss';

const FloorButton = ({ direction = 'up', handleOnClick }) => {
    return (
        <button className={styles.button} onClick={handleOnClick}>
            {direction === "up" && <GoArrowUp size="3rem" />}
            {direction === "down" && <GoArrowDown size="3rem" />}
        </button>
    );
}

FloorButton.propTypes = {
    direction: PropTypes.oneOf(['up', 'down']).isRequired,
    handleOnClick: PropTypes.func.isRequired,
};

export default FloorButton;

