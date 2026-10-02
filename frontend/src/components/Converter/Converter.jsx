import './Converter.css'
import { useState} from 'react';
import CurrencySelect from './CurrencySelect.jsx'
import {currencies} from '../Arrays.jsx'

const Converter = () => {
  
  const [from, setFrom] = useState(currencies[0]);
  const [to, setTo] = useState(currencies[1]);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   
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
    if (!res.ok) throw new Error('Ошибка сервера');
    const data = await res.json();
    setResult(data.result);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }

};
  
    return(
        <div className="ConverterBody">
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
        <span className='swapImg'/>
            </div>

             <div className='output'>
                <h1 className='Inputs_h1' >RESULT</h1>
                <span></span>
                <CurrencySelect
                currencies={currencies}
                value={to}
                onChange={setTo}
                amount={result}
                readOnly
                />

            </div> 
<div className='button-div'><button className='convert-button' onClick={convert} disabled={loading}>
{loading ? 'Convertation...' : 'Convert'}
</button></div>
        </div></div>
    )
}
export default Converter