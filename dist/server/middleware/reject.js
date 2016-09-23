'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('../logger');

var logger = (0, _logger.createLogger)('Middleware: Reject');

var rejectIfNotPhase = function rejectIfNotPhase(phase, actionType) {
  return function (store) {
    return function (next) {
      return function (action) {
        logger.debug('Enter');
        var isPhase = store.getState().phase === phase;
        if (!isPhase && action.type === actionType) {
          logger.warn('Rejected Action ' + action.type + ' from ' + action.userId);
          //Eat the action, its not allowed in this phase
          return next({ type: 'DO_NOTHING' });
        }
        logger.debug('Allowed action');
        return next(action);
      };
    };
  };
};

var rejectIfNotHost = function rejectIfNotHost(hostActionTypes) {
  return function (store) {
    return function (next) {
      return function (action) {
        logger.debug('Entering', store.getState().participants);
        var currentUser = store.getState().participants.find(function (participant) {
          return participant.id === action.userId;
        });
        logger.debug('Current user', currentUser);
        var userIsHost = currentUser && currentUser.host;
        logger.debug('Is host', userIsHost);
        if (hostActionTypes.includes(action.type) && !userIsHost) {
          logger.warn('Rejected action ' + action.type + ' from ' + action.userId);
          return next({ type: 'DO_NOTHING' });
        }
        logger.debug('Allowed action', action.type);
        return next(action);
      };
    };
  };
};

var rejectIfNotHostUnlessNoHosts = function rejectIfNotHostUnlessNoHosts(hostActionTypes) {
  return function (store) {
    return function (next) {
      return function (action) {
        logger.debug('Entering', store.getState().participants);
        var currentUser = store.getState().participants.find(function (participant) {
          return participant.id === action.userId;
        });
        logger.debug('Current user', currentUser);
        var userIsHost = currentUser && currentUser.host;
        logger.debug('Is host', userIsHost);
        var atLeastOneHost = store.getState().participants.find(function (participant) {
          return participant.host;
        });
        if (hostActionTypes.includes(action.type) && !userIsHost && atLeastOneHost) {
          logger.warn('Rejected action ' + action.type + ' from ' + action.userId);
          return next({ type: 'DO_NOTHING' });
        }
        logger.debug('Allowed action', action.type);
        return next(action);
      };
    };
  };
};

var rejectTopics = rejectIfNotPhase('submit', 'POST_TOPIC');
var rejectUpVotes = rejectIfNotPhase('vote', 'UP_VOTE');
var rejectDownVotes = rejectIfNotPhase('vote', 'DOWN_VOTE');
var rejectDelete = rejectIfNotPhase('merge', 'REMOVE_TOPIC');
var rejectNextTopic = rejectIfNotPhase('discuss', 'NEXT_TOPIC');
var rejectWhenNotHost = rejectIfNotHost(['SET_PHASE_MERGE', 'SET_PHASE_DISCUSS', 'SET_PHASE_COMPLETE', 'REMOVE_TOPIC', 'NEXT_TOPIC', 'SET_LOCKED', 'APPROVE_KNOCKER', 'REJECT_KNOCKER', 'ALLOW_KNOCKING', 'DISABLE_KNOCKING']);
var rejectWhenNotHostUnlessNone = rejectIfNotHostUnlessNoHosts(['SET_NEW_HOSTS', 'DELETE_MEETING']);
var rejectMiddleware = [rejectWhenNotHost, rejectWhenNotHostUnlessNone, rejectTopics, rejectUpVotes, rejectDownVotes, rejectDelete, rejectNextTopic];

exports.default = rejectMiddleware;