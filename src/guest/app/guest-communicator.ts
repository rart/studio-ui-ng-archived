
import {Amplify} from "./amplify";
import {Communicator, MessageTopic, MessageScope} from "../../studio/app/classes/communicator";

export class GuestCommunicator extends Communicator {

  constructor() {
    super();
  }

  protected _processReceivedMessage(data) {

    let scopedTopic = this._getScopedTopic(data.topic, data.scope);

    Amplify.publish(`${MessageTopic.ALL}`, data.data);
    Amplify.publish(`${data.topic}`, data.data);
    Amplify.publish(scopedTopic, data.data);

  }

  private _getScopedTopic(topic: MessageTopic, scope?: MessageScope) {
    return scope ? `${scope}:${topic}` : `${topic}`;
  }

  subscribe(topic: MessageTopic, handler: Function, scope?: MessageScope) {
    let _topic = this._getScopedTopic(topic, scope);
    Amplify.subscribe(_topic, handler);
  }

}
