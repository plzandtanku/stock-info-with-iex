import React, { Component } from 'react';
import './App.css';


function StockInfo(props){
  return (
    <div > 
      <div>
        {props.stockData.symbol} - {props.stockData.companyName}
      </div>
      <div>
        <p>Price: {props.stockData.latestPrice}</p>
        <p>Change: {props.stockData.change} [{props.stockData.changePercent}%]</p>
      </div>
      <button onClick={props.onClick}>Back</button> 
    </div>
  );
}
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: [],
      stockList:[],
    };
  }
  showList(){
    this.setState({
      display: this.state.stockList,
    });
  }
  handleClick(e,selectedStock){
   // alert("this feature coming in 2030!");
    this.setState({
      display: <div>
      <StockInfo 
        stockData = {selectedStock}
        onClick = {(e) => this.showList(e)}
        //onClick={(e) => this.handleClick(e,item)}
      /> 
      </div>
    });
  }
  componentDidMount() {
    let stockItems = [];
    fetch('/api/data').then(function(response) {
      return response.json();
    }).then(function(stocks) {
      console.log(stocks[0]);
      stocks.forEach(function(item) {
          stockItems.push(
          /**  <StockInfo 
              stockData = {item}
              key ={item.symbol}
              symbol={item.symbol}
              onClick={(e) => this.handleClick(e,item)}
            />**/
            <div 
              key = {item.symbol}
              onClick={(e) => this.handleClick(e,item)}
              >
              {item.symbol} - {item.companyName} 
              </div>
          );
      }.bind(this));
      this.setState({
        display: stockItems,
        stockList: stockItems
      });
    }.bind(this));
  }
  render() {

    return (
      <React.Fragment>
        <h3> Most Active Stocks for Today [{new Date().toLocaleDateString("en-US").toString()}] </h3>
        {this.state.display}
      </React.Fragment>
    );
  }
}
class App extends Component {
  render() {
		fetch('/api/test?abba=66').then((res) => 
      res.json()
		).then((json) => 
      console.log(JSON.stringify(json))
    );
    return (
      <div>
      <Table />
      </div>
    );
  }
}

export default App;
