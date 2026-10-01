import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="MainLayout">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;