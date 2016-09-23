'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHandler = require('../actionHandler');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialValue = [];
var deleteMeeting = new _actionHandler.ActionHandler('DELETE_MEETING', function () {
  return initialValue;
});
var joinMeeting = new _actionHandler.ActionHandler('JOIN_MEETING', function (knockers, action) {
  return action.knockers;
});

var addKnocker = new _actionHandler.ActionHandler('ADD_KNOCKER', function (knockers, action) {
  return [].concat(_toConsumableArray(knockers), [{ id: action.id, message: action.message }]);
});

var rejectKnocker = new _actionHandler.ActionHandler('REJECT_KNOCKER', function (knockers, action) {
  return knockers.filter(function (knocker) {
    return knocker.id !== action.id;
  });
});

var approveKnocker = new _actionHandler.ActionHandler('APPROVE_KNOCKER', function (knockers, action) {
  return knockers.filter(function (knocker) {
    return knocker.id !== action.id;
  });
});

var actions = [addKnocker, rejectKnocker, approveKnocker, deleteMeeting, joinMeeting];

var KnockerReducer = function KnockerReducer() {
  var knockers = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var action = arguments[1];

  var newKnockers = (0, _actionHandler.handleActions)(actions, knockers, action);
  newKnockers.forEach(function (knocker) {
    return Object.freeze(knocker);
  });
  Object.freeze(newKnockers);
  return newKnockers;
};

exports.default = KnockerReducer;