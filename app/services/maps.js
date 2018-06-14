import Service from '@ember/service';

const google = window.google;

export default Service.extend({

  createMapElement(locations) {
    const element = document.querySelector('#map');
    const rangeRadius = 500
    const center = { lat: 6.436914, lng: 3.451432 };
    let map = new google.maps.Map(element, { zoom: 16, center });
    // The marker, positioned at center
    this.addMarker(center, map)
    locations.forEach(location => {
      this.addMarker(location, map, true)
    })

    new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.2,
      strokeWeight: 1,
      fillColor: '#FF0000',
      fillOpacity: 0.1,
      map: map,
      center: center,
      radius: rangeRadius
    });
  },

  addMarker(center, map, icon = false) {
    if (icon) {
      icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    } else {
      icon = ""
    }
    let parsedCenter = {
      lat: parseFloat(center.lat),
      lng: parseFloat(center.lng),
      name: center.name,
      userId: center.userId
    }
    new google.maps.Marker({ position: parsedCenter, map: map, icon });
    this.addUserWithinRange(parsedCenter);
  },

  addUserWithinRange(userLocation) {
    if (userLocation.name) {
      let userDistance = this.locationDistance(userLocation);
      let existingUser = $('div').find('[data-id="' + userLocation.userId + '"]'); // find the user on the page via the data-id attribute
      if (userDistance < 500) { // if the user is within the range
        if (!existingUser[0]) { // if the user is not already displayed on the page
          let div = document.createElement('div');
          div.className = 'available-user';
          div.dataset.id = userLocation.userId;
          let span = document.createElement('span');
          span.className = 'text-white';
          let username = `@${userLocation.name}`
          span.append(username);
          div.append(span);
          const usersDiv = document.querySelector('.users');
          usersDiv.append(div);
        }
      } else {
        existingUser.remove();
      }
    }
  },

  locationDistance(userLocation) {
    const targetLocation = { lat: 6.436914, lng: 3.451432 };
    const point1 = new google.maps.LatLng(targetLocation.lat, targetLocation.lng);
    const point2 = new google.maps.LatLng(userLocation.lat, userLocation.lng);

    const distance = google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
    return distance;
  }

});
