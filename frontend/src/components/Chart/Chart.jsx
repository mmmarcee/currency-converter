import './Chart.css';
import { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { allData } from './data.js';
import {currencies} from '../Arrays.jsx'

const Chart = ({ defaultCurrency = 'RUB'}) => {
    const [currency, setCurrency] = useState(allData[defaultCurrency] ? defaultCurrency : 'RUB');
    const [period, setPeriod] = useState('1W');


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <div className="Chart-toolbar">
                <h2 className="Chart-title"><img src={currencies.find((c) => c.code === currency)?.img} alt={currency}></img>{currency} / USD</h2>
                <h1>199$</h1>
                <div className="Chart-controls">
                    <div className="Chart-currencies">
                <button
                    className={`Chart-currency-btn ${currency === 'RUB' ? 'active' : ''}`}
                    onClick={() => setCurrency('RUB')}>
                    RUB
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
                <button
                    className={`Chart-currency-btn ${currency === 'KZT' ? 'active' : ''}`}
                    onClick={() => setCurrency('KZT')}>
                    KZT
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
                </div>
            </div>
            {placeholder ? (
    <div style={{ height: 300 }} />        
) : loading ? (<div className="Chart-loading">Loading...</div>
            ) : error ? (<div className="Chart-error" style={{ height: 300 }}>
        <p>{error}</p>
    </div>
            ) : (
                <ResponsiveContainer width="100%" height={280}>
    <AreaChart data={allData[currency]?.[period] ?? []} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
    <defs>
      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="var(--chartLineEffect)" stopOpacity={0.22} />
        <stop offset="100%" stopColor="var(--chartLineEffect)" stopOpacity={0} />
      </linearGradient>
    </defs>

    <CartesianGrid vertical={false} strokeDasharray="3 5" stroke="#333" />

    <XAxis
      dataKey="date"
      axisLine={false}
      tickLine={false}
      tickMargin={10}
      minTickGap={32}
      tick={{ fill: '#B0B0B0', fontSize: 12 }}
    />
    <YAxis
    hide domain={['auto', 'auto']}
      orientation="right"
      axisLine={false}
      tickLine={false}
      tickMargin={8}
      width={56}
      tick={{ fill: '#B0B0B0', fontSize: 12 }}
    />

    <Tooltip
      cursor={{ stroke: '#555', strokeDasharray: '3 5' }}
      formatter={(value) => [value.toFixed(currency === 'JPY' ? 4 : 2) + ' ₽', 'Rate']}
      labelFormatter={(label) => `Date: ${label}`}
      contentStyle={{
        background: 'var(--chartInfoBg)',
        border: '1px solid #444',
        borderRadius: 8,
        color: 'var(--fontColor)',
        fontVariantNumeric: 'tabular-nums',
      }}
    />

    <Area
      type="linear"
      dataKey="value"
      stroke="var(--chartLine)"
      strokeWidth={2.5}
      fill="url(#colorValue)"
      dot={false}
      activeDot={{ r: 4, fill: 'var(--chartLine)', stroke: '#272727', strokeWidth: 2 }}
      isAnimationActive={isVisible}
      animationDuration={1300}
      animationEasing="ease-out"
    />
  </AreaChart>
</ResponsiveContainer>)}
        </div>
    )
};

export default Chart; 
