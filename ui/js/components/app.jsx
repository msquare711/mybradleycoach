import React, {Component} from 'react';
import {connect} from 'react-redux';
import Contraction from './contraction';

class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <main className='home'>
        My Bradley Coach
        <div>{this.props.laborStartTime.format()}</div>
        <div>Someone's Contractions:
        <Contraction startTime={this.props.contractions[0].startTime} endTime={this.props.contractions[0].endTime}/>
        </div>
      </main>);
  }
}

const selector = state => state;

export default connect(selector)(App);
