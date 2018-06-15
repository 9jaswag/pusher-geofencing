import Service from '@ember/service';

const google = window.google;
const targetLocation = { lat: 6.436914, lng: 3.451432 };
const rangeRadius = 500;

export default Service.extend({

  createMapElement(usersLocation) {
    const element = document.querySelector('#map');
    let map = new google.maps.Map(element, { zoom: 16, center: targetLocation }); // generate a map
    // The marker, positioned at center
    this.addMarker(targetLocation, map) // add marker fot the target location
    usersLocation.forEach(location => { // loop through the location of available users
      // add markers for other available users
      this.addMarker(location, map, true)
    })

    new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.2,
      strokeWeight: 1,
      fillColor: '#FF0000',
      fillOpacity: 0.1,
      map: map,
      center: targetLocation,
      radius: rangeRadius
    });
  },

  // function to add a marker on the map
  addMarker(userLocation, map, icon = false) {
    if (icon) {
      icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    } else {
      icon = ""
    }
    let parsedUserLocation = {
      lat: parseFloat(userLocation.lat), // parse the string to a float
      lng: parseFloat(userLocation.lng),
      name: userLocation.name,
      userId: userLocation.userId
    }
    new google.maps.Marker({ position: parsedUserLocation, map, icon });
    this.addUserWithinRange(parsedUserLocation); // add users to the sidebar
  },

  addUserWithinRange(userLocation) {
    if (userLocation.name) {
      let userDistance = this.locationDistance(userLocation); // check the distance between the user and the target location
      let existingUser = $('div').find(`[data-id="${userLocation.userId}"]`); // find the user on the page via the data-id attribute
      if (userDistance < rangeRadius) { // if the user is within the range
        if (!existingUser[0]) { // if the user is not already displayed on the page
          let div = document.createElement('div'); // create a div element
          div.className = 'available-user';
          div.dataset.id = userLocation.userId;
          let span = document.createElement('span'); // create a span element
          span.className = 'text-white';
          let username = `@${userLocation.name}`
          span.append(username);
          div.append(span);
          const usersDiv = document.querySelector('.users');
          usersDiv.append(div); // add the user to the page
        }
      } else {
        existingUser.remove(); // remove the user from the page is they're out of range
      }
    }
  },

  locationDistance(userLocation) {
    const point1 = new google.maps.LatLng(targetLocation.lat, targetLocation.lng);
    const point2 = new google.maps.LatLng(userLocation.lat, userLocation.lng);

    const distance = google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
    return distance;
  }

});
