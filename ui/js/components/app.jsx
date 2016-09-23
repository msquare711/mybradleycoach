import React, {Component} from 'react';
import {connect} from 'react-redux';
import Contraction from './contraction';
import Timer from './timer';

class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const {laborStartTime, contractions} = this.props;
    const renderedContractions = contractions.map((contraction, index) => (<Contraction {...contraction} key={index}/>));
    return (
      <main className='home'>
        My Bradley Coach
        <div>Labor Start Time: {laborStartTime.format()}</div>
        <div>Labor Duration: <Timer startTime={laborStartTime}/></div>
        <div>Someone's Contractions:
          {renderedContractions}
        </div>
      </main>);
  }
}

const selector = state => state;

export default connect(selector)(App);
