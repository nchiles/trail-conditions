var express     = require("express");
var request     = require('request-promise');
var router      = express.Router();
var apicache    = require('apicache');
var redis       = require('redis');

let cacheWithRedis = apicache
                     .options({ client: client })
                     .middleware

router.get("/wahlfield", cacheWithRedis('1 minutes'), function(req, res) {
// router.get("/wahlfield", function(req, res) {

    var wahlfieldPws1 = "pws:KMICOMST7";
    var wahlfieldPws2 = "pws:KMICOMST9";
    var wahlfieldPws3 = "pws:KMISPART13";

    Date.prototype.subtractDays = function(days) {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() - days);
      return dat;
    }

    var dat = new Date();

    var datLessOne = dat.subtractDays(1)
    var datLessTwo = dat.subtractDays(2)
    var datLessThree = dat.subtractDays(3)
    var datLessFour = dat.subtractDays(4)
    var datLessFive = dat.subtractDays(5)

    var todayLessOne = datLessOne.toJSON().slice(0,10).replace(/-/g,'');
    var todayLessTwo = datLessTwo.toJSON().slice(0,10).replace(/-/g,'');
    var todayLessThree = datLessThree.toJSON().slice(0,10).replace(/-/g,'');
    var todayLessFour = datLessFour.toJSON().slice(0,10).replace(/-/g,'');
    var todayLessFive = datLessFive.toJSON().slice(0,10).replace(/-/g,'');

    console.log(dat, todayLessOne, todayLessTwo, todayLessThree, todayLessFour, todayLessFive);

    //CHECK MONTH
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var month = new Date();
    var thisMonthName = monthNames[month.getMonth()];
    var thisMonthNumber = month.getMonth() + 1;

    //pws:KMICOMST7 
    //pws:KMICOMST9
    //pws:KMISPART13

    /////////24 HOUR RAINFALL//////////
    request("http://api.wunderground.com/api/bd3c631e1ce25d97/conditions/bestfct:1/q/" + wahlfieldPws1 + ".json")    
    .then(function(data) {
            data1a = JSON.parse(data);
            wahlfield24hrRainfall1a = data1a["current_observation"]["precip_today_in"];
            wahlfieldCurrentTemp = data1a["current_observation"]["temp_f"];
            wahlfieldCurrentCond = data1a["current_observation"]["weather"];
            wahlfieldCurrentWind = data1a["current_observation"]["wind_string"];
            wahlfieldCurrentFeelsLike = data1a["current_observation"]["feelslike_f"];
    
        return request("http://api.wunderground.com/api/bd3c631e1ce25d97/conditions/bestfct:1/q/" + wahlfieldPws2 + ".json");
    })
    .then(function(data) {
            data2a = JSON.parse(data);
            wahlfield24hrRainfall2a = data2a["current_observation"]["precip_today_in"];
    
        return request("http://api.wunderground.com/api/bd3c631e1ce25d97/conditions/bestfct:1/q/" + wahlfieldPws3 + ".json");
    })
    .then(function(data) {
            data3a = JSON.parse(data);
            wahlfield24hrRainfall3a = data3a["current_observation"]["precip_today_in"];


    //////////3 DAY RAINFALL////////// 
    //different key on these 9 calls!!!
    //pws:KMICOMST7
        return request("http://api.wunderground.com/api/e49c5c12fec31f3e/history_" + todayLessOne + "/q/" + wahlfieldPws1 + ".json");
    })
    .then(function(data) {
        data1b = JSON.parse(data);
        // minTemp1b = data1b.history.dailysummary[0].mintempi;
        // maxTemp1b = data1b.history.dailysummary[0].maxtempi;
        wahlfield3DayRainfall1b = data1b.history.dailysummary[0].precipi;

        return request("http://api.wunderground.com/api/e49c5c12fec31f3e/history_" + todayLessTwo + "/q/" + wahlfieldPws1 + ".json");
    })
    .then(function(data) {
        data2b = JSON.parse(data);
        // minTemp2b = data2b.history.dailysummary[0].mintempi;
        // maxTemp2b = data2b.history.dailysummary[0].maxtempi;
        wahlfield3DayRainfall2b = data2b.history.dailysummary[0].precipi;

        return request("http://api.wunderground.com/api/e49c5c12fec31f3e/history_" + todayLessThree + "/q/" + wahlfieldPws1 + ".json");
    })
    .then(function(data) {
        data3b = JSON.parse(data);
        // minTemp3b = data3b.history.dailysummary[0].mintempi;
        // maxTemp3b = data3b.history.dailysummary[0].maxtempi;
        wahlfield3DayRainfall3b = data3b.history.dailysummary[0].precipi;



     //pws:KMICOMST9
        return request("http://api.wunderground.com/api/e49c5c12fec31f3e/history_" + todayLessOne + "/q/" + wahlfieldPws2 + ".json");
    })
    .then(function(data) {
        data1c = JSON.parse(data);
        // minTemp1c = data1c.history.dailysummary[0].mintempi;
        // maxTemp1c = data1c.history.dailysummary[0].maxtempi;
        wahlfield3DayRainfall1c = data1c.history.dailysummary[0].precipi;

        return request("http://api.wunderground.com/api/e49c5c12fec31f3e/history_" + todayLessTwo + "/q/" + wahlfieldPws2 + ".json");
    })
    .then(function(data) {
        data2c = JSON.parse(data);
        // minTemp2c = data2c.history.dailysummary[0].mintempi;
        // maxTemp2c = data2c.history.dailysummary[0].maxtempi;
        wahlfield3DayRainfall2c = data2c.history.dailysummary[0].precipi;

        return request("http://api.wunderground.com/api/e49c5c12fec31f3e/history_" + todayLessThree + "/q/" + wahlfieldPws2 + ".json");
    })
    .then(function(data) {
        data3c = JSON.parse(data);
        // minTemp3c = data6b.history.dailysummary[0].mintempi;
        // maxTemp3c = data6b.history.dailysummary[0].maxtempi;
        wahlfield3DayRainfall3c = data3c.history.dailysummary[0].precipi;



    //pws:KMISPART13
        return request("http://api.wunderground.com/api/e49c5c12fec31f3e/history_" + todayLessOne + "/q/" + wahlfieldPws3 + ".json");
    })
    .then(function(data) {
        data1d = JSON.parse(data);
        // minTemp1d = data1d.history.dailysummary[0].mintempi;
        // maxTemp1d = data1d.history.dailysummary[0].maxtempi;
        wahlfield3DayRainfall1d = data1d.history.dailysummary[0].precipi;

        return request("http://api.wunderground.com/api/e49c5c12fec31f3e/history_" + todayLessTwo + "/q/" + wahlfieldPws3 + ".json");
    })
    .then(function(data) {
        data2d = JSON.parse(data);
        // minTemp2d = data2d.history.dailysummary[0].mintempi;
        // maxTemp2d = data2d.history.dailysummary[0].maxtempi;
        wahlfield3DayRainfall2d = data2d.history.dailysummary[0].precipi;

        return request("http://api.wunderground.com/api/e49c5c12fec31f3e/history_" + todayLessThree + "/q/" + wahlfieldPws3 + ".json");
    })
    .then(function(data) {
        data3d = JSON.parse(data);
        // minTemp3d = data3d.history.dailysummary[0].mintempi;
        // maxTemp3d = data3d.history.dailysummary[0].maxtempi;
        wahlfield3DayRainfall3d = data3d.history.dailysummary[0].precipi;



    //////////3 DAY LOW/HIGH TEMPS////////// 
        return request("http://api.wunderground.com/api/bd3c631e1ce25d97/history_" + todayLessOne + "/q/MI/Comstock_Park.json");
    })
    .then(function(data) {
        data1e = JSON.parse(data);
        minTemp1e = data1e.history.dailysummary[0].mintempi;
        maxTemp1e = data1e.history.dailysummary[0].maxtempi;

        return request("http://api.wunderground.com/api/bd3c631e1ce25d97/history_" + todayLessTwo + "/q/MI/Comstock_Park.json");
    })
    .then(function(data) {
        data2e = JSON.parse(data);
        minTemp2e = data2e.history.dailysummary[0].mintempi;
        maxTemp2e = data2e.history.dailysummary[0].maxtempi;

        return request("http://api.wunderground.com/api/bd3c631e1ce25d97/history_" + todayLessThree + "/q/MI/Comstock_Park.json");
    })
    .then(function(data) {
        data3e = JSON.parse(data);
        minTemp3e = data3e.history.dailysummary[0].mintempi;
        maxTemp3e = data3e.history.dailysummary[0].maxtempi;


    //GET 24HR RAINFALL AVERAGE FROM 3 WEATHER STATIONS
    wahlfield24hrRainfall = (parseFloat(wahlfield24hrRainfall1a) + parseFloat(wahlfield24hrRainfall2a) + parseFloat(wahlfield24hrRainfall3a)) /3;

    //GET 3 DAY RAINFALL AVERAGES FROM 3 WEATHER STATIONS
    wahlfield3DayRainfall1 = (parseFloat(wahlfield3DayRainfall1b) + parseFloat(wahlfield3DayRainfall1c) + parseFloat(wahlfield3DayRainfall1d)) /3; //1 day ago average rainfall from pws:KMICOMST7 pws:KMICOMST9 pws:KMISPART13
    wahlfield3DayRainfall2 = (parseFloat(wahlfield3DayRainfall2b) + parseFloat(wahlfield3DayRainfall2c) + parseFloat(wahlfield3DayRainfall2d)) /3; //2 days ago average rainfall from pws:KMICOMST7 pws:KMICOMST9 pws:KMISPART13
    wahlfield3DayRainfall3 = (parseFloat(wahlfield3DayRainfall3b) + parseFloat(wahlfield3DayRainfall3c) + parseFloat(wahlfield3DayRainfall3d)) /3; //3 days ago average rainfall from pws:KMICOMST7 pws:KMICOMST9 pws:KMISPART13

    //ADD UP 3 DAY TOTAL RAINFALL
    wahlfield3DayRainfall = parseFloat(wahlfield3DayRainfall1) + parseFloat(wahlfield3DayRainfall2) + parseFloat(wahlfield3DayRainfall3);

    //ADD UP MIN/MAX TEMPS
    minTempArr = [parseFloat(minTemp1e), parseFloat(minTemp2e), parseFloat(minTemp3e)];
    maxTempArr = [parseFloat(maxTemp1e), parseFloat(maxTemp2e), parseFloat(maxTemp3e)];

    //GET LOWEST AND HIGHEST TEMPS
    minTempFinal = Math.min(...minTempArr);
    maxTempFinal = Math.max(...maxTempArr);

    //GET MAX TEMP SUM
    maxTempSum = parseFloat(maxTemp1e) + parseFloat(maxTemp2e) + parseFloat(maxTemp3e);


    console.log("KMICOMST7: " + wahlfield24hrRainfall1a,                    '\n' +
                "KMICOMST7: " + wahlfieldCurrentTemp,                       '\n' +
                "KMICOMST7: " + wahlfieldCurrentCond,                       '\n' +
                "KMICOMST7: " + wahlfieldCurrentWind,                       '\n' +
                "KMICOMST7: " + wahlfieldCurrentFeelsLike,                  '\n' +
                "KMICOMST9: " + wahlfield24hrRainfall2a,                    '\n' +
                "KMISPART13: " + wahlfield24hrRainfall3a,                   '\n' +
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
                "maxTempSum: " + maxTempSum,                              	'\n' +
                "1 day ago average rainfall: " + wahlfield3DayRainfall1,    '\n' +
                "2 day ago average rainfall: " + wahlfield3DayRainfall2,    '\n' +
                "3 day ago average rainfall: " + wahlfield3DayRainfall3,   '\n' +
                "this month: " + thisMonthNumber);


	res.render("wahlfield", { wahlfield24hrRainfall, wahlfield3DayRainfall, wahlfield3DayRainfall1, wahlfield3DayRainfall2, wahlfield3DayRainfall3, thisMonthName, thisMonthNumber, minTempArr, maxTempArr, minTempFinal, maxTempFinal, wahlfieldCurrentTemp, wahlfieldCurrentCond, wahlfieldCurrentWind, wahlfieldCurrentFeelsLike, dat, maxTempSum } );
	})
});


module.exports = router;

