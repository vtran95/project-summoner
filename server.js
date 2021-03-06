var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var LeagueJs = require('./node_modules/leaguejs/lib/LeagueJS');

require('dotenv').config();
require('./config/database');

var app = express();
process.env.LEAGUE_API_PLATFORM_ID = 'na1'
// var leagueJs = new LeagueJs(process.env.LEAGUE_API_KEY, {PLATFORM_ID: process.env.LEAGUE_API_PLATFORM_ID});

app.use(logger('dev'));

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());

app.use('/matchinfo', require('./routes/matchInfo'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});