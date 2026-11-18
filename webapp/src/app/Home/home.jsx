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

//Restate is now the 'source of truth' - I will create a building in Restate
//app will then grab this building and all its details, and from this create the floors and elevators 

//floors and elevators need to be 'independent' components - not 'within' each other 
//top level component should now be a 'building' 

//number of floors = x. While i < x, create another floor component. Is this the first/last floor component? If true, pass top/bottomFloor prop through for floor buttons 
//