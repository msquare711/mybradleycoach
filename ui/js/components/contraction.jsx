import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

class Contraction extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const {startTime, endTime} = this.props;
    const duration = moment.duration(endTime.diff(startTime));
    return (<div>
      <div>Start Time: {startTime.toString()}</div>
      <div>End Time: {endTime.toString()}</div>
      <div>Duration: {duration.humanize()}</div>
    </div>);
  }
}

export default connect(i=>i)(Contraction);
