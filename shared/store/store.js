import {
  createStore,
  combineReducers
} from 'redux';

import moment from 'moment';

const sampleContraction = {startTime: moment('2016-09-22T20:00:00-07:00'), endTime: moment('2016-09-22T20:02:00-07:00')};

let reducers = combineReducers({
  laborStartTime: (timer = moment('09/22/2016', 'MM/DD/YYYY')) => timer,
  contractions:(contractions = [sampleContraction]) => contractions,
});

const attachDevTools = () => {
  return window.devToolsExtension ? window.devToolsExtension() : undefined;
};
let store = createStore(reducers, {}, process.title === 'browser' ? attachDevTools() : undefined);

const createNewStore = createStore.bind(this, reducers);
export {createNewStore as createStore};
export default store;
