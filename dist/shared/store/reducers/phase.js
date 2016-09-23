'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHandler = require('../actionHandler');

var initialValue = 'submit';
var deleteMeeting = new _actionHandler.ActionHandler('DELETE_MEETING', function () {
  return initialValue;
});
var joinMeeting = new _actionHandler.ActionHandler('JOIN_MEETING', function (phase, action) {
  return action.phase;
});
var setPhaseSubmit = new _actionHandler.ActionHandler('SET_PHASE_SUBMIT', function (phase, action) {
  return action.phase;
});
var setPhaseMerge = new _actionHandler.ActionHandler('SET_PHASE_MERGE', function (phase, action) {
  return action.phase;
});
var setPhaseVote = new _actionHandler.ActionHandler('SET_PHASE_VOTE', function (phase, action) {
  return action.phase;
});
var setPhaseDiscuss = new _actionHandler.ActionHandler('SET_PHASE_DISCUSS', function (phase, action) {
  return action.phase;
});
var setPhaseComplete = new _actionHandler.ActionHandler('SET_PHASE_COMPLETE', function (phase, action) {
  return action.phase;
});

var actions = [joinMeeting, setPhaseSubmit, setPhaseMerge, setPhaseVote, setPhaseDiscuss, setPhaseComplete, deleteMeeting];

var phaseReducer = function phaseReducer() {
  var phase = arguments.length <= 0 || arguments[0] === undefined ? initialValue : arguments[0];
  var action = arguments[1];

  var newPhase = (0, _actionHandler.handleActions)(actions, phase, action);
  Object.freeze(newPhase);
  return newPhase;
};

exports.default = phaseReducer;