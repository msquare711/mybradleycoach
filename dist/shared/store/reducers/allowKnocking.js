'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHandler = require('../actionHandler');

var intialValue = true;

var joinMeeting = new _actionHandler.ActionHandler('JOIN_MEETING', function (allowKnocking, action) {
  return action.allowKnocking;
});
var enableKnocking = new _actionHandler.ActionHandler('ALLOW_KNOCKING', function () {
  return true;
});
var disableKnocking = new _actionHandler.ActionHandler('DISABLE_KNOCKING', function () {
  return false;
});
var deleteMeeting = new _actionHandler.ActionHandler('DELETE_MEETING', function () {
  return intialValue;
});

var actions = [enableKnocking, disableKnocking, deleteMeeting, joinMeeting];

var AllowKnockingReducer = function AllowKnockingReducer() {
  var allowKnocking = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
  var action = arguments[1];

  var newAllowKnocking = (0, _actionHandler.handleActions)(actions, allowKnocking, action);
  Object.freeze(newAllowKnocking);
  return newAllowKnocking;
};

exports.default = AllowKnockingReducer;