const express = require('express'),
      request = require('request'),
      bodyParser = require('body-parser'),
      app = express(),
      path = require('path'),
      http = require('http').Server(app);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/pokemon', require('./controllers/pokeController.js'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 3000);