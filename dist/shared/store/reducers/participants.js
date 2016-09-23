'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHandler = require('../actionHandler');

var _utils = require('../utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialValue = [];
var deleteMeeting = new _actionHandler.ActionHandler('DELETE_MEETING', function () {
  return initialValue;
});

var joinMeeting = new _actionHandler.ActionHandler('JOIN_MEETING', function (participants, action) {
  return action.participants;
});

var setHost = new _actionHandler.ActionHandler('SET_HOST', function (participants, action) {
  var participantToUpdate = participants.find(function (participant) {
    return participant.id === action.id;
  });
  var modifiedParticipant = Object.assign({}, participantToUpdate, {
    host: action.isHost
  });
  return (0, _utils.replace)(participants, participantToUpdate, modifiedParticipant);
});

var addParticipant = new _actionHandler.ActionHandler('ADD_PARTICIPANT', function (participants, action) {
  return [].concat(_toConsumableArray(participants), [action.participant]);
});

var removeParticipant = new _actionHandler.ActionHandler('REMOVE_PARTICIPANT', function (participants, action) {
  return participants.filter(function (p) {
    return p.id !== action.participantId;
  });
});

var actions = [joinMeeting, setHost, addParticipant, removeParticipant, deleteMeeting];

var participantReducer = function participantReducer() {
  var participants = arguments.length <= 0 || arguments[0] === undefined ? initialValue : arguments[0];
  var action = arguments[1];

  var newParticipants = (0, _actionHandler.handleActions)(actions, participants, action);
  newParticipants.forEach(Object.freeze);
  Object.freeze(newParticipants);
  return newParticipants;
};

exports.default = participantReducer;