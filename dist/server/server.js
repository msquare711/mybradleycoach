'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServer = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _primus = require('primus');

var _primus2 = _interopRequireDefault(_primus);

var _actions = require('../shared/actions');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _room = require('./room');

var _room2 = _interopRequireDefault(_room);

var _middleware = require('./middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createServer = function createServer() {
  var app = (0, _express2.default)();
  var server = (0, _http.createServer)(app);

  app.use('/', _express2.default.static('assets'));

  var primus = new _primus2.default(server, {
    transformer: 'engine.io'
  });

  var meetingsRoom = new _room2.default();
  var rooms = {};

  var addUserToMeeting = function addUserToMeeting(spark, room) {
    var _room$store$getState = room.store.getState();

    var roomName = _room$store$getState.roomName;

    var remainingNames = room.store.getState().participants.map(function (p) {
      return p.name;
    });

    var participant = {
      name: (0, _utils2.default)(remainingNames, spark.id),
      id: spark.id,
      host: false
    };

    meetingsRoom.dispatch((0, _actions.growMeeting)(roomName));
    room.addSpark(spark);
    room.dispatch((0, _actions.addParticipant)(participant));

    spark.write((0, _actions.joinMeeting)(room.store.getState()));
  };

  primus.on('disconnection', function (spark) {
    if (spark.query.room) {
      var roomForUser = _lodash2.default.find(rooms, function (room) {
        return room.store.getState().participants.find(function (p) {
          return p.id === spark.id;
        });
      });
      if (roomForUser) {
        roomForUser.dispatch((0, _actions.removeParticipant)(spark.id));
        roomForUser.removeSpark(spark);
        meetingsRoom.dispatch((0, _actions.shrinkMeeting)(roomForUser.store.getState().roomName));
      }
    }
    if (spark.query.meetings) {
      meetingsRoom.removeSpark(spark);
    }
  });

  primus.on('connection', function (spark) {
    if (spark.query.meetings) {
      meetingsRoom.addSpark(spark);
      var setMeetings = { type: 'SET_MEETINGS', meetings: meetingsRoom.store.getState().meetings };
      spark.write(setMeetings);
      return;
    }
    if (spark.query.room) {
      var _ret = function () {
        var roomName = spark.query.room;
        var deleteRoomMiddleware = (0, _middleware.afterActionMiddleware)('DELETE_MEETING', function (store, action) {
          meetingsRoom.dispatch((0, _actions.deleteMeeting)(roomName));
          delete rooms[roomName];
          return action;
        });
        if (!rooms[roomName]) {
          rooms[roomName] = new _room2.default(undefined, deleteRoomMiddleware);
          rooms[roomName].store.dispatch((0, _actions.setRoomName)(roomName));
          meetingsRoom.dispatch((0, _actions.createMeeting)(roomName));
        }
        var currentRoom = rooms[roomName];
        var currentStore = currentRoom.store;

        var attachEvents = function attachEvents(sparkToAttach) {
          sparkToAttach.on('data', function (action) {
            action.userId = spark.id;
            currentRoom.dispatch(action);
            if (action.type === 'APPROVE_KNOCKER') {
              var findSpark = primus.spark(action.id);
              if (findSpark) {
                findSpark.write((0, _actions.lockedOut)(false));
                addUserToMeeting(findSpark, currentRoom);
              }
            }
            if (action.type === 'REJECT_KNOCKER') {
              var _findSpark = primus.spark(action.id);
              _findSpark && _findSpark.write((0, _actions.deleteMeeting)());
            }
          });
        };
        //Probably not how we want to handle this.
        attachEvents(spark);
        if (currentStore.getState().locked) {
          var allowKnockingAction = currentStore.getState().allowKnocking ? (0, _actions.allowKnocking)() : (0, _actions.disableKnocking)();
          spark.write(allowKnockingAction);
          return {
            v: spark.write((0, _actions.lockedOut)(true))
          };
        }

        addUserToMeeting(spark, currentRoom);
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  });

  app.get(/^(?!primus).+/, function (req, res) {
    return res.sendFile(process.cwd() + '/assets/index.html');
  });

  return server;
};

exports.createServer = createServer;