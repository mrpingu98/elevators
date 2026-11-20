import { useEffect, useState } from 'react';
import { request } from '../../api/request';
import Building from '../../components/building/building';

const Home = () => {
  const [floors, setFloors] = useState(0)
  const [elevators, setElevators] = useState()

  const getBuildings = async () => {
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
  }

  //how do I check/verify the response shape?
  useEffect(() => {
    getBuildings()
  },[])

  return (
    <>
      <Building numberOfFloors={floors} elevators={elevators}/>
      <button onClick={getBuildings}>Refresh restate test</button>
    </>
  );
}

export default Home;
