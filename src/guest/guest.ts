import "node_modules/node-amplifyjs/lib/amplify.core.js";
import {MessageScope, MessageTopic} from "../classes/communicator";
import {GuestCommunicator} from "../classes/guest-communicator";

export function bootstrap() {

    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }

    let origin = window.location.origin;
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
