import { useState , useRef, useEffect } from 'react';
import {currencies} from '../Arrays.jsx'
const SettingsOptions = () => {

  const [theme , setTheme] = useState(false)

  const ChangeThemeLight = () => {
   document.documentElement.classList.add('light');
  localStorage.setItem('app-theme', 'light');
  setTheme(true);
  }

   const ChangeThemeDark = () => {
    document.documentElement.classList.remove('light');
  localStorage.setItem('app-theme', 'dark');
  setTheme(false);
  }


    const fonts = [
  { name: 'Roboto', css: '"Roboto", sans-serif' },
  { name: 'Chewy', css: '"Chewy", system-ui' },
  { name: 'Asimovian', css: '"Asimovian", sans-serif' },
  { name: 'Ubuntu', css: '"Ubuntu Condensed", sans-serif' }
]

const [font , setFont] = useState('Roboto')

const [info , setInfo] = useState(false)

const [choose , setChoose] = useState(new Set())

 useEffect(() => {
    const savedName = localStorage.getItem('app-font-name');
    if (savedName) {
      setFont(savedName);
    }
  }, []);

const toggleCurrency = (code) => {
  setChoose(prev => {          
    const next = new Set(prev);
    next.has(code)             
      ? next.delete(code)      
      : next.add(code);        
    return next;              
  });
};

return(
    <div className="options-set-body" >
       <div className='scroll-Anchor' id='optionsBody'></div>
        <div className="option-block">
            <div className="block-name">
                <span className="option-title">Design</span>
            </div>
            <div className="block-content">

                <span className="option-title">Theme</span>
                <div className="theme-choose-div"> 
                    <button className="theme-color" id="black-theme" onClick={ChangeThemeDark}></button>
                    <button className="theme-color" id="white-theme" onClick={ChangeThemeLight}></button>
                </div>


                <span className="option-title">Fonts</span>
                <ul> {fonts.map(({name , css}) => (
                    <li className="font-choose" key={name} style={{fontFamily: css}} onClick={() => {document.documentElement.style.setProperty('--app-font', css);  localStorage.setItem('app-font-name', name);
  localStorage.setItem('app-font-css', css); setFont(name); }}>FiatFlux{font === name && <span className="material-symbols-outlined" id="font-choose-ico">
check
</span>}</li>
                ))}</ul>
            </div>
          
        </div>  <div className='divider-set'></div>
          <div className="option-block">
            <div className="block-name">
                <span className="option-title">Priorities</span> 
            </div>
            <div className="block-content">
                <span className="option-title">Priorities <span style={{cursor: 'pointer'}} className="material-symbols-outlined" onClick={() => setInfo(!info)}>
info
</span> {info === true && <span className='info'>Choose currencies that u want to see in notifications</span>} </span>

            <div className='set-btn-opt-div'> 
                {currencies.map(({code , img}) => (<button key={code} onClick={() => toggleCurrency(code)}
  className={`set-btn-opt ${choose.has(code) ? 'active' : ''}`}>
                    <img src={img} alt={img}></img>
                    {code}
                    </button>
                )) }
            </div>

            </div>
          
        </div> 
    </div>
)

}

export default SettingsOptions 
