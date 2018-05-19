const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const axios = require('axios');
var async = require('async')

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

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('*', (req, res) => {
  res.send("Hello world")
  // res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(process.env.PORT || 8080);