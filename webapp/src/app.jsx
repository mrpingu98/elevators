import React from 'react'
import { useState } from 'react'
import { CurrentFloorContext } from './context'
import Home from './app/Home/home'

const App = () => {
    const [currentFloor, setCurrentFloor] = useState()

    return (
        <CurrentFloorContext.Provider value={{ currentFloor: currentFloor, setCurrentFloor: setCurrentFloor }}>
            <Home />
        </CurrentFloorContext.Provider>
    )
}

export default App