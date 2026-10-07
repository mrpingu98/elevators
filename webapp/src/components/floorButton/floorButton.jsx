import { GoArrowUp, GoArrowDown } from "react-icons/go";
import React from 'react';
import PropTypes from 'prop-types';
import styles from './floorbutton.module.scss';

const FloorButton = ({ direction = 'up', floorNumber }) => {
    const requestElevator = async () => {
        const url = `http://localhost:8080/ElevatorObject/2/floorCall`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ requestFloor: floorNumber })
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <button className={styles.button} onClick={requestElevator}>
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

