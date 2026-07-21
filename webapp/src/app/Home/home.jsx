import Floor from '../../components/floor/floor';

const Home = () => {
  return (
    <>
      <Floor floorNumber={2} topFloor={true} />
      <Floor floorNumber={1} bottomFloor={true} />
    </>
  );
}

export default Home;
