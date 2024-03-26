// Importing events
const EventEmitter = require('events');

// Initializing event emitter instances 
var eventEmitter = new EventEmitter();

var fun1 = (msg) => {
	console.log("Message from fun1: " + msg);
};

var fun2 = (msg) => {
	console.log("Message from fun2: " + msg);
};

// Registering fun1 and fun2
eventEmitter.on('myEvent', fun1);
eventEmitter.on('myEvent', fun1);
eventEmitter.on('myEvent', fun2);

// Removing listener fun1 that was
// registered on the line 13
eventEmitter.removeListener('myEvent', fun1);

// Triggering myEvent
eventEmitter.emit('myEvent', "Event occurred");

// Removing all the listeners to myEvent
eventEmitter.removeAllListeners('myEvent');

// Triggering myEvent
eventEmitter.emit('myEvent', "Event occurred");
