import './Chart.css';
import { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { allData } from './data.js';


const Chart = ({ defaultCurrency = 'USD'}) => {
    const [currency, setCurrency] = useState(defaultCurrency);
    const [period, setPeriod] = useState('1W');


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // TODO

    const [isVisible, setIsVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef(null);
    const timerRef = useRef(null);
    const placeholder = !isVisible && !loaded;

   

   useEffect(() => {
    if (!isVisible) return; 

    setLoading(true);
    setError(null);

    clearTimeout(timerRef.current);
    const delay = 1;
    timerRef.current = setTimeout(() => {
        setLoading(false);
        setLoaded(true);
    }, delay);

    return () => clearTimeout(timerRef.current);
}, [isVisible, currency, period]);

    useEffect(() => {
    const el = containerRef.current;
    if (!el) return;


    if (!('IntersectionObserver' in window)) {
        setIsVisible(true);
        return;
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect(); 
            }
        },
        { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect(); 
}, []);

    return (



        <div className="Chart-container" ref={containerRef}>
            <h2 className="Chart-title">{currency} / RUB</h2>
            <div className="Chart-currencies">
                <button
                    className={`Chart-currency-btn ${currency === 'USD' ? 'active' : ''}`}
                    onClick={() => setCurrency('USD')}>
                    USD
                </button>
                <button
                    className={`Chart-currency-btn ${currency === 'EUR' ? 'active' : ''}`}
                    onClick={() => setCurrency('EUR')}>
                    EUR
                </button>
                <button
                    className={`Chart-currency-btn ${currency === 'GBP' ? 'active' : ''}`}
                    onClick={() => setCurrency('GBP')}>
                    GBP
                </button>
                 <button
                    className={`Chart-currency-btn ${currency === 'CNY' ? 'active' : ''}`}
                    onClick={() => setCurrency('CNY')}>
                    CNY
                </button>
                <button
                    className={`Chart-currency-btn ${currency === 'NZD' ? 'active' : ''}`}
                    onClick={() => setCurrency('NZD')}>
                    NZD
                </button>
                <button
                    className={`Chart-currency-btn ${currency === 'JPY' ? 'active' : ''}`}
                    onClick={() => setCurrency('JPY')}>
                    JPY
                </button>
                 <button
                    className={`Chart-currency-btn ${currency === 'CHF' ? 'active' : ''}`}
                    onClick={() => setCurrency('CHF')}>
                    CHF
                </button>
                <button
                    className={`Chart-currency-btn ${currency === 'AUD' ? 'active' : ''}`}
                    onClick={() => setCurrency('AUD')}>
                    AUD
                </button>
                <button
                    className={`Chart-currency-btn ${currency === 'CAD' ? 'active' : ''}`}
                    onClick={() => setCurrency('CAD')}>
                    CAD
                </button>
            </div>
            <div className="Chart-periods">
                {['1W', '1M', '1Y', '10Y'].map((p) => (
                    <button
                        key={p}
                        className={`Chart-period-btn ${period === p ? 'active' : ''}`}
                        onClick={() => setPeriod(p)}
                    >
                        {p}
                    </button>
                ))}
            </div>
            {placeholder ? (
    <div style={{ height: 300 }} />        
) : loading ? (<div className="Chart-loading">Loading...</div>
            ) : error ? (<div className="Chart-error" style={{ height: 300 }}>
        <p>{error}</p>
    </div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={allData[currency][period]}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4caf50" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="date" />
                        <Tooltip
                        formatter={(value) => [value.toFixed(currency === 'JPY' ? 4 : 2) + ' ₽', 'Курс']}
                        labelFormatter={(label) => `Date: ${label}`}
                            contentStyle={{
                                background: '#2a2a2a',
                                border: '1px solid #444',
                                borderRadius: '8px',
                                color: '#fff',
                            }} />
                        <YAxis domain={['auto', 'auto']}/>
                        <Area
                            dataKey="value"
                            stroke="#4caf50"
                            strokeWidth={2}
                            fill="url(#colorValue)"
                             isAnimationActive={isVisible}   
                            animationDuration={800}         
                             animationEasing="ease-out" />
                    </AreaChart>
                </ResponsiveContainer>)}
        </div>
    )
};

export default Chart; 
