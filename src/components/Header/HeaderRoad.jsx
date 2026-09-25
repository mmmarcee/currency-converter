import './Header.css'

const StockGroup = () => (
  <div className="stockDiv">
    <span className="stockName">Google</span>
    <span className="stockPrice">298.37</span>
    <span className="stockPercent">+0.33</span>
    <span className="Divider2" />

    <span className="stockName">Apple</span>
    <span className="stockPrice">201.10</span>
    <span className="stockPercent">+1.24</span>
    <span className="Divider2" />

    <span className="stockName">Tesla</span>
    <span className="stockPrice">178.55</span>
    <span className="stockPercent">+0.45</span>
    <span className="Divider2" />

    <span className="stockName">NVDA</span>
    <span className="stockPrice">890.22</span>
    <span className="stockPercent">+2.13</span>
    <span className="Divider2" />

    <span className="stockName">Meta</span>
    <span className="stockPrice">502.34</span>
    <span className="stockPercent">+0.98</span>
    <span className="Divider2" />

    <span className="stockName">AMZN</span>
    <span className="stockPrice">187.45</span>
    <span className="stockPercent">-0.22</span>
    <span className="Divider2" />

    <span className="stockName">MSFT</span>
    <span className="stockPrice">412.90</span>
    <span className="stockPercent">+0.55</span>
    <span className="Divider2" />
  </div>
)

const HeaderRoad = () => {
  return (
    <div className="Road">
      <div className="stockTrack">
        <StockGroup />
        <StockGroup />
        <StockGroup />
        <StockGroup />
        <StockGroup />
        <StockGroup />
        <StockGroup />
        <StockGroup />
      </div>
    </div>
  )
}

export default HeaderRoad 