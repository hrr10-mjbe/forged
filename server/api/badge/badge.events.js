/**
 * Badge model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Badge = require('./badge.model');
var BadgeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BadgeEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Badge.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BadgeEvents.emit(event + ':' + doc._id, doc);
    BadgeEvents.emit(event, doc);
  }
}

module.exports = BadgeEvents;
