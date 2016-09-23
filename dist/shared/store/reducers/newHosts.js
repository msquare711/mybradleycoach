'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHandler = require('../actionHandler');

var initialValue = true;
var deleteMeeting = new _actionHandler.ActionHandler('DELETE_MEETING', function () {
  return initialValue;
});
var joinMeeting = new _actionHandler.ActionHandler('JOIN_MEETING', function (newHosts, action) {
  return action.newHosts;
});
var setNewHosts = new _actionHandler.ActionHandler('SET_NEW_HOSTS', function (newHosts, action) {
  return action.newHosts;
});

var actions = [joinMeeting, setNewHosts, deleteMeeting];

var newHostsReducer = function newHostsReducer() {
  var newHosts = arguments.length <= 0 || arguments[0] === undefined ? initialValue : arguments[0];
  var action = arguments[1];

  var newNewHosts = (0, _actionHandler.handleActions)(actions, newHosts, action);
  Object.freeze(newNewHosts);
  return newNewHosts;
};

exports.default = newHostsReducer;