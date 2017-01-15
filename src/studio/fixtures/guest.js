(function () {

  /**
   * Temporary mockup of guest while we figure how to build it and include it */

  window.parent.postMessage({
    topic: 2,
    data: {
      location: window.location.href,
      uri: window.location.href.replace(window.location.origin, '')
    }
  }, 'http://localhost:4200');

  // TODO not safe — for dev tests only!
  window.addEventListener("message", function (event) {
    var message = event.data;
    switch (message.topic) {
      case 5:
        window.location.reload();
        break;
      case 6:
        window.location.href = message.data;
        break;
      default:
        console.log('Unprocessed message received.', message);
    }
  }, false);

  console.log('Guest load...', window.location.href);

}) ();
