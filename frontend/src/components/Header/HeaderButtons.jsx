import './Header.css'

const HeaderButtons = () => {

const scrollToConverter = () => {
  document.getElementById('ScrollToConverter')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

const scrollToGraphs = () => {
  document.getElementById('ScrollToCharts')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

     return(
     <div className='HeaderButtons'>
        <a href="settings" className='btn-link'>
        <button className='HeaderButton'>
        Options
        </button></a>
        <button className='HeaderButton' onClick={scrollToConverter}>
        Converter
        </button>
        <button className='HeaderButton' onClick={scrollToGraphs}>
        Graphs
        </button>
        <button className='HeaderButton'>
        Stocks
        </button>
    </div>
    
)
        
};


export default HeaderButtons