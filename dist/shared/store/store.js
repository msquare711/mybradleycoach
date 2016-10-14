'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = undefined;

var _redux = require('redux');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var contractionReducer = function contractionReducer() {
  var contractions = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var action = arguments[1];

  if (action.type === 'SAVE_CONTRACTION') {
    return [].concat(_toConsumableArray(contractions), [{ startTime: action.startTime, endTime: action.endTime }]);
  }
  return contractions;
};

var reducers = (0, _redux.combineReducers)({
  laborStartTime: function laborStartTime() {
    var timer = arguments.length <= 0 || arguments[0] === undefined ? (0, _moment2.default)('09/22/2016', 'MM/DD/YYYY') : arguments[0];
    return timer;
  },
  contractions: contractionReducer
});

var attachDevTools = function attachDevTools() {
  return window.devToolsExtension ? window.devToolsExtension() : undefined;
};
var store = (0, _redux.createStore)(reducers, {}, process.title === 'browser' ? attachDevTools() : undefined);

var createNewStore = _redux.createStore.bind(undefined, reducers);
exports.createStore = createNewStore;
exports.default = store;