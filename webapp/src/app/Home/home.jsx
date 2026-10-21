import Floor from '../../components/floor/floor';
import { CurrentFloorContext } from '../../context';
import { useContext } from 'react';


const Home = () => {
  const { setCurrentFloor } = useContext(CurrentFloorContext)

  const handleOnClick = async ()  => {
      const url = `http://localhost:8080/ElevatorObject/2/getCurrentFloor`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }    
        const data = await response.json()
        if (response.ok){
          setCurrentFloor(data)
        }
      } catch (error) {
        console.error(error.message);
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
