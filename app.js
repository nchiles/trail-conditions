var express 	= require("express");
var app     	= express();
var request 	= require('request-promise');
var redis 		= require('redis');
//LOCAL
// var redisClient	= redis.createClient({host: 'localhost', port: 6379});
//HEROKU
var client = require('redis').createClient(process.env.REDIS_URL);
var port   		= Number(process.env.PORT || 3000);

var http = require("http");
setInterval(function() {
    http.get("http://trail-conditions.herokuapp.com");
}, 300000); // every 5 minutes (300000)

var http = require("http");
setInterval(function() {
    http.get("http://trail-conditions.herokuapp.com/wahlfield");
}, 60001); // every 1 minutes

//Routes
var wahlfieldRoute 	= require('./routes/wahlfield.js');
	merrellRoute 	= require('./routes/merrell.js');
	lutonRoute 		= require('./routes/luton.js');

app.use(wahlfieldRoute);
app.use(merrellRoute);
app.use(lutonRoute);

require('./routes/results.js');

app.use(express.static('public'))
app.set("view engine", "ejs");


// redisClient.on('ready',function() {
//  console.log("Redis is ready");
// });

// redisClient.on('error',function() {
//  console.log("Error in Redis");
// });

app.get("/", function(req, res) {
	res.render("index");
});

app.listen(port, function() {
	console.log("App is running on port " + port);	
})