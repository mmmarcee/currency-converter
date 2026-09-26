
import './Converter.css'
import down from "../../assets/Converter/arrow.svg"
import {currencies} from '../Arrays.jsx'
import { useState, useRef ,useEffect } from 'react';




const CurrencySelect = ({ readOnly = false, currencies, value, onChange, ...rest }) => {

const [open , setOpen ] = useState(false)

    const [selected, setSelected] = useState(currencies[0])


    const rowRef = useRef(null);


useEffect(() => {
  const handler = (e) => {
    if(rowRef.current && !rowRef.current.contains(e.target)){
      setOpen(false)
    }
  }
  document.addEventListener('mousedown', handler)

  return () => document.removeEventListener('mousedown', handler)
}, []
) 


    return(
         <div className='currencyRow' ref={rowRef}><span className='countrySpan' onClick={() => setOpen(!open)}><img src={selected.img} alt="country" className='countryImage' draggable={false}/><span className='currencyName'>{selected.code}</span><div className={`down-div ${open ? 'open' : ''}`} ><img src={down} alt='down' draggable={false} className='downImg'/></div></span> <input type="text" className='Inputs' readOnly={readOnly} {...rest} /><ul className= {`currencyList ${open ? 'open' : ''}`}>
            {currencies.map((u) => (
            <li key={u.code}
          className="currencyItem"
          onClick={() => {
            setSelected(u);   
            setOpen(false);  
          }}>
              <img src={u.img} alt={u.code} className='countryImage' draggable={false}/>
              <span className='currencyName'>{u.code}</span>
            </li>
          ))}
          </ul></div>
    )
}

export default CurrencySelect