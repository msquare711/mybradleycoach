'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeActionMiddleware = exports.afterActionMiddleware = exports.loggingMiddleware = undefined;

var _logger = require('../logger');

var loggingMiddleware = function loggingMiddleware(store) {
  return function (next) {
    return function (action) {
      var logger = (0, _logger.createLogger)('Middleware: Logging');
      logger.debug('Entering store', action, store.getState().locked);
      var result = next(action);
      logger.debug('Leaving store', result, store.getState().locked);
      return result;
    };
  };
};

var afterActionLogger = (0, _logger.createLogger)('Middleware: After Action');
var afterActionMiddleware = function afterActionMiddleware(actionType, callback) {
  return function (store) {
    return function (next) {
      return function (action) {
        afterActionLogger.debug('Entering');
        if (actionType === action.type) {
          afterActionLogger.debug('Action matched');
          var result = next(action);
          afterActionLogger.debug('Action dispatched');
          var newAction = callback(store, result);
          afterActionLogger.debug('Callback invoked. Result: ', newAction);
          return newAction;
        }
        afterActionLogger.debug('No match, continuing');
        return next(action);
      };
    };
  };
};

var beforeActionLogger = (0, _logger.createLogger)('Middleware: Before Action');
var beforeActionMiddleware = function beforeActionMiddleware(actionType, callback) {
  return function (store) {
    return function (next) {
      return function (action) {
        beforeActionLogger.debug('Entering');
        if (actionType === action.type) {
          beforeActionLogger.debug('Type matched, invoking callback', action.type);
          var newAction = callback(store, action);
          beforeActionLogger.debug('Callback complete. Result:', newAction);
          return next(newAction);
        }
        beforeActionLogger.debug('No match, continuing');
        return next(action);
      };
    };
  };
};

exports.loggingMiddleware = loggingMiddleware;
exports.afterActionMiddleware = afterActionMiddleware;
exports.beforeActionMiddleware = beforeActionMiddleware;