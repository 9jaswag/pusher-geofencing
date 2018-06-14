import Component from '@ember/component';

export default Component.extend({
  name: '',
  isCheckedIn: false,

  actions: {
    checkin() {
      if (this.name.length > 0) {
        if ('geolocation' in navigator) {
          navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords
            const userDetail = { lat: latitude, lng: longitude, name: this.name }
            console.log(userDetail);
            $.ajax({
              url: 'http://localhost:5000',
              type: 'post',
              data: userDetail
            })
          });
          this.set('isCheckedIn', true);
        }
      } else {
        console.log('Enter a name')
      }
    }
  }
});
