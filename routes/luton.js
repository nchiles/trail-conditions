var express     = require("express");
var request     = require('request-promise');
var router      = express.Router();
var apicache    = require('apicache');
var redis       = require('redis');

//HEROKU
let cacheWithRedis = apicache
                     .middleware

//LOCAL
// let cacheWithRedis = apicache
//                     .options({ redisClient: redis.createClient() })
//                     .middleware


router.get("/luton", cacheWithRedis('1 minute'), function(req, res) {

    Date.prototype.subtractDays = function(days) {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() - days);
      return dat;
    }

    var dat = new Date();

    var datLessOne      = dat.subtractDays(1)
    var datLessTwo      = dat.subtractDays(2)
    var datLessThree    = dat.subtractDays(3)
    var datLessFour     = dat.subtractDays(4)
    var datLessFive     = dat.subtractDays(5)

    var todayLessOne    = datLessOne.toJSON().slice(0,10).replace(/-/g,'');
    var todayLessTwo    = datLessTwo.toJSON().slice(0,10).replace(/-/g,'');
    var todayLessThree  = datLessThree.toJSON().slice(0,10).replace(/-/g,'');
    var todayLessFour   = datLessFour.toJSON().slice(0,10).replace(/-/g,'');
    var todayLessFive   = datLessFive.toJSON().slice(0,10).replace(/-/g,'');

    console.log(dat, todayLessOne, todayLessTwo, todayLessThree, todayLessFour, todayLessFive);

    //CHECK MONTH
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var month = new Date();
    var thisMonthName = monthNames[month.getMonth()];
    var thisMonthNumber = month.getMonth() + 1;

    var lutonPws1 = "pws:KMIROCKF8";
    var lutonPws2 = "pws:KMIROCKF23";
    var lutonPws3 = "pws:KMIROCKF4";

    var apiKey1 = process.env.apiKey1;
    var apiKey2 = process.env.apiKey2;

    /////////24 HOUR RAINFALL//////////
    request("http://api.wunderground.com/api/" + apiKey1 + "/conditions/bestfct:1/q/" + lutonPws1 + ".json")    
    .then(function(data) {
            data1a = JSON.parse(data);
            luton24hrRainfall1a = data1a["current_observation"]["precip_today_in"];
            lutonCurrentTemp = data1a["current_observation"]["temp_f"];
            lutonCurrentCond = data1a["current_observation"]["weather"];
            lutonCurrentWind = data1a["current_observation"]["wind_string"];
            lutonCurrentFeelsLike = data1a["current_observation"]["feelslike_f"];
    
        return request("http://api.wunderground.com/api/" + apiKey1 + "/conditions/bestfct:1/q/" + lutonPws2 + ".json");
    })
    .then(function(data) {
            data2a = JSON.parse(data);
            luton24hrRainfall2a = data2a["current_observation"]["precip_today_in"];
    
        return request("http://api.wunderground.com/api/" + apiKey1 + "/conditions/bestfct:1/q/" + lutonPws3 + ".json");
    })
    .then(function(data) {
            data3a = JSON.parse(data);
            luton24hrRainfall3a = data3a["current_observation"]["precip_today_in"];


    //////////3 DAY LOW/HIGH TEMPS////////// 
        return request("http://api.wunderground.com/api/" + apiKey1 + "/history_" + todayLessOne + "/q/MI/Comstock_Park.json");
    })
    .then(function(data) {
        data1e = JSON.parse(data);
        minTemp1e = data1e.history.dailysummary[0].mintempi;
        maxTemp1e = data1e.history.dailysummary[0].maxtempi;

        return request("http://api.wunderground.com/api/" + apiKey1 + "/history_" + todayLessTwo + "/q/MI/Comstock_Park.json");
    })
    .then(function(data) {
        data2e = JSON.parse(data);
        minTemp2e = data2e.history.dailysummary[0].mintempi;
        maxTemp2e = data2e.history.dailysummary[0].maxtempi;

        return request("http://api.wunderground.com/api/" + apiKey1 + "/history_" + todayLessThree + "/q/MI/Comstock_Park.json");
    })
    .then(function(data) {
        data3e = JSON.parse(data);
        minTemp3e = data3e.history.dailysummary[0].mintempi;
        maxTemp3e = data3e.history.dailysummary[0].maxtempi;



    //////////3 DAY RAINFALL////////// 
    //different key on these 9 calls!!!
    //pws:KMIROCKF8
        return request("http://api.wunderground.com/api/" + apiKey2 + "/history_" + todayLessOne + "/q/" + lutonPws1 + ".json");
    })
    .then(function(data) {
        data1b = JSON.parse(data);
        // minTemp1b = data1b.history.dailysummary[0].mintempi;
        // maxTemp1b = data1b.history.dailysummary[0].maxtempi;
        luton3DayRainfall1b = data1b.history.dailysummary[0].precipi;

        return request("http://api.wunderground.com/api/" + apiKey2 + "/history_" + todayLessTwo + "/q/" + lutonPws1 + ".json");
    })
    .then(function(data) {
        data2b = JSON.parse(data);
        // minTemp2b = data2b.history.dailysummary[0].mintempi;
        // maxTemp2b = data2b.history.dailysummary[0].maxtempi;
        luton3DayRainfall2b = data2b.history.dailysummary[0].precipi;

        return request("http://api.wunderground.com/api/" + apiKey2 + "/history_" + todayLessThree + "/q/" + lutonPws1 + ".json");
    })
    .then(function(data) {
        data3b = JSON.parse(data);
        // minTemp3b = data3b.history.dailysummary[0].mintempi;
        // maxTemp3b = data3b.history.dailysummary[0].maxtempi;
        luton3DayRainfall3b = data3b.history.dailysummary[0].precipi;



     //pws:KMIROCKF23
        return request("http://api.wunderground.com/api/" + apiKey2 + "/history_" + todayLessOne + "/q/" + lutonPws2 + ".json");
    })
    .then(function(data) {
        data1c = JSON.parse(data);
        // minTemp1c = data1c.history.dailysummary[0].mintempi;
        // maxTemp1c = data1c.history.dailysummary[0].maxtempi;
        luton3DayRainfall1c = data1c.history.dailysummary[0].precipi;

        return request("http://api.wunderground.com/api/" + apiKey2 + "/history_" + todayLessTwo + "/q/" + lutonPws2 + ".json");
    })
    .then(function(data) {
        data2c = JSON.parse(data);
        // minTemp2c = data2c.history.dailysummary[0].mintempi;
        // maxTemp2c = data2c.history.dailysummary[0].maxtempi;
        luton3DayRainfall2c = data2c.history.dailysummary[0].precipi;

        return request("http://api.wunderground.com/api/" + apiKey2 + "/history_" + todayLessThree + "/q/" + lutonPws2 + ".json");
    })
    .then(function(data) {
        data3c = JSON.parse(data);
        // minTemp3c = data6b.history.dailysummary[0].mintempi;
        // maxTemp3c = data6b.history.dailysummary[0].maxtempi;
        luton3DayRainfall3c = data3c.history.dailysummary[0].precipi;



    //pws:KMIROCKF4
        return request("http://api.wunderground.com/api/" + apiKey2 + "/history_" + todayLessOne + "/q/" + lutonPws3 + ".json");
    })
    .then(function(data) {
        data1d = JSON.parse(data);
        // minTemp1d = data1d.history.dailysummary[0].mintempi;
        // maxTemp1d = data1d.history.dailysummary[0].maxtempi;
        luton3DayRainfall1d = data1d.history.dailysummary[0].precipi;

        return request("http://api.wunderground.com/api/" + apiKey2 + "/history_" + todayLessTwo + "/q/" + lutonPws3 + ".json");
    })
    .then(function(data) {
        data2d = JSON.parse(data);
        // minTemp2d = data2d.history.dailysummary[0].mintempi;
        // maxTemp2d = data2d.history.dailysummary[0].maxtempi;
        luton3DayRainfall2d = data2d.history.dailysummary[0].precipi;

        return request("http://api.wunderground.com/api/" + apiKey2 + "/history_" + todayLessThree + "/q/" + lutonPws3 + ".json");
    })
    .then(function(data) {
        data3d = JSON.parse(data);
        // minTemp3d = data3d.history.dailysummary[0].mintempi;
        // maxTemp3d = data3d.history.dailysummary[0].maxtempi;
        luton3DayRainfall3d = data3d.history.dailysummary[0].precipi;



    

    //GET 24HR RAINFALL AVERAGE FROM 3 WEATHER STATIONS
    luton24hrRainfall = (parseFloat(luton24hrRainfall1a) + parseFloat(luton24hrRainfall2a) + parseFloat(luton24hrRainfall3a)) /3;

    //GET 3 DAY RAINFALL AVERAGES FROM 3 WEATHER STATIONS
    luton3DayRainfall1 = (parseFloat(luton3DayRainfall1b) + parseFloat(luton3DayRainfall1c) + parseFloat(luton3DayRainfall1d)) /3; //1 day ago average rainfall from pws:KMIROCKF8 pws:KMIROCKF23 pws:KMIROCKF4
    luton3DayRainfall2 = (parseFloat(luton3DayRainfall2b) + parseFloat(luton3DayRainfall2c) + parseFloat(luton3DayRainfall2d)) /3; //2 days ago average rainfall from pws:KMIROCKF8 pws:KMIROCKF23 pws:KMIROCKF4
    luton3DayRainfall3 = (parseFloat(luton3DayRainfall3b) + parseFloat(luton3DayRainfall3c) + parseFloat(luton3DayRainfall3d)) /3; //3 days ago average rainfall from pws:KMIROCKF8 pws:KMIROCKF23 pws:KMIROCKF4

    //ADD UP 3 DAY TOTAL RAINFALL
    luton3DayRainfall = parseFloat(luton3DayRainfall1) + parseFloat(luton3DayRainfall2) + parseFloat(luton3DayRainfall3);

    //ADD UP MIN/MAX TEMPS
    minTempArr = [parseFloat(minTemp1e), parseFloat(minTemp2e), parseFloat(minTemp3e)];
    maxTempArr = [parseFloat(maxTemp1e), parseFloat(maxTemp2e), parseFloat(maxTemp3e)];

    //GET LOWEST AND HIGHEST TEMPS
    minTempFinal = Math.min(...minTempArr);
    maxTempFinal = Math.max(...maxTempArr);

    //GET MAX TEMP SUM
    maxTempSum = parseFloat(maxTemp1e) + parseFloat(maxTemp2e) + parseFloat(maxTemp3e);


    console.log("KMIROCKF8: " + luton24hrRainfall1a,                    '\n' +
                "KMIROCKF23: " + luton24hrRainfall2a,                    '\n' +
                "KMIROCKF4: " + luton24hrRainfall3a,                   '\n' +
                "1 day ago average rainfall: " + luton3DayRainfall1,    '\n' +
                "2 day ago average rainfall: " + luton3DayRainfall2,    '\n' +
                "3 day ago average rainfall: " + luton3DayRainfall3,    '\n' +
                "min temp yesterday: " + minTemp1e,                         '\n' +
                "max temp yesterday: " + maxTemp1e,                         '\n' +
                "min temp 2 days ago: " + minTemp2e,                        '\n' +
                "max temp 2 days ago: " + maxTemp2e,                        '\n' +
                "min temp 3 days ago: " + minTemp3e,                        '\n' +
                "max temp 3 days ago: " + maxTemp3e,                        '\n' +
                "minTempArr: " + minTempArr,                                '\n' +
                "maxTempArr: " + maxTempArr,                                '\n' +
                "minTempArr: " + minTempFinal,                              '\n' +
                "maxTempArr: " + maxTempFinal,                              '\n' + 
                "maxTempSum: " + maxTempSum,                                '\n' + 
                "KMIROCKF8: " + lutonCurrentTemp,                       '\n' +
                "KMIROCKF8: " + lutonCurrentCond,                       '\n' +
                "KMIROCKF8: " + lutonCurrentWind,                       '\n' +
                "KMIROCKF8: " + lutonCurrentFeelsLike,                  '\n' +
                "this month: " + thisMonthNumber);


    res.render("luton", { luton24hrRainfall, luton3DayRainfall, luton3DayRainfall1, luton3DayRainfall2, luton3DayRainfall3, thisMonthName, thisMonthNumber, minTempArr, maxTempArr, minTempFinal, maxTempFinal, lutonCurrentTemp, lutonCurrentCond, lutonCurrentWind, lutonCurrentFeelsLike, dat, maxTempSum } );
    })
});

module.exports = router;

