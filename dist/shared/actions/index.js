'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var saveContraction = function saveContraction(startTime, endTime) {
  return {
    type: 'SAVE_CONTRACTION',
    startTime: startTime,
    endTime: endTime
  };
};

var allowKnocking = function allowKnocking() {
  return {
    type: 'ALLOW_KNOCKING'
  };
};

exports.allowKnocking = allowKnocking;
exports.saveContraction = saveContraction;