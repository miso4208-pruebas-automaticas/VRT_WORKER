const express = require('express');
var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient()
var apk = '../../vendor/calendula.apk'
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.options('*', cors());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var http = require('http');
var server = http.createServer(app);
server.listen(8080, '0.0.0.0');
server.on('listening', function() {
   console.log('Express server started on port %s at %s at %s', server.address().port, server.address().address,process.env.HOST);
});


client.listDevices()
  .then(function(devices) {
    return Promise.map(devices, function(device) {
      return client.install(device.id, apk)
    })
  })
  .then(function() {
    console.log('Installed %s on all connected devices', apk)
  })
  .catch(function(err) {
    console.error('Something went wrong:', err.stack)
  })