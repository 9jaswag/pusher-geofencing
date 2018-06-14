import Service from '@ember/service';

const google = window.google;

export default Service.extend({

  init() {
    this._super(...arguments);
  },

  createMapElement() {
    const element = document.querySelector('#map');
    const center = { lat: 6.436914, lng: 3.451432 };
    let map = new google.maps.Map(element, { zoom: 16, center });
    // The marker, positioned at center
    new google.maps.Marker({ position: center, map: map });

    new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.2,
      strokeWeight: 1,
      fillColor: '#FF0000',
      fillOpacity: 0.1,
      map: map,
      center: center,
      radius: 500
    });
  }

});
