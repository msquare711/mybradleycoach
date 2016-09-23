'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHandler = require('../actionHandler');

var initialValue = '';
var deleteMeeting = new _actionHandler.ActionHandler('DELETE_MEETING', function () {
  return initialValue;
});
var joinMeeting = new _actionHandler.ActionHandler('JOIN_MEETING', function (userId, action) {
  return action.userId || userId;
});

var actions = [joinMeeting, deleteMeeting];

var userReducer = function userReducer() {
  var userId = arguments.length <= 0 || arguments[0] === undefined ? initialValue : arguments[0];
  var action = arguments[1];

  var newUserId = (0, _actionHandler.handleActions)(actions, userId, action);
  Object.freeze(newUserId);
  return newUserId;
};

exports.default = userReducer;