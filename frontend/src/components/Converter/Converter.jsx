import './Converter.css'
import CurrencySelect from './CurrencySelect.jsx'
import {currencies} from '../Arrays.jsx'
import { useState, useEffect } from 'react';
import Sparkline from './Sparkline.jsx'
import { allData } from '../Chart/data.js';

const Converter = () => {
  
  const [from, setFrom] = useState(currencies[0]);
  const [to, setTo] = useState(currencies[1]);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rate , setRate] = useState(null);
  const sparklineData = (allData[from.code] ?? allData[to.code])?.['1W']?.map(({ value }) => value) ?? [];
  const sparklineUp = sparklineData.length > 1 && sparklineData[sparklineData.length - 1] >= sparklineData[0];

useEffect(() => {
  const loadRate = async () => {
  try {
const res = await fetch(`http://localhost:5139/api/currency/convert?from=${from.code}&to=${to.code}&amount=1`)
    if (!res.ok) throw new Error('Error');
      const data = await res.json();
      setRate(data.result);
  }
  catch (err) {
    setRate(null);
  }}
  loadRate();
},[from, to])





 const swap = () => {
    setTo(from)
    setFrom(to)
  }

   
const convert = async () => {
 
  
    const trimmed = amount.trim()
    if (!trimmed){
        setError("Error")
        return
    }

    if (isNaN(trimmed)){
        setError("Error")
        return
    }

    if (Number(trimmed) <= 0) {
    setError('Error');
    return;
  }
  setLoading(true)
  setError(null)

  try {
    const res = await fetch(
      `http://localhost:5139/api/currency/convert?from=${from.code}&to=${to.code}&amount=${trimmed}`
    );
    if (!res.ok) throw new Error('Server error');
    const data = await res.json();
    setResult(data.result);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }

};
   useEffect(() => {
  if (amount && from.code && to.code) {
    convert();
  }
}, [from, to]);
 
    return(
        <div className="ConverterBody">
          <span className='ConverterTitle'>Converter</span>
            <div className='Converter'>
            <div className='input'>
                <h1 className='Inputs_h1'>QUANTITY</h1>
               
              <CurrencySelect
                currencies={currencies}
                value={from}
                onChange={setFrom}
                amount={amount}
                onAmountChange={setAmount}
              />

            </div>
            <div className='swapDiv'>
              <div className='SwapDivider'></div>
        <span className='swapImg' onClick={swap}/>
         <div className='SwapDivider'></div>
            </div>

             <div className='output'>
                <h1 className='Inputs_h1' >RESULT</h1>
                <span></span>
                <CurrencySelect
                currencies={currencies}
                value={to}
                onChange={setTo}
                amount={result != null ? Number(result).toLocaleString('ru-RU') : ''}
                readOnly
                />

            </div> 
<div className='button-div'><button className='convert-button' onClick={convert} disabled={loading}>
{loading ? 'Convertation...' : 'Convert'}
</button></div>
    
        <div className="exchange-rate">
          <div className="exchange-rate-info">
            <span>1 {from.code} =</span>
            <span className="exchange-rate-value">
              {rate ? `${rate} ${to.code}` : `? ${to.code}`}
            </span>
          </div>
          {sparklineData.length > 1 && <Sparkline data={sparklineData} up={sparklineUp} />}
        </div>

    </div>
  </div>
    )
}
export default Converter