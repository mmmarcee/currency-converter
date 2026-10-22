import { useState , useRef } from 'react';

const SettingsOptions = () => {


    const fonts = [
  { name: 'Roboto', css: '"Roboto", sans-serif' },
  { name: 'IBM', css: '"IBM Plex Serif", serif' },
  { name: 'HennyPenny', css: '"Henny Penny", system-ui' },
  { name: 'Chewy', css: '"Chewy", system-ui' },
  { name: 'Asimovian', css: '"Asimovian", sans-serif' },
  { name: 'Eater', css: '"Eater", serif' }
]

const [font , setFont] = useState('Roboto')

const [info , setInfo] = useState(false)

return(
    <div className="options-set-body">
        <div className="option-block">
            <div className="block-name">
                <span className="option-title">Design</span>
            </div>
            <div className="block-content">
                <span className="option-title">Theme</span>
                <div className="theme-choose-div"> 
                    <button className="theme-color" id="black-theme"></button>
                    <button className="theme-color" id="white-theme"></button>
                </div>
                <span className="option-title">Fonts</span>
                <ul> {fonts.map(({name , css}) => (
                    <li className="font-choose" key={name} style={{fontFamily: css}} onClick={() => {document.documentElement.style.setProperty('--app-font', css); setFont(name);}}>FiatFlux{font === name && <span className="material-symbols-outlined" id="font-choose-ico">
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

            </div>
          
        </div> 
    </div>
)

}

export default SettingsOptions 
