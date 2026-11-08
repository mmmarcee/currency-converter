
import logo from "../../assets/Header/logo.svg"



const HeaderSmallScreen = () => {

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
        <div className="header-tap-bar">
                    <a href="settings" className='btn-link'>
        <button className='HeaderButton'>
        <span className="material-symbols-outlined">
settings
</span>
        </button></a>
        <button className='HeaderButton' onClick={scrollToConverter}>
        <span className="material-symbols-outlined">
currency_exchange
</span>
        </button>

      <div className="logo-div-small-screen-header"><img className="logo-small-screen-header" src={logo} alt="logo" /></div>

        <button className='HeaderButton' onClick={scrollToGraphs}>
        <span className="material-symbols-outlined">
query_stats
</span>
        </button>
        <button className='HeaderButton'>
   <span className="material-symbols-outlined">
finance_mode
</span>
        </button>
        </div>
    )
}

export default HeaderSmallScreen