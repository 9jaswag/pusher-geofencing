
import Component from '@ember/component';
import { run } from '@ember/runloop';
import $ from 'jquery';

export default Component.extend({
  name: '', // user's name
  isCheckedIn: false, // check if the user is checked in
  userId: '', // user's userId

  // component actions
  actions: {
    // action that is run when the button is clicked
    checkin() {
      if (this.name.length > 0) { // if there is a name
        if ('geolocation' in navigator) {
          navigator.geolocation.watchPosition((position) => { // get user location
            const { latitude, longitude } = position.coords;
            const userDetail = { lat: latitude, lng: longitude, name: this.name, userId: this.userId };
            $.ajax({ // send user data via an AJAX call
              url: 'http://localhost:5000/check-in',
              type: 'post',
              data: userDetail
            }).then(response => {
              run(() => {
                this.set('userId', response.userId);
              });
            })
          }, null, { enableHighAccuracy: true });
          this.set('isCheckedIn', true); // set isCheckedIn to true
        }
      } else {
        alert('Enter a name') // if there's no name show this alert
      }
    }
  }
});
