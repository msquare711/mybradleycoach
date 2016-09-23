'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHandler = require('../actionHandler');

var initialValue = false;
var deleteMeeting = new _actionHandler.ActionHandler('DELETE_MEETING', function () {
  return initialValue;
});

var lockOutToggle = new _actionHandler.ActionHandler('LOCKED_OUT', function () {
  var lockedOut = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var action = arguments[1];

  return action.lockedOut;
});

var actions = [lockOutToggle, deleteMeeting];

var lockedOutReducer = function lockedOutReducer() {
  var lockedOut = arguments.length <= 0 || arguments[0] === undefined ? initialValue : arguments[0];
  var action = arguments[1];

  var newLockedOut = (0, _actionHandler.handleActions)(actions, lockedOut, action);
  Object.freeze(newLockedOut);
  return newLockedOut;
};

exports.default = lockedOutReducer;