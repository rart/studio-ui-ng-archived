/*!
 * Ported from...
 *
 * Amplify Core 1.1.2
 *
 * Copyright 2011 - 2013 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 *
 * http://amplifyjs.com
 */

const slice = [].slice,
      subscriptions = {};

export class Amplify {

  static publish( topic: string, ...params ) {

    var args = slice.call( arguments, 1 ),
      topicSubscriptions,
      subscription,
      length,
      i = 0,
      ret;

    if ( !subscriptions[ topic ] ) {
      return true;
    }

    topicSubscriptions = subscriptions[ topic ].slice();
    for ( length = topicSubscriptions.length; i < length; i++ ) {
      subscription = topicSubscriptions[ i ];
      ret = subscription.callback.apply( subscription.context, args );
      if ( ret === false ) {
        break;
      }
    }
    return ret !== false;
  }

  static subscribe( topic:string, context, callback?, priority? ) {

    if ( arguments.length === 3 && typeof callback === "number" ) {
      priority = callback;
      callback = context;
      context = null;
    }
    if ( arguments.length === 2 ) {
      callback = context;
      context = null;
    }
    priority = priority || 10;

    var topicIndex = 0,
      topics = topic.split( /\s/ ),
      topicLength = topics.length,
      added;
    for ( ; topicIndex < topicLength; topicIndex++ ) {
      topic = topics[ topicIndex ];
      added = false;
      if ( !subscriptions[ topic ] ) {
        subscriptions[ topic ] = [];
      }

      var i = subscriptions[ topic ].length - 1,
        subscriptionInfo = {
          callback: callback,
          context: context,
          priority: priority
        };

      for ( ; i >= 0; i-- ) {
        if ( subscriptions[ topic ][ i ].priority <= priority ) {
          subscriptions[ topic ].splice( i + 1, 0, subscriptionInfo );
          added = true;
          break;
        }
      }

      if ( !added ) {
        subscriptions[ topic ].unshift( subscriptionInfo );
      }
    }

    return callback;
  }

  static unsubscribe( topic: string, context, callback ) {

    if ( arguments.length === 2 ) {
      callback = context;
      context = null;
    }

    if ( !subscriptions[ topic ] ) {
      return;
    }

    var length = subscriptions[ topic ].length,
      i = 0;

    for ( ; i < length; i++ ) {
      if ( subscriptions[ topic ][ i ].callback === callback ) {
        if ( !context || subscriptions[ topic ][ i ].context === context ) {
          subscriptions[ topic ].splice( i, 1 );

          // Adjust counter and length for removed item
          i--;
          length--;
        }
      }
    }
  }

}
