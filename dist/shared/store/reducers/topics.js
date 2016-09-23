'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHandler = require('../actionHandler');

var _utils = require('../utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialValue = [];
var deleteMeeting = new _actionHandler.ActionHandler('DELETE_MEETING', function () {
  return initialValue;
});
var joinMeeting = new _actionHandler.ActionHandler('JOIN_MEETING', function (topics, action) {
  return action.topics;
});

var postTopic = new _actionHandler.ActionHandler('POST_TOPIC', function (topics, action) {
  var title = action.title;
  var by = action.by;

  var votes = [];
  return [].concat(_toConsumableArray(topics), [{ title: title, by: by, votes: votes }]);
});

var updateTopicTitle = new _actionHandler.ActionHandler('UPDATE_TOPIC_TITLE', function (topics, action) {
  var oldTopic = topics.find(function (topic) {
    return topic.title === action.oldTopicTitle;
  });
  var newTopic = Object.assign({}, oldTopic, { title: action.newTopicTitle });
  return (0, _utils.replace)(topics, oldTopic, newTopic);
});

var removeTpoic = new _actionHandler.ActionHandler('REMOVE_TOPIC', function (topics, action) {
  return topics.filter(function (topic) {
    return topic.title !== action.id;
  });
});

var upVote = new _actionHandler.ActionHandler('UP_VOTE', function (topics, action) {
  var currentTopic = topics.find(function (topic) {
    return topic.title === action.topic.title;
  });
  var modifiedTopic = Object.assign({}, currentTopic, { votes: [].concat(_toConsumableArray(currentTopic.votes), [action.userId]) });
  return (0, _utils.replace)(topics, currentTopic, modifiedTopic);
});

var downVote = new _actionHandler.ActionHandler('DOWN_VOTE', function (topics, action) {
  var currentTopic = topics.find(function (topic) {
    return topic.title === action.topic.title;
  });
  var existingVotes = currentTopic.votes;
  var removalIndex = existingVotes.indexOf(action.userId);
  var newVotesList = [].concat(_toConsumableArray(existingVotes.slice(0, removalIndex)), _toConsumableArray(existingVotes.slice(removalIndex + 1, existingVotes.length)));
  var modifiedTopic = Object.assign({}, currentTopic, { votes: newVotesList });
  return (0, _utils.replace)(topics, currentTopic, modifiedTopic);
});

var discussPhase = new _actionHandler.ActionHandler('SET_PHASE_DISCUSS', function (topics) {
  if (topics.length === 0) {
    return topics;
  }
  var oldTopic = topics.find(function (topic) {
    return topic.current;
  });
  var newTopics = [].concat(_toConsumableArray(topics));
  newTopics.sort(function (l, r) {
    return r.votes.length - l.votes.length;
  });
  if (oldTopic) {
    var modifiedOldTopic = Object.assign({}, oldTopic, { current: false });
    newTopics = (0, _utils.replace)(topics, oldTopic, modifiedOldTopic);
  }
  var newCurrentTopic = newTopics[0];
  var modifiedCurrentTopic = Object.assign({}, newCurrentTopic, { current: true });
  return (0, _utils.replace)(newTopics, newCurrentTopic, modifiedCurrentTopic);
});

var nextTopic = new _actionHandler.ActionHandler('NEXT_TOPIC', function (topics) {
  var oldTopic = topics.find(function (topic) {
    return topic.current;
  });
  var newTopics = [].concat(_toConsumableArray(topics));
  if (oldTopic) {
    var modifiedOldTopic = Object.assign({}, oldTopic, { current: false });
    newTopics = (0, _utils.replace)(topics, oldTopic, modifiedOldTopic);
  }
  var indexOfOld = topics.indexOf(oldTopic);
  var newCurrentTopic = topics[indexOfOld + 1] || oldTopic;
  var modifiedCurrentTopic = Object.assign({}, newCurrentTopic, { current: true });
  return (0, _utils.replace)(newTopics, newCurrentTopic, modifiedCurrentTopic);
});

var actions = [joinMeeting, postTopic, updateTopicTitle, removeTpoic, upVote, downVote, discussPhase, nextTopic, deleteMeeting];

var topicReducer = function topicReducer() {
  var topics = arguments.length <= 0 || arguments[0] === undefined ? initialValue : arguments[0];
  var action = arguments[1];

  var newTopics = (0, _actionHandler.handleActions)(actions, topics, action);
  topics.forEach(function (topic) {
    return Object.freeze(topic);
  });
  Object.freeze(newTopics);
  return newTopics;
};

exports.default = topicReducer;