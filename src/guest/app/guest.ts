import "node_modules/node-amplifyjs/lib/amplify.core.js";
import {MessageScope, MessageTopic} from "../../common/communicator";
import {GuestCommunicator} from "./guest-communicator";

export function bootstrap() {

  let protocol = window.location.protocol;
  let hostname = window.location.hostname;
  let port = (window.location.port ? `:${window.location.port}` : '');

  let origin = window.location.origin || `${protocol}//${hostname}${port}`;
  let communicator = new GuestCommunicator();

  communicator.addOrigin(origin);
  communicator.addTarget(window.parent);

  communicator.publish(MessageTopic.GUEST_CHECK_IN, {
    location: window.location.href,
    url: window.location.href.replace(window.location.origin, '')
  });

  communicator.subscribe(MessageTopic.START_ICE, function (message) {
    console.log('Ice Start Requested', message);
  });

}
