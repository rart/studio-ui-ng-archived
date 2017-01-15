
import {Communicator, MessageTopic, MessageScope} from "../../common/communicator";

declare var amplify;

export class GuestCommunicator extends Communicator {

  constructor() {
    super();
  }

  protected _processReceivedMessage(data) {

    let scopedTopic = this._getScopedTopic(data.topic, data.scope);

    amplify.publish(`${MessageTopic.ALL}`, data.data);
    amplify.publish(`${data.topic}`, data.data);
    amplify.publish(scopedTopic, data.data);

  }

  private _getScopedTopic(topic: MessageTopic, scope?: MessageScope) {
    return scope ? `${scope}:${topic}` : `${topic}`;
  }

  subscribe(topic: MessageTopic, handler: Function, scope?: MessageScope) {
    let _topic = this._getScopedTopic(topic, scope);
    amplify.subscribe(_topic, handler);
  }

}
