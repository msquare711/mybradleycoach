'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createMeeting = function createMeeting(meetingName) {
  return {
    type: 'CREATE_MEETING',
    name: meetingName
  };
};

var filterMeetings = function filterMeetings(meetingFilter) {
  var filter = new RegExp(meetingFilter, 'ig');
  return {
    type: 'FILTER_MEETINGS',
    filter: filter
  };
};

var updateTopicTitle = function updateTopicTitle(newTopicTitle, oldTopicTitle) {
  return {
    type: 'UPDATE_TOPIC_TITLE',
    newTopicTitle: newTopicTitle,
    oldTopicTitle: oldTopicTitle
  };
};

var postTopic = function postTopic(topic, userName) {
  return {
    type: 'POST_TOPIC',
    title: topic,
    by: userName
  };
};

var changePhase = function changePhase() {
  var nextPhase = arguments.length <= 0 || arguments[0] === undefined ? 'submit' : arguments[0];

  return {
    type: 'SET_PHASE_' + nextPhase.toUpperCase(),
    phase: nextPhase
  };
};

var removeTopic = function removeTopic(topicId) {
  return {
    type: 'REMOVE_TOPIC',
    id: topicId
  };
};

var upVote = function upVote(topic, userId) {
  return {
    type: 'UP_VOTE',
    topic: topic,
    userId: userId
  };
};

var downVote = function downVote(topic, userId) {
  return {
    type: 'DOWN_VOTE',
    topic: topic,
    userId: userId
  };
};

var nextTopic = function nextTopic() {
  return {
    type: 'NEXT_TOPIC'
  };
};

var setHost = function setHost(participantId, isHost) {
  return {
    type: 'SET_HOST',
    isHost: isHost,
    id: participantId
  };
};

var setLocked = function setLocked(locked) {
  return {
    type: 'SET_LOCKED',
    locked: locked
  };
};

var setNewHosts = function setNewHosts(newHosts) {
  return {
    type: 'SET_NEW_HOSTS',
    newHosts: newHosts
  };
};

var joinMeeting = function joinMeeting(meeting) {
  var action = {
    type: 'JOIN_MEETING'
  };
  return Object.assign({}, action, meeting);
};

var addParticipant = function addParticipant(participant) {
  return {
    type: 'ADD_PARTICIPANT',
    participant: participant
  };
};

var removeParticipant = function removeParticipant(participantId) {
  return {
    type: 'REMOVE_PARTICIPANT',
    participantId: participantId
  };
};

var deleteMeeting = function deleteMeeting(meetingName) {
  return {
    type: 'DELETE_MEETING',
    name: meetingName
  };
};

var shrinkMeeting = function shrinkMeeting(meetingName) {
  return {
    type: 'SHRINK_MEETING',
    name: meetingName
  };
};

var growMeeting = function growMeeting(meetingName) {
  return {
    type: 'GROW_MEETING',
    name: meetingName
  };
};

var lockedOut = function lockedOut(isLockedOut) {
  return {
    type: 'LOCKED_OUT',
    lockedOut: isLockedOut
  };
};

var addKnocker = function addKnocker(id, message) {
  return {
    type: 'ADD_KNOCKER',
    id: id,
    message: message
  };
};

var approveKnocker = function approveKnocker(id) {
  return {
    type: 'APPROVE_KNOCKER',
    id: id
  };
};

var rejectKnocker = function rejectKnocker(id) {
  return {
    type: 'REJECT_KNOCKER',
    id: id
  };
};

var allowKnocking = function allowKnocking() {
  return {
    type: 'ALLOW_KNOCKING'
  };
};

var disableKnocking = function disableKnocking() {
  return {
    type: 'DISABLE_KNOCKING'
  };
};

var setRoomName = function setRoomName(roomName) {
  return {
    type: 'SET_ROOM_NAME',
    roomName: roomName
  };
};

exports.allowKnocking = allowKnocking;
exports.disableKnocking = disableKnocking;
exports.approveKnocker = approveKnocker;
exports.rejectKnocker = rejectKnocker;
exports.addKnocker = addKnocker;
exports.createMeeting = createMeeting;
exports.filterMeetings = filterMeetings;
exports.updateTopicTitle = updateTopicTitle;
exports.postTopic = postTopic;
exports.changePhase = changePhase;
exports.removeTopic = removeTopic;
exports.upVote = upVote;
exports.downVote = downVote;
exports.nextTopic = nextTopic;
exports.setHost = setHost;
exports.setLocked = setLocked;
exports.setNewHosts = setNewHosts;
exports.joinMeeting = joinMeeting;
exports.addParticipant = addParticipant;
exports.removeParticipant = removeParticipant;
exports.deleteMeeting = deleteMeeting;
exports.shrinkMeeting = shrinkMeeting;
exports.growMeeting = growMeeting;
exports.lockedOut = lockedOut;
exports.approveKnocker = approveKnocker;
exports.setRoomName = setRoomName;