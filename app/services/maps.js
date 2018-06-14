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

    // this.locationDistance(center, center3)

  },

  addMarker(center, map, icon = false) {
    if (icon) {
      icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    } else {
      icon = ""
    }
    let parsedCenter = {
      lat: parseFloat(center.lat),
      lng: parseFloat(center.lng)
    }
    new google.maps.Marker({ position: parsedCenter, map: map, icon });
  },

  addUsers() { },

  locationDistance(center1, center2) {
    const point1 = new google.maps.LatLng(center1.lat, center1.lng);
    const point2 = new google.maps.LatLng(center2.lat, center2.lng);

    const distance = google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
    console.log(distance)
  }

});
