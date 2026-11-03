import Floor from '../../components/floor/floor';
import { CurrentFloorContext } from '../../context';
import { useContext } from 'react';
import { request } from '../../api/request';


const Home = () => {
  const { setCurrentFloor } = useContext(CurrentFloorContext)

  const handleOnClick = async () => {
    try {
      const response = await request({
        url: `http://localhost:8080/ElevatorObject/2/getCurrentFloor`,
        method: 'GET'
      })
      if (response !== null) {
        setCurrentFloor(response)
      }
    }
    catch (error) {
      console.error(error.status, error.message)
    }
  }

  return (
    <>
      <Floor floorNumber={1} topFloor />
      <Floor floorNumber={0} bottomFloor />
      <button onClick={handleOnClick}>Refresh restate test</button>
    </>
  );
}

export default Home;
