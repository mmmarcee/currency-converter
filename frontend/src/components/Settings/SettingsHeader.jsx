import './SettingsHeader.css'
import logo from "../../assets/Header/logo.svg"
import { useState } from 'react';




const SettingsHeader = () => {


const scrollToAccount = () => {
  document.getElementById('accountBody')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
  setAnimation('left');
};

const scrollToSettings = () => {
  document.getElementById('optionsBody')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
  setAnimation('right');
};

    const [animation , setAnimation] = useState("left")

  return (
   <header className='header-settings'>
    <div className="header-settings-left">
    <a href='/' className='logo-div-set'> <span className="material-symbols-outlined" id='backIco'>
arrow_back
</span><img className="LogoImg" src={logo} alt="svgfile"></img> <span className='logo-name'>FiatFlux</span>
</a> </div>

      <div className="header-settings-center">
    <div className='btns-div'>

        <div className={ `slider ${ animation === "right" ? "animateRight" : ""}`} ></div>

        <button className='set-header-bts' onClick={scrollToAccount}><span className="material-symbols-outlined" id='btns-span'>
person
</span></button>


        <button className='set-header-bts' onClick={scrollToSettings}><span className="material-symbols-outlined" id='btns-span'>
settings
</span></button>
    </div>
</div>

     <div className="header-settings-right"></div> 
   </header>
  );
};

export default SettingsHeader;