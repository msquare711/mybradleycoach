'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('../logger');

var _actions = require('../../shared/actions');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deleteOnLockedAndEmpty = function deleteOnLockedAndEmpty(_ref) {
  var getState = _ref.getState;
  var dispatch = _ref.dispatch;
  return function (next) {
    return function (action) {
      var logger = (0, _logger.createLogger)('Middleware: Cleanup Locked & Empty');
      logger.debug('Checking locked and empty');

      var _getState = getState();

      var roomName = _getState.roomName;

      var result = next(action);
      var updatedState = getState();
      if (updatedState.locked && _lodash2.default.isEmpty(updatedState.participants)) {
        logger.warn('Everyone left the locked meeting ' + roomName + '. Cleaning it up');
        dispatch((0, _actions.deleteMeeting)());
      }
      return result;
    };
  };
};

var allowHostsIfNone = function allowHostsIfNone(_ref2) {
  var getState = _ref2.getState;
  var dispatch = _ref2.dispatch;
  return function (next) {
    return function (action) {
      var logger = (0, _logger.createLogger)('Middleware: Reset Allow Hosts');
      logger.debug('Checking for no hosts and no new hosts allowed');
      var result = next(action);
      var updatedState = getState();
      var hosts = updatedState.participants.filter(function (participant) {
        return participant.host;
      });
      logger.debug('Are hosts allowed: ' + updatedState.newHosts + ' Are there any hosts: ' + _lodash2.default.isEmpty(hosts));
      if (!updatedState.newHosts && _lodash2.default.isEmpty(hosts)) {
        logger.info('There were no hosts, and new hosts were not allowed, so new hosts were unlocked');
        dispatch((0, _actions.setNewHosts)(true));
      }
      return result;
    };
  };
};

var cleanupMiddleware = [deleteOnLockedAndEmpty, allowHostsIfNone];
exports.default = cleanupMiddleware;