import './Chart.css';
import Chart from './Chart.jsx';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'CNY','NZD','JPY', 'KZT'];

const MainChart = () => {
    return (
        <div className='charts-list'>
            <div className='main-scroll-anchor-charts' id='ScrollToCharts' ></div>
            {CURRENCIES.map((cur) => (
                <div className='chart-div' key={cur}>
                    <Chart defaultCurrency={cur} />
                </div>
            ))}
        </div>
    );
};

export default MainChart;