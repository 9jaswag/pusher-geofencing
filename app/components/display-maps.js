
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import Pusher from 'pusher-js';

export default Component.extend({

  allUsers: [].map(user => { // all users array
    return user;
  }),
  maps: service('maps'),

  init() {
    this._super(...arguments);
    let pusher = new Pusher('YOUR_APP_KEY', { // instantiate new Pusher client
      cluster: 'CLUSTER',
      encrypted: true
    });
    let users = this.get('allUsers'); // save the allUsers array to a variable
    const channel = pusher.subscribe('location'); // subscribe Pusher client to location channel
    channel.bind('checkin', data => {
      if (users.length == 0) { // if the allUsers array is empty
        users.pushObject(data.location) // add new data to users array
      } else { // if the allUsers array is not empty
        // check if user already exists before pushing
        const userIndex = this.userExists(users, data.location, 0)
        if (userIndex === false) { // if user was not found, means its a new user
          users.pushObject(data.location) // push the users info to the allUsers array
        } else {
          // replace the users previous object with new one if they exists
          users[userIndex] = data.location;
        }
      }
      this.get('maps').createMapElement(users); // create the map
    });
  },

  // Ember's didInsertElement life cycle hook
  didInsertElement() {
    this._super(...arguments);
    this.getAdminLocation(); // get the admins location
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
  },

  // function to get admin's location
  getAdminLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => { // get admin's location
        const { latitude, longitude } = position.coords;
        const adminLocation = { lat: latitude, lng: longitude };
        this.get('maps').createAdminMap(adminLocation); // call the createAdmin map from our service
      }, null, { enableHighAccuracy: true });
    }
  }

});
