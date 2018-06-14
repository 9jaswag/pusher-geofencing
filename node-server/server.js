// server should not be here. It's just put here for convenience
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const uuid = require('uuid').v4;
require('dotenv').config()


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable cross-origin resource sharing
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const pusher = new Pusher({ // connect to pusher
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
});

app.get('/', function (req, res) { // to test if the server is running
  res.send({ success: true, message: 'server is online' });
});

app.post('/check-in', function (req, res) {
  let { lat, lng, name, userId } = req.body;
  if (lat && lng && name) {
    if (userId.length == 0) {
      console.log('set it')
      userId = uuid();
    } else {
      console.log('dont')
    }
    const location = { lat, lng, name };
    pusher.trigger('location', 'checkin', { location });
    res.send({ success: true, userId })
  } else {
    res.status(400).send({ success: false, message: 'text not broadcasted' })
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
