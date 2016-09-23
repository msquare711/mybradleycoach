'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLogger = undefined;

var _pino = require('pino');

var _pino2 = _interopRequireDefault(_pino);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLogger = function createLogger(loggerName, level) {
  return (0, _pino2.default)({
    name: loggerName,
    level: level || 'warn'
  });
};
exports.default = createLogger();
exports.createLogger = createLogger;