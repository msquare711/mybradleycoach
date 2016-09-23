'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHandler = require('../actionHandler');

var initialValue = 'meeting-summary';
var deleteMeeting = new _actionHandler.ActionHandler('DELETE_MEETING', function () {
  return initialValue;
});
var joinMeeting = new _actionHandler.ActionHandler('JOIN_MEETING', function (roomName, action) {
  return action.roomName;
});

var setRoomName = new _actionHandler.ActionHandler('SET_ROOM_NAME', function (roomName, action) {
  return action.roomName;
});

var actions = [joinMeeting, deleteMeeting, setRoomName];

var RoomNameReducer = function RoomNameReducer() {
  var roomName = arguments.length <= 0 || arguments[0] === undefined ? initialValue : arguments[0];
  var action = arguments[1];

  var newRoomName = (0, _actionHandler.handleActions)(actions, roomName, action);
  Object.freeze(newRoomName);
  return newRoomName;
};

exports.default = RoomNameReducer;