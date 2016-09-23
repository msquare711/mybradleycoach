'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = undefined;

var _redux = require('redux');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleContraction = { startTime: (0, _moment2.default)('2016-09-22T20:00:00-07:00'), endTime: (0, _moment2.default)('2016-09-22T20:02:00-07:00') };

var reducers = (0, _redux.combineReducers)({
  laborStartTime: function laborStartTime() {
    var timer = arguments.length <= 0 || arguments[0] === undefined ? (0, _moment2.default)('09/22/2016', 'MM/DD/YYYY') : arguments[0];
    return timer;
  },
  contractions: function contractions() {
    var _contractions = arguments.length <= 0 || arguments[0] === undefined ? [sampleContraction] : arguments[0];

    return _contractions;
  }
});

var attachDevTools = function attachDevTools() {
  return window.devToolsExtension ? window.devToolsExtension() : undefined;
};
var store = (0, _redux.createStore)(reducers, {}, process.title === 'browser' ? attachDevTools() : undefined);

var createNewStore = _redux.createStore.bind(undefined, reducers);
exports.createStore = createNewStore;
exports.default = store;