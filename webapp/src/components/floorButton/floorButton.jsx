import { GoArrowUp, GoArrowDown } from "react-icons/go";
import React from 'react';
import PropTypes from 'prop-types';
import styles from './floorbutton.module.scss';
import { request } from "../../api/request";

const FloorButton = ({ direction = 'up', floorNumber }) => {
    const handleOnClick = async () => {
        try {
            await request({
                url: `http://localhost:8080/ElevatorObject/2/floorCall`,
                method: 'POST',
                body: { requestFloor: floorNumber }
            })
        } catch (error) {
            console.error(error.status, error.message)
        }
    }

    return (
        <button className={styles.button} onClick={handleOnClick}>
            {direction === "up" && <GoArrowUp size="3rem" />}
            {direction === "down" && <GoArrowDown size="3rem" />}
        </button>
    );
}

FloorButton.propTypes = {
    direction: PropTypes.oneOf(['up', 'down']).isRequired,
    floorNumber: PropTypes.number.isRequired
};

export default FloorButton;

