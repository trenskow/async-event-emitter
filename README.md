async-event-emitter
----

A small library for asynchronous event emitters.

# Usage

Below is an example on how to use.

````javascript
import EventEmitter from '@trenskow/async-event-emitter';

const emitter = new EventEmitter();

emmiter.on('greeting', async (text) => {
	console.info(text);
});

await emitter.emit('greeting', 'Hello, World!');
````

In the above example `Hello, World!` will be output to the console.

# License

See license in LICENSE

