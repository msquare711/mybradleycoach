'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHandler = require('../actionHandler');

var initialValue = false;
var deleteMeeting = new _actionHandler.ActionHandler('DELETE_MEETING', function () {
  return initialValue;
});

var joinMeeting = new _actionHandler.ActionHandler('JOIN_MEETING', function (locked, action) {
  return action.locked;
});
var setLocked = new _actionHandler.ActionHandler('SET_LOCKED', function (locked, action) {
  return action.locked;
});

var actions = [joinMeeting, setLocked, deleteMeeting];

var lockedReducer = function lockedReducer() {
  var locked = arguments.length <= 0 || arguments[0] === undefined ? initialValue : arguments[0];
  var action = arguments[1];

  var newLocked = (0, _actionHandler.handleActions)(actions, locked, action);
  Object.freeze(newLocked);
  return newLocked;
};

exports.default = lockedReducer;