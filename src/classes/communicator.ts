
export enum MessageTopic {
    ALL,
    GUEST_CHECK_IN,
    START_ICE,
    END_ICE
}

export enum MessageScope {
    Local,
    External,
    Broadcast
}

export class Message {

    constructor (public topic: MessageTopic,
                 public data: any,
                 public scope: MessageScope = MessageScope.Broadcast) {}

}

export abstract class Communicator {

    protected _targets = [];
    protected _origins = [];

    constructor () {
        window.addEventListener("message", this._onMessage.bind(this), false);
    }

    private _onMessage(event) {

        let {data, origin, source} = event;
        if (!this.originAllowed(origin)) return;

        this._processReceivedMessage(data);

    }

    /**
     * Process the message once the origin/source has been verified.
     * @param message: Message
     * @private
     */
    protected abstract _processReceivedMessage(message: Message);

    addTarget(target) {
        this.removeTarget(target);
        this._targets.push(target);
    }

    removeTarget(target) {
        this._targets = this._targets.filter(function (item) {
            return item !== target;
        });
    }

    addOrigin(origin) {
        this.removeOrigin(origin);
        this._origins.push(origin);
    }

    removeOrigin(origin) {
        this._origins = this._origins.filter(function (item) {
            return item !== origin;
        });
    }

    publish(topic, data, scope = MessageScope.Broadcast) {
        let message = new Message(topic, data, scope);
        this._targets.forEach(function (target) {
            // TODO need to determine where to get the origin
            target.window.postMessage(message, '*');
        });
    }

    abstract subscribe(topic: MessageTopic, handler: Function, scope?: MessageScope);

    originAllowed(origin) : boolean {
        for (let origins = this._origins, i = 0, l = origins.length; i < l; ++i) {
            if (origins[i] === origin) {
                return true;
            }
        }
        return false;
    }

}
