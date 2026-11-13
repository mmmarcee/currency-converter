
import logo from "../../assets/Header/logo.svg"
import './Header.css'
import HeaderButtons from "./HeaderButtons.jsx"
import HeaderIndex from "./HeaderIndex.jsx"
import HeaderRoad from './HeaderRoad.jsx'
import Notifications from './Notifications.jsx'
import Profile from './Profile.jsx'
import HeaderSmallScreen from "./HeaderSmallScreen.jsx"
import SmallHeader from "./SmallHeader.jsx"
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
    <div>
        <header>
            <div className="Header-div">
            <div className="Logo-div">
                <a href="/" className="Logo_a"><img className="LogoImg" src={logo} alt="svgfile"></img> <span className="logoName"><span className="logoFiat">Fiat</span><span className="logoFlux">Flux</span></span></a>
              
            <HeaderButtons/>
         </div>
            <div className="Header-right">
                <span className="Time_now">{now.toLocaleTimeString()}</span>
            <Notifications/>
                <Profile/>
            </div>
             </div>

             <HeaderRoad/>
            
        </header> <SmallHeader/><HeaderSmallScreen/> </div>
    )
};

export default Header