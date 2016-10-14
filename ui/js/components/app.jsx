import React, {Component} from 'react';
import {connect} from 'react-redux';
import Contraction from './contraction';
import Timer from './timer';
import {saveContraction} from '../../../shared/actions';

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
        <div>Labor Duration: <Timer onStop={(startTime, endTime)=>console.log('start:' + startTime.format(), 'end:' + endTime.format())}/></div>
        <div>
          <h2>Current Contraction</h2>
          <Timer onStop={(startTime, endTime)=>{
            const saveAction = saveContraction(startTime, endTime);
            this.props.dispatch(saveAction);
          }}/>
          <h3>Previous Contractions</h3>
          {renderedContractions}
        </div>
      </main>);
  }
}

const selector = state => state;

export default connect(selector)(App);
