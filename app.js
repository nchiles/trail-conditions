var express 	= require("express");
var app     	= express();
var request 	= require('request-promise');
var redis 		= require('redis');
var redisClient	= redis.createClient({host: 'localhost', port: 6379});

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


redisClient.on('ready',function() {
 console.log("Redis is ready");
});

redisClient.on('error',function() {
 console.log("Error in Redis");
});

app.get("/", function(req, res) {
	res.render("index");
});

app.listen('8000')
console.log("WMTC Server Started on 8000!")