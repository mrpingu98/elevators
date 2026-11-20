import { useEffect, useState, useCallback } from 'react';
import { request } from '../../api/request';
import Building from '../../components/building/building';

const Home = () => {
  const [floors, setFloors] = useState(0)
  const [elevators, setElevators] = useState()

  const getBuildings = useCallback(async () => {
    try {
      const response = await request({
        url: 'http://localhost:8080/building/buildingOne/snapshot',
        method: 'GET'
      })
      if (response !== null) {
        setFloors(response.floorCount)
        setElevators(response.elevators)
      }
    }
    catch (error) {
      console.error(error.status, error.message)
    }
  }, [])

  useEffect(() => {
    let timer;
    let active = true;

    const refresh = async () => {
      await getBuildings();

      if (active) {
        timer = setTimeout(refresh, 1000); // Schedule the next fetch
      }
    };

    refresh();

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [getBuildings]);

  return (
    <>
      <Building numberOfFloors={floors} elevators={elevators} />
      <button onClick={getBuildings}>Refresh restate test</button>
    </>
  );
}

export default Home;
