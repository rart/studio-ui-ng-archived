
export enum MessageTopic {
  ContentItemClicked,
  ALL,
  GUEST_CHECK_IN,
  START_ICE,
  END_ICE,
  GUEST_RELOAD_REQUEST,
  GUEST_NAV_REQUEST
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

  protected _targets: Array<any> = [];
  protected _origins: Array<any> = [];

  constructor () {
    window.addEventListener("message", this._onMessage.bind(this), false);
  }

  /**
   * Process the message once the origin/source has been verified.
   * @param message: Message
   * @private
   */
  protected abstract _processReceivedMessage(message: Message);

  abstract subscribe(topic: MessageTopic, handler: Function, scope?: MessageScope);

  private _onMessage(event) {

    let {data, origin, source} = event;
    if (this.originAllowed(origin)) {
      this._processReceivedMessage(data);
    } else {
      console.log('Communicator: Message received from a disallowed origin.');
    }

  }

  addTarget(target) {
    this.removeTarget(target);
    this._targets.push(target);
  }

  removeTarget(target) {
    this._targets = this._targets.filter(function (item) {
      return item !== target;
    });
  }

  addOrigin(origin: string) {
    this.removeOrigin(origin);
    this._origins.push(origin);
  }

  removeOrigin(origin) {
    this._origins = this._origins.filter(function (item) {
      return item !== origin;
    });
  }

  publish(topic, data = null, scope = MessageScope.Broadcast) {
    let message = new Message(topic, data, scope);
    this._targets.forEach(function (target) {
      // TODO need to determine where to get the origin
      if (!target.postMessage) {
        target = target.contentWindow;
      }
      target.postMessage(message, '*');
    });
  }

  originAllowed(origin) : boolean {
    for (let origins = this._origins, i = 0, l = origins.length; i < l; ++i) {
      if (origins[i] === origin) {
        return true;
      }
    }
    return false;
  }

}
