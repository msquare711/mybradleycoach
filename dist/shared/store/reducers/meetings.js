'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHandler = require('../actionHandler');

var _utils = require('../utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createMeeting = new _actionHandler.ActionHandler('CREATE_MEETING', function (meetings, action) {
  return [].concat(_toConsumableArray(meetings), [{ name: action.name, participants: 0 }]);
});

var setMeetings = new _actionHandler.ActionHandler('SET_MEETINGS', function (meetings, action) {
  return action.meetings;
});

var growMeeting = new _actionHandler.ActionHandler('GROW_MEETING', function (meetings, action) {
  var currentMeeting = meetings.find(function (meeting) {
    return meeting.name === action.name;
  });
  if (!currentMeeting) {
    return meetings;
  }
  var updatedMeeting = Object.assign({}, currentMeeting, { participants: currentMeeting.participants + 1 });
  return (0, _utils.replace)(meetings, currentMeeting, updatedMeeting);
});

var shrinkMeeting = new _actionHandler.ActionHandler('SHRINK_MEETING', function (meetings, action) {
  var currentMeeting = meetings.find(function (meeting) {
    return meeting.name === action.name;
  });
  if (!currentMeeting) {
    return meetings;
  }
  var updatedMeeting = Object.assign({}, currentMeeting, { participants: currentMeeting.participants - 1 });
  return (0, _utils.replace)(meetings, currentMeeting, updatedMeeting);
});

var deleteMeeting = new _actionHandler.ActionHandler('DELETE_MEETING', function (meetings, action) {
  return meetings.filter(function (meeting) {
    return meeting.name !== action.name;
  });
});

var actions = [createMeeting, setMeetings, growMeeting, shrinkMeeting, deleteMeeting];

var meetingsReducer = function meetingsReducer() {
  var meetings = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var action = arguments[1];

  var newMeetings = (0, _actionHandler.handleActions)(actions, meetings, action);
  newMeetings.forEach(Object.freeze);
  Object.freeze(newMeetings);
  return newMeetings;
};

exports.default = meetingsReducer;