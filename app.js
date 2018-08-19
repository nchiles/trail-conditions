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
setInterval( function(){ 
    var hour = new Date().getHours();
    if (hour >= 7 && hour < 19) {
    	console.log("wahlfield hour get sent");
        http.get("http://trail-conditions.herokuapp.com/wahlfield"); 
    }
} , 3660000); // every 60 minutes

var http = require("http");
setInterval( function(){ 
    var hour = new Date().getHours();
    if (hour >= 7 && hour < 19) {
    	console.log("merrell hour get sent");
        http.get("http://trail-conditions.herokuapp.com/merrell"); 
    }
} , 3720000); // every 61 minutes

var http = require("http");
setInterval( function(){ 
    var hour = new Date().getHours();
    if (hour >= 7 && hour < 19) {
    	console.log("luton hour get sent");
        http.get("http://trail-conditions.herokuapp.com/luton"); 
    }
} , 3780000); // every 62 minutes

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