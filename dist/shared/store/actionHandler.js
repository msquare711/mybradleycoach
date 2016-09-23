"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActionHandler = function ActionHandler(type, reducer) {
  _classCallCheck(this, ActionHandler);

  this.type = type;
  this.reducer = reducer;
};

;

var handleActions = function handleActions(actionHandlers, state, action) {
  var newState = state;
  actionHandlers.filter(function (ah) {
    return ah.type === action.type;
  }).forEach(function (ah) {
    newState = ah.reducer(newState, action);
  });
  return newState;
};

exports.ActionHandler = ActionHandler;
exports.handleActions = handleActions;