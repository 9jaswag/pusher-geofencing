import Component from '@ember/component';
import { inject as service } from '@ember/service';
import Pusher from 'pusher-js';

export default Component.extend({
  maps: service('maps'),
  init() {
    this._super(...arguments)
    Pusher.logToConsole = true;
    let pusher = new Pusher('YOUR_APP_KEY', {
      cluster: 'CLUSTER',
      encrypted: true
    });

    const channel = pusher.subscribe('location');
    channel.bind('checkin', data => {
      console.log(data)
      // this.get('messages').pushObject(response);
    });
  },
  didInsertElement() {
    this._super(...arguments);
    this.get('maps').createMapElement();
  }
});
