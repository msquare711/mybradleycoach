"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var findUser = function findUser(_ref) {
  var participants = _ref.participants;
  var userId = _ref.userId;

  return participants.find(function (p) {
    return p.id === userId;
  });
};

var isUserHost = function isUserHost(_ref2) {
  var participants = _ref2.participants;
  var userId = _ref2.userId;

  var user = findUser({ participants: participants, userId: userId });
  return user ? user.host : false;
};

var replace = function replace(array, oldItem, newItem) {
  var itemIndex = array.indexOf(oldItem);
  return [].concat(_toConsumableArray(array.slice(0, itemIndex)), [newItem], _toConsumableArray(array.slice(itemIndex + 1, array.length)));
};

exports.findUser = findUser;
exports.isUserHost = isUserHost;
exports.replace = replace;