import {
  createStore,
  combineReducers
} from 'redux';

import moment from 'moment';

const contractionReducer = (contractions = [], action) => {
  if(action.type === 'SAVE_CONTRACTION'){
    return [...contractions, {startTime: action.startTime, endTime: action.endTime}];
  }
  return contractions;
};

let reducers = combineReducers({
  laborStartTime: (timer = moment('09/22/2016', 'MM/DD/YYYY')) => timer,
  contractions: contractionReducer
});

const attachDevTools = () => {
  return window.devToolsExtension ? window.devToolsExtension() : undefined;
};
let store = createStore(reducers, {}, process.title === 'browser' ? attachDevTools() : undefined);

const createNewStore = createStore.bind(this, reducers);
export {createNewStore as createStore};
export default store;
