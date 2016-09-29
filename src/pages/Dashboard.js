import React,{Component} from 'react'
import TickerFeed from '../components/ticker-feed'

const hrStyling = {width: 40, marginBottom: 35}

class Dashboard extends Component {

  renderTicker(currencyPair, title){
    return (
      <div className="col l4 m4 s12">
        <div className="card-panel">
          <TickerFeed currencyPair={currencyPair} title={title}/>
        </div>
      </div>
    )
  }

  render(){
    return (
      <div>
        <div className="">
          <h3 className="center">ITBIT EXCHANGE PRICE DASHBOARD</h3>
          <hr style={hrStyling}/>

          <div className="row">
            {this.renderTicker('XBTUSD', "USD TICKER")}
            {this.renderTicker('XBTSGD', "SGD TICKER")}
            {this.renderTicker('XBTEUR', "EUR TICKER")}
          </div>
        </div>

      </div>
    )
  }
}

export default Dashboard
