/**
 * Skilltree model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Skilltree = require('./skilltree.model');
var SkilltreeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SkilltreeEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Skilltree.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SkilltreeEvents.emit(event + ':' + doc._id, doc);
    SkilltreeEvents.emit(event, doc);
  }
}

module.exports = SkilltreeEvents;
