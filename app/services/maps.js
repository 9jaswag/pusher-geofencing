import Service from '@ember/service';

const google = window.google;

export default Service.extend({

  init() {
    this._super(...arguments);
  },

  createMapElement() {
    const element = document.querySelector('#map');
    const rangeRadius = 500
    const center = { lat: 6.436914, lng: 3.451432 };
    const center2 = { lat: 6.4326345, lng: 3.4489972 }
    const center3 = { lat: 6.4357171, lng: 3.4492876 }
    let map = new google.maps.Map(element, { zoom: 16, center });
    // The marker, positioned at center
    // new google.maps.Marker({ position: center, map: map });
    // new google.maps.Marker({ position: center2, map: map, icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' });
    // new google.maps.Marker({ position: center3, map: map, icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' });
    this.addMarker(center, map)
    this.addMarker(center2, map, true)
    this.addMarker(center3, map, true)

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

    this.locationDistance(center, center3)

  },

  addMarker(center, map, icon = false) {
    if (icon) {
      icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    } else {
      icon = ""
    }
    new google.maps.Marker({ position: center, map: map, icon });
  },

  locationDistance(center1, center2) {
    const point1 = new google.maps.LatLng(center1.lat, center1.lng);
    const point2 = new google.maps.LatLng(center2.lat, center2.lng);

    const distance = google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
    console.log(distance)
  }

});
