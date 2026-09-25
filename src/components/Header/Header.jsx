import down from "../../assets/Header/keyboard_arrow_down_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
import logo from "../../assets/Header/logo.svg"
import './Header.css'
import HeaderButtons from "./HeaderButtons.jsx"
import HeaderIndex from "./HeaderIndex.jsx"
import HeaderRoad from './HeaderRoad.jsx'
import Notifications from './Notifications.jsx'

import { useState, useEffect } from 'react';

const Header = () => {
const [now, setNow] = useState(new Date());

    useEffect(() => {
        let timeoutId;

        const tick = () => {
            const current = new Date();
            setNow(current);
           
            timeoutId = setTimeout(tick, 1000 - current.getMilliseconds());
        };

        tick();
        return () => clearTimeout(timeoutId);
    }, []);

    return(
        <header>
            <div className="Logo-div">
                <a href="/" className="Logo_a"><img className="LogoImg" src={logo} alt="svgfile"></img> <span>FiatFlux</span></a>
               <span className="Divider"/>
            <HeaderButtons/>
            <span className="Divider1"/>
            <HeaderIndex/>
             <span className="Divider1"/>
                <span className="Time_now">{now.toLocaleTimeString()}</span>
            <Notifications/>
                <div className="Profile_div">
                    <span className="Avatar"/><span className="Online"/> <img src={down} alt="svgfile" className="down"></img>
                </div>

             </div>

             <HeaderRoad/>
            
        </header>
    )
};

export default Header