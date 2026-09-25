import './Converter.css'
import { useState} from 'react';
import CurrencySelect from './CurrencySelect.jsx'
import {currencies} from '../Arrays.jsx'

const Converter = () => {
  
  const [from, setFrom] = useState(currencies[0]);
  const [to, setTo] = useState(currencies[1]);
   
    return(
        <div className="ConverterBody">
            <div className='Converter'>
            <div className='input'>
                <h1 className='Inputs_h1'>QUANTITY</h1>
               
              <CurrencySelect
              currencies = {currencies}
              value = {from}
              onChange = {setFrom}
              />

            </div>
            <div className='swapDiv'>
        <span className='swapImg'/>
            </div>

             <div className='output'>
                <h1 className='Inputs_h1' >RESULT</h1>
                <span></span>
                <CurrencySelect
                currencies={currencies}
                value={to}
                onChange={setTo}
                />
                <span></span> 
            </div>
        </div></div>
    )
}
export default Converter