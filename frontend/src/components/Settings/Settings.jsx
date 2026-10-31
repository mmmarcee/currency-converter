import SettingsProfile from './SettingsProfile.jsx'
import SettingsOptions from './SettingsOptions.jsx'
import './Settings.css'
const Settings = () => {
  return (
    <div className='settings-body'>
      <SettingsProfile/>
      <SettingsOptions />
    </div>
  );
};

export default Settings;