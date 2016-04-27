
import {Subject} from 'rxjs/Subject';
import {Injectable, EventEmitter, Component, Input, OnInit} from 'angular2/core';

import {ContentItem} from "../classes/content-item";
import {ContentTypes} from "../classes/content-types";
import {Message, MessageScope, MessageTopic, Communicator} from "../classes/communicator";

@Injectable() export class CommunicationService extends Communicator {

    private _emitter: EventEmitter<Message>;

    constructor () {
        super();
        this._emitter = new EventEmitter<any>();
    }

    protected _processReceivedMessage(message) {
        this._emitter.emit(message);
    }

    subscribe(generatorOrNext) {
        return this._emitter.subscribe(generatorOrNext);
    }

    publish(topic:MessageTopic, data:any, scope:MessageScope = MessageScope.Broadcast) {
        let message = new Message(topic, data, scope);
        switch (message.scope) {
            case MessageScope.Local:
                this._emitter.emit(message);
                break;
            case MessageScope.External:
                super.publish(topic, data, scope);
                break;
            case MessageScope.Broadcast:
                this._emitter.emit(message);
                super.publish(topic, data, scope);
                break;
        }
    }

}
