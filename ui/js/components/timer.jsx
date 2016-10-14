import React, {Component} from 'react';
import moment from 'moment';

class Timer extends Component {
  constructor(props){
    super(props);
    const {startTime} = props;
    const duration = startTime ? moment.duration(moment().diff(startTime)) : moment.duration(0);
    this.state = {
      duration,
      startTime
    };
    this.refreshTimer = this.refreshTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }
  refreshTimer(){

    const recalcDuration = () => {
      const {startTime} = this.state;
      const duration = moment.duration(moment().diff(startTime));
      let timeout = this.state.timeoutFunc;

      if(this.state.startTime && !this.state.endTime){
        timeout = setTimeout(recalcDuration, 1000);
      }

      this.setState({
        duration,
        timeoutFunc: timeout
      });
    };
    const timeoutFunc = setTimeout(recalcDuration, 1000);
    this.setState({
      timeoutFunc
    });
  }
  startTimer(){
    this.setState({
      startTime: moment()
    });
    this.refreshTimer();
  }
  stopTimer(){
    const endTime = moment();
    this.setState({
      endTime
    });
    clearTimeout(this.state.timeoutFunc);
    this.props.onStop && this.props.onStop(this.state.startTime, endTime);
  }
  render(){
    const {duration} = this.state;
    return (
      <div>
        <span>
          {duration.get('hours')}:{duration.get('minutes')}:{duration.get('seconds')}
        </span>
        <button onClick={this.startTimer}>Start</button><button onClick={this.stopTimer}>Stop</button>
      </div>
    );
  }
}

export default Timer;
