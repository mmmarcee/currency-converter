import { Outlet } from 'react-router-dom';
import SettingsHeader from '../components/Settings/SettingsHeader';
import './SettingsLayout.css';

const SettingsLayout = () => {
  return (
    <div className="SettingsLayout">
      <SettingsHeader />
      <Outlet />
    </div>
  );
};

export default SettingsLayout;