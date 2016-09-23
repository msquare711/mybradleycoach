'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = require('../shared/store/store');

var _redux = require('redux');

var _middleware = require('./middleware');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Room = function () {
  function Room(roomType) {
    var _this = this;

    _classCallCheck(this, Room);

    this.sparks = [];
    this.roomType = roomType;
    var sendActionsMiddlware = function sendActionsMiddlware() {
      return function (next) {
        return function (action) {
          var result = next(action);
          _this.send(result);
          return result;
        };
      };
    };
    var summaryMiddleware = (0, _redux.applyMiddleware)(_middleware.loggingMiddleware, sendActionsMiddlware);

    for (var _len = arguments.length, additionalMiddleware = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      additionalMiddleware[_key - 1] = arguments[_key];
    }

    var meetingMiddleware = _redux.applyMiddleware.apply(undefined, _toConsumableArray(_middleware.rejectMiddleware).concat(additionalMiddleware, [_middleware.loggingMiddleware, sendActionsMiddlware], _toConsumableArray(_middleware.cleanupMiddleware)));
    var middleware = roomType === 'summary' ? summaryMiddleware : meetingMiddleware;
    this.store = (0, _store.createStore)(middleware);
  }

  _createClass(Room, [{
    key: 'send',
    value: function send(action) {
      this.sparks.forEach(function (spark) {
        return spark.write(action);
      });
    }
  }, {
    key: 'dispatch',
    value: function dispatch(action) {
      return this.store.dispatch(action);
    }
  }, {
    key: 'addSpark',
    value: function addSpark(spark) {
      if (!spark) {
        return;
      }
      this.sparks = [].concat(_toConsumableArray(this.sparks), [spark]);
    }
  }, {
    key: 'removeSpark',
    value: function removeSpark(spark) {
      this.sparks = this.sparks.filter(function (currentSpark) {
        return currentSpark.id !== spark.id;
      });
    }
  }]);

  return Room;
}();

;

exports.default = Room;