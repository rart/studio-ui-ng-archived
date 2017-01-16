
import "../../../node_modules/jquery/dist/jquery.js";
import {MessageTopic} from "../../studio/app/classes/communicator";
import {GuestCommunicator} from "./guest-communicator";

declare var $: any;
declare function require(name: string): any;

const CSS = require("./guest.scss");

export function crafterStudioGuestBootstrap() {

  $(`<style>${CSS}</style>`).appendTo('head');

  let protocol = window.location.protocol;
  let hostname = window.location.hostname;
  let port = (window.location.port ? `:${window.location.port}` : '');

  let origin = window.location.origin || `${protocol}//${hostname}${port}`;
  let communicator = new GuestCommunicator();

  communicator.addOrigin(origin);
  communicator.addTarget(window.parent);

  // Notify Studio of successful website load...
  console.debug(`Guest Loaded @ ${window.location.href}`);
  communicator.publish(MessageTopic.GUEST_CHECK_IN, {
    location: window.location.href,
    url: window.location.href.replace(window.location.origin, '')
  });

  communicator.subscribe(MessageTopic.START_ICE, function (message) {
    console.log('Ice Start Requested', message);
  });

  communicator.subscribe(MessageTopic.GUEST_RELOAD_REQUEST, function () {
    window.location.reload();
  });

  communicator.subscribe(MessageTopic.GUEST_NAV_REQUEST, function (message) {
    window.location.href = message;
  });

}
