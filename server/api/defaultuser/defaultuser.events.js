/**
 * Defaultuser model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Defaultuser = require('./defaultuser.model');
var DefaultuserEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DefaultuserEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Defaultuser.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DefaultuserEvents.emit(event + ':' + doc._id, doc);
    DefaultuserEvents.emit(event, doc);
  }
}

module.exports = DefaultuserEvents;
