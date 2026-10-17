
import './Settings.css'

const SettingsProfile = () => {
  return (
  <div className="profile-set-body">

    <div className='avatar-container'>
        <div className='avatar'></div>
        </div>
    <div className='set-inputs-container'>
        <div className='set-input-case'>
            <label htmlFor="us" className="prefix" >Username:</label>
            <div className='set-divider'><input type="text" id='us' className='set-input'/>
            <label htmlFor="us" className='set-input-ico'><span className="material-symbols-outlined">
edit_square
</span></label></div>
            
        </div>
    <div className='set-input-case'>
            <label htmlFor="log" className="prefix" >Login:</label>
            <div className='set-divider'><input type="text" id='log' className='set-input'/>
            <label htmlFor="log" className='set-input-ico'><span className="material-symbols-outlined">
edit_square
</span></label></div>
            
        </div>
    <div className='set-input-case'>
            <label htmlFor="em" className="prefix" >Email:</label>
            <div className='set-divider'><input type="email" id='em' className='set-input'/>
            <label htmlFor="em" className='set-input-ico'><span className="material-symbols-outlined">
edit_square
</span></label></div>
            
        </div>
    <div className='set-input-case'>
            <label htmlFor="pas" className="prefix" >Password:</label>
            <div className='set-divider'> <input type="password" id='pas' className='set-input'/>
            <label htmlFor="pas" className='set-input-ico'><span className="material-symbols-outlined">
edit_square
</span></label></div>
           
        </div>
    </div>
  </div>
  );
};

export default SettingsProfile;