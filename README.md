Build a geofencing web app using Ember.js
------

A tutorial to showcase realtime functionality of Pusher Channels in Ember

[View tutorial](https://pusher.com/tutorials/geofencing-ember)

## Prerequisites

A basic knowledge of JavaScript.

You will also need the following things properly installed on your computer.

* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)

## Installation

* `git clone https://github.com/9jaswag/pusher-geofencing.git` this repository
* `cd pusher-geofencing`
* `npm install`

#### Setup Env variables

- Create a `.env` file in the `node-server` directory and add the following to it:
```sh
PUSHER_APP_ID: 'your Pusher app ID'
PUSHER_APP_KEY: 'your Pusher app key'
PUSHER_APP_SECRET: 'your Pusher app secret'
PUSHER_APP_CLUSTER: 'your Pusher app cluster'
```
Replace the constants above with your Pusher credentials.
- Open the `index.html` file and add your Google Maps API key
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry"></script>
```
- Add your Pusher credentials in `app/components/display-maps.js`
```javascript
let pusher = new Pusher('YOUR_APP_KEY', {
  cluster: 'CLUSTER',
  encrypted: true
});
```

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

Built With
------
- [Pusher](https://pusher.com) - A hosted service that makes it super-easy to add real-time data and functionality to web and mobile applications
- [Ember](https://www.emberjs.com/) - A framework for ambitious web developers.
