import React,{Component} from 'react'
import axios from 'axios'

// materialize components
import Loader from './material-preloader-linear'

class TickerFeed extends Component {
  constructor(props){
    super(props)
    this.processAutoRefresh = this.processAutoRefresh.bind(this)
    this.state = {
      tickerInfo: null,
      currentCount: 0,
      intervalPoll: null
    }
  }

  // fetch data by accessing rest API
  fetchData(){
    let curThis = this;
    const prodEndpoint = "https://api.itbit.com/v1"
    const currencyPair = this.props.currencyPair;

    axios.get(prodEndpoint+"/markets/"+currencyPair+"/ticker")
      .then(function(res){
        //console.log(res.data)
        curThis.setState({tickerInfo: res.data})
      })
  }

  // custom function for processing auto refresh button when it is clicked
  processAutoRefresh(){
    self = this;
    if(this.state.autoRefresh) {
      this.setState({autoRefresh: false})
      clearInterval(this.state.intervalPoll)
    }
    else {
      let intervalPoll = setInterval(self.fetchData.bind(self), 1000)
      this.setState({autoRefresh: true, intervalPoll: intervalPoll})
    }
  }

  // react life cycle event. run these code block when the component is mounted
  componentDidMount(){
    this.fetchData() // fetch data once the component is mounted
  }

  // rendering element
  renderTickerCollectionList(title, value, additionalSymbol){
    return(
      <li className="collection-item">
        <span className="title">{title}</span>
        <p style={{marginLeft: 10}}> {additionalSymbol} {value}</p>
      </li>
    )
  }

  // rendering element
  renderTicker(title, ticker){
    const currPrice = (parseInt(ticker.ask) + parseInt(ticker.bid) ) / 2;
    const topBid = ticker.bidAmt + ' @ $' + ticker.bid;
    const topAsk = ticker.askAmt + ' @ $' + ticker.ask;
    let autoRefreshButton = <div className="btn-floating btn waves-effect waves-light red right" onClick={this.processAutoRefresh}><i className="material-icons">replay</i></div>
    if(this.state.autoRefresh) autoRefreshButton = <div className="btn-floating btn waves-effect waves-light green right" onClick={this.processAutoRefresh}><i className="material-icons">replay</i></div>
    return (
      <div>
        <div className="row">
          {autoRefreshButton}
        </div>

        <h5>{title}</h5>

        <ul className="collection clear-border">
          {this.renderTickerCollectionList('24-Hour Volume', ticker.volume24h)}
          {this.renderTickerCollectionList('Current Price', currPrice, '$')}
          {this.renderTickerCollectionList('Top Bid', topBid)}
          {this.renderTickerCollectionList('Top Ask', topAsk)}
        </ul>
      </div>
    )
  }

  // main render function
  render(){
    let tickerElement = <Loader />
    let title = "TICKER"
    if(this.props.title) title = this.props.title;
    if(this.state.tickerInfo) tickerElement = this.renderTicker(title, this.state.tickerInfo)
    return (
      <div>
        {tickerElement}
      </div>
    )
  }
}

export default TickerFeed
