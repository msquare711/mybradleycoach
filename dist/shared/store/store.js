'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = undefined;

var _redux = require('redux');

var _participants = require('./reducers/participants');

var _participants2 = _interopRequireDefault(_participants);

var _meetings = require('./reducers/meetings');

var _meetings2 = _interopRequireDefault(_meetings);

var _phase = require('./reducers/phase');

var _phase2 = _interopRequireDefault(_phase);

var _locked = require('./reducers/locked');

var _locked2 = _interopRequireDefault(_locked);

var _newHosts = require('./reducers/newHosts');

var _newHosts2 = _interopRequireDefault(_newHosts);

var _user = require('./reducers/user');

var _user2 = _interopRequireDefault(_user);

var _topics = require('./reducers/topics');

var _topics2 = _interopRequireDefault(_topics);

var _roomName = require('./reducers/roomName');

var _roomName2 = _interopRequireDefault(_roomName);

var _lockedOut = require('./reducers/lockedOut');

var _lockedOut2 = _interopRequireDefault(_lockedOut);

var _allowKnocking = require('./reducers/allowKnocking');

var _allowKnocking2 = _interopRequireDefault(_allowKnocking);

var _knockers = require('./reducers/knockers');

var _knockers2 = _interopRequireDefault(_knockers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = (0, _redux.combineReducers)({
  meetings: _meetings2.default,
  meetingFilter: function meetingFilter() {
    var _meetingFilter = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    var action = arguments[1];

    if (action.type === 'FILTER_MEETINGS') {
      return action.filter || '';
    }
    return _meetingFilter;
  },
  participants: _participants2.default,
  userId: _user2.default,
  phase: _phase2.default,
  roomName: _roomName2.default,
  timer: function timer() {
    var _timer = arguments.length <= 0 || arguments[0] === undefined ? 350000 : arguments[0];

    return _timer;
  },
  phaseVotes: function phaseVotes() {
    var _phaseVotes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    return _phaseVotes;
  },
  topics: _topics2.default,
  locked: _locked2.default,
  newHosts: _newHosts2.default,
  lockedOut: _lockedOut2.default,
  allowKnocking: _allowKnocking2.default,
  knockers: _knockers2.default
});

var attachDevTools = function attachDevTools() {
  return window.devToolsExtension ? window.devToolsExtension() : undefined;
};
var store = (0, _redux.createStore)(reducers, {}, process.title === 'browser' ? attachDevTools() : undefined);

var createNewStore = _redux.createStore.bind(undefined, reducers);
exports.createStore = createNewStore;
exports.default = store;