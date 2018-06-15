Build a geofencing web app using Ember.js
------

A tutorial to showcase realtime functionality of Pusher Channels in Ember

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
```
PUSHER_APP_ID: 'your Pusher app ID'
PUSHER_APP_KEY: 'your pusher kep'
PUSHER_APP_SECRET: 'your pusher secret'
PUSHER_APP_CLUSTER: 'your pusher cluster'
```

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

Built With
------
- [Pusher](https://pusher.com) - A hosted service that makes it super-easy to add real-time data and functionality to web and mobile applications
- [Ember](https://www.emberjs.com/) - A framework for ambitious web developers.
