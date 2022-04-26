// Created 2022 by Kristian Trenskow
// See LICENSE for license.

import parallel from '@trenskow/parallel';

export default class EventEmitter {

	constructor() {
		this._nextIdentifier = -1;
		this._listeners = {};
	}

	on(event, handler) {
		this._listeners[event] = this._listeners[event] || [];
		this._listeners[event].push({
			handler,
			identifier: ++this._nextIdentifier
		});
		return this._nextIdentifier;
	}

	remove(event, identifier) {
		if (typeof this._listeners[event] === 'undefined') return;
		this._listeners[event] = this._listeners[event].filter((listener) => {
			return listener.handler === identifier || listener.identifier === identifier;
		});
	}

	once(event, handler) {
		const identifier = this.on(event, async (...args) => {
			this.remove(identifier);
			await handler(...args);
		});
	}

	async emit(event, ...args) {
		await parallel((this._listeners[event] || []).map(async (listener) => {
			await listener.handler(...args);
		}));
	}

}
