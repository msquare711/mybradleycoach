import React, {Component} from 'react';
import moment from 'moment';

class Timer extends Component {
  constructor(props){
    super(props);
    const duration = moment.duration(moment().diff(props.startTime));
    this.state = {
      duration
    };
    this.refreshTimer = this.refreshTimer.bind(this);
  }
  refreshTimer(){
    const {startTime} = this.props;
    setTimeout(() => {
      const duration = moment.duration(moment().diff(startTime));
      this.setState({
        duration
      });
    }, 1000);
  }
  render(){
    this.refreshTimer();
    const {duration} = this.state;
    return (<span>
        {duration.get('hours')}:{duration.get('minutes')}:{duration.get('seconds')}
      </span>);
  }
}

export default Timer;
