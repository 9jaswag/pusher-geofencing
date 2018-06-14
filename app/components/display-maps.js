import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  maps: service('maps'),
  didInsertElement() {
    this._super(...arguments);
    this.get('maps').createMapElement();
  }
});
