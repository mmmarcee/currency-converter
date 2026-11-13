import Converter from '../Converter/Converter';
import Chart from '../Chart/ChartMain';
import './Home.css';
const Home = () => {
  return (
    <div className="Home">
      <Converter />
      <Chart />
    </div>
  );
};

export default Home;