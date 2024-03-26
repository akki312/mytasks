// Importing events
const EventEmitter = require('events');

// Initializing event emitter instances 
var eventEmitter = new EventEmitter();

// Declaring listener fun1 to myEvent1
var fun1 = (msg) => {
	console.log("Message from fun1: " + msg);
};

// Declaring listener fun2 to myEvent2
var fun2 = (msg) => {
	console.log("Message from fun2: " + msg);
};

// Listening to myEvent with fun1 and fun2
eventEmitter.addListener('myEvent', fun1);

// fun2 will be inserted in front of listeners array
eventEmitter.prependListener('myEvent', fun2);

// Listing listeners
console.log(eventEmitter.listeners('myEvent'));

// Count the listeners registered to myEvent
console.log(eventEmitter.listenerCount('myEvent'));

// Triggering myEvent
eventEmitter.emit('myEvent', 'Event occurred');
