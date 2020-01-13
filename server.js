
var express = require('express');

var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json({

limit: '1mb'

}));

app.use(bodyParser.urlencoded({

extended: false

}));

app.use(express.static(__dirname + '/public'));

// {

// “”: [{

// “ts”: 1554113602367,

// “action”: “postKeyword”,

// “value”: “a, b, c”

// }]

// }

var connections = {};

app.get('/connect', function(req, res, next) {

var token = "T-" + String(Math.random()).substring(2);

connections[token] = [];

res.json({

"token": token

});

});

app.get('/action', function(req, res, next) {

var token = req.query.token;

var keep = req.query.keep;

var actions = connections[token];

if (!keep) {

connections[token] = [];

}

res.json({

"actions": actions

});

});

app.post('/action', function(req, res, next) {

var token = req.body.token;

var actions = connections[token];

if (actions) {

connections[token] = actions.concat(req.body.actions);

actions = connections[token];

res.json({

"actions": actions

});

} else {

res.json({

"error": "token is not found"

});

}

});

app.use('/', function(req, res, next) {

res.json({

"nodejs express": new Date().getTime()

});

});

app.listen(process.env.PORT || 4000);

app.listen(process.env.PORT || 4000);
