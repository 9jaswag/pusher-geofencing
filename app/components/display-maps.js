import Component from '@ember/component';
import { inject as service } from '@ember/service';
import Pusher from 'pusher-js';

export default Component.extend({

  allUsers: [].map(user => {
    return user;
  }),
  maps: service('maps'),

  init() {
    this._super(...arguments);
    let pusher = new Pusher('YOUR_APP_KEY', {
      cluster: 'CLUSTER',
      encrypted: true
    });
    let users = this.get('allUsers');

    const channel = pusher.subscribe('location'); // subscribe Pusher client to location channel
    channel.bind('checkin', data => {
      if (users.length == 0) {
        users.pushObject(data.location) // add new data to users array
      } else {
        // check if user already exists before pushing
        const userIndex = this.userExists(users, data.location, 0)
        if (userIndex === false) { // if user was not found, means its a new user
          users.pushObject(data.location)
        } else {
          // replace the users previous objeect with new one if he exists
          users[userIndex] = data.location;
        }
      }
      this.get('maps').createMapElement(users);
    });
  },

  didInsertElement() {
    this._super(...arguments);
    this.get('maps').createMapElement(this.get('allUsers'));
  },

  // recursive function to check if a user already exixts
  userExists(users, user, index) {
    if (index == users.length) {
      return false;
    }

    if (users[index].userId === user.userId) {
      return index;
    } else {
      return this.userExists(users, user, index + 1);
    }
  }

});
