import Component from '@ember/component';

export default Component.extend({
  name: '',
  isCheckedIn: false,
  userId: '',

  actions: {
    checkin() {
      if (this.name.length > 0) {
        if ('geolocation' in navigator) {
          navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            const userDetail = { lat: latitude, lng: longitude, name: this.name, userId: this.userId };
            $.ajax({
              url: 'http://localhost:5000/check-in',
              type: 'post',
              data: userDetail
            }).then(response => {
              this.set('userId', response.userId);
            })
          }, null, { enableHighAccuracy: true });
          this.set('isCheckedIn', true);
        }
      } else {
        alert('Enter a name')
      }
    }
  }
});
