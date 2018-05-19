const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const axios = require('axios');
var async = require('async')
const nmap = require('libnmap');
var arp = require('node-arp');
const find = require('local-devices')

const app = express();

// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
  res.send("hello world")

  // googleTrends.interestOverTime(optionsObject).then(function(data) {
  //  res.send(data)
  //  }
  // )
});


app.get('/fire', function (req, res) {
  if (!('target' in req.query)) {
    res.status(400).send("No target specificed")
    return
  }

  var target = req.query.target
  console.log("Firing with target: " + target)

  axios.get('http://192.168.1.68:5000', {
    params: {
      target: target
    }
  })
  .then(function(response) {
    res.send("Fired " + target)
    // res.send(response.data)
  })
  .catch(function(error) {
    console.log(error);
    res.send("Target " + target + " not connected")
  })

})

app.get('/discover', function (req, res) {
  console.log('Discovering')
  nmap.discover(function(err, report) {
    if (err) {
      throw new Error(err);
      res.send("Discover failed")
    }
   
    console.log("Discovered")
    for (let item in report) {
      console.log(JSON.stringify(report[item]));
    }
    res.send(report)
  });
})

app.get('/arp', function (req, res) {

  arp.getMAC('192.168.1.68', function(err, mac) {
      if (!err) {
          console.log(mac);
          res.send(mac)
      }
      else {
        res.status(500).send("Scan failed")
      }

  });
})

app.get('/scan', function (req, res) {
  find().then(function (devices) {
    console.log(devices) 
    res.send(devices)
  }).catch(function(error) {
    res.send(500).send("Scanning error")
  })
})

app.get('/scan_old', function (req, res) {
  const opts = {
    range: ['192.168.1.0-255'],
    ports: '5000,6969',
    timeout: 1,
    verbose: true
  };
 
  nmap.scan(opts, function(err, report) {
    if (err) {
      console.log("Scan unsuccessful")
      throw new Error(err);
    }
    
    console.log("Scan successful")
    for (let item in report) {
      console.log(JSON.stringify(report[item]));
    }
    res.send(report)
  });

})

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('*', (req, res) => {
  res.send("Hello world")
  // res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(process.env.PORT || 8080);