import {Injectable, EventEmitter} from 'angular2/core';

import {Injectable} from "angular2/core";
import {ContentItem} from "../classes/content-item";
import {ContentTypes} from "../classes/content-types";

export enum MessageScope {
    Local,
    Remote,
    External,
    Broadcast
}

export class Message {
    data: Object;
    scope: MessageScope;
}

@Injectable() export class CommunicationService {

    private _emitter: EventEmitter<Message>;

    local: EventEmitter<Message>;
    remote: EventEmitter<Message>;
    broadcast: EventEmitter<Message>;

    constructor () {
        window.addEventListener("message", this._onMessage.bind(this), false);
    }

    private _onMessage(event) {
        let {data, origin, source} = event;
        // if (origin !== '') return;
    }

}
