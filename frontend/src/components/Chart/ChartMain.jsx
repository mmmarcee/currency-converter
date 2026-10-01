import './Chart.css';
import Chart from './Chart.jsx';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'CNY','NZD','JPY'];

const MainChart = () => {
    return (
        <div className='charts-list'>
            {CURRENCIES.map((cur) => (
                <div className='chart-div' key={cur}>
                    <Chart defaultCurrency={cur} />
                </div>
            ))}
        </div>
    );
};

export default MainChart;