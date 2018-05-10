var express     = require("express");
var request     = require('request-promise');
var router      = express.Router();
var apicache    = require('apicache');
var redis       = require('redis');

var appRoute 	= require('..app.js');

let cacheWithRedis = apicache
                     .options({ redisClient: redis.createClient() })
                     .middleware

// <!-- FROZEN -->
if (
		(thisMonthNumber < 4 || thisMonthNumber > 10) 
		&& minTempFinal < 25 
		&& (maxTempFinal < 25 || maxTempSum < 90)
		&& wahlfield24hrRainfall >= 0 
		&& wahlfield3DayRainfall >= 0
	) {   
   // <div class="result">Frozen</div>
   // <a class="today-total-button">More Info...</a>
   // 	<div class="more-info">
   		 frozen 
 //   		<br>
 //   		<br>
	// 	<div><span class="conditions">Current Conditions</span></div>
	// 	<div> dat.toLocaleString() </div>
	// 	<div> parseFloat(wahlfieldCurrentTemp).toFixed(0) &#8457;  wahlfieldCurrentCond </div>
	// 	<div>Feels Like:  parseFloat(wahlfieldCurrentFeelsLike).toFixed(0) &#8457;</div>
	// 	<div>Wind:  wahlfieldCurrentWind </div>
	// 	<div>3 Day Low:  parseFloat(minTempFinal).toFixed(0) &#8457;</div>
	// 	<div>3 Day High:  parseFloat(maxTempFinal).toFixed(0) &#8457;</div>
	// </div>

// <!-- FREEZE/THAW -->
 } else if (
		(thisMonthNumber < 5 || thisMonthNumber > 9) 
		&& minTempFinal < 25 
		&& (maxTempFinal > 30 || maxTempSum > 90)
		&& wahlfield24hrRainfall >= 0 
		&& wahlfield3DayRainfall >= 0
		
	) { 
   	// <div class="result">Freeze/Thaw</div>
   	// <a class="today-total-button">More Info...</a>
   	// <div class="more-info">
   		 freezeThaw 
 //   		<br>
 //   		<br>
 //   		<div><span class="conditions">Recent Conditions</span></div>
 //   		<div>3 Day Low:  parseFloat(minTempFinal).toFixed(0) &#8457;</div>
	// 	<div>3 Day High:  parseFloat(maxTempFinal).toFixed(0) &#8457;</div>
	// </div>

// <!-- MUDDY -->
 } else if (
		(thisMonthNumber < 13) 
		&& minTempFinal > 25 
		&& (maxTempFinal > 30 || maxTempSum > 90)
		&& (wahlfield24hrRainfall > .25 || wahlfield3DayRainfall > .5)
	) {   
	// <div class="result">Muddy</div>
	// <a class="today-total-button">More Info...</a>
 //   	<div class="more-info">
   		 muddy 
 //   		<hr>
 //   		<div><span class="conditions">Recent Conditions</span></div>
 //   		<div>24hr Rainfall:  parseFloat(wahlfield24hrRainfall).toFixed(2) "</div>	
	// 	<div>3 Day Rainfall:  parseFloat(wahlfield3DayRainfall).toFixed(2) "</div>	
	// 	<br>
	// 	<div><span class="conditions">Current Conditions</span></div>
	// 	<div> dat.toLocaleString() </div>
	// 	<div> parseFloat(wahlfieldCurrentTemp).toFixed(0) &#8457;  wahlfieldCurrentCond </div>
	// 	<div>Feels Like:  parseFloat(wahlfieldCurrentFeelsLike).toFixed(0) &#8457;</div>
	// 	<div>Wind:  wahlfieldCurrentWind </div>
	// </div>

// <!-- QUESTIONABLE -->
 } else if (
		(thisMonthNumber > 4 || thisMonthNumber < 10) 
		&& minTempFinal > 50 
		&& (maxTempFinal > 80 || maxTempSum > 90)
		&& wahlfield24hrRainfall > .25 
		&& wahlfield3DayRainfall > .5
	) { 
	// <div class="result">Questionable</div>
	// <a class="today-total-button">More Info...</a>
 //   	<div class="more-info">
   		 questionable 
 //   		<br>
 //   		<br>
 //   		<div><span class="conditions">Recent Conditions</span></div>
 //   		<div>24hr Rainfall:  parseFloat(wahlfield24hrRainfall).toFixed(2) "</div>	
	// 	<div>3 Day Rainfall:  parseFloat(wahlfield3DayRainfall).toFixed(2) "</div>
	// 	<div>3 Day Low:  parseFloat(minTempFinal).toFixed(0) &#8457;</div>
	// 	<div>3 Day High:  parseFloat(maxTempFinal).toFixed(0) &#8457;</div>
	// 	<br>
	// 	<div><span class="conditions">Current Conditions</span></div>
	// 	<div> dat.toLocaleString() </div>
	// 	<div> parseFloat(wahlfieldCurrentTemp).toFixed(0) &#8457;  wahlfieldCurrentCond </div>
	// 	<div>Feels Like:  parseFloat(wahlfieldCurrentFeelsLike).toFixed(0) &#8457;</div>
	// 	<div>Wind:  wahlfieldCurrentWind </div>
	// </div>

// <!-- PROBABLY DRY -->
 } else if (
		(thisMonthNumber > 4 || thisMonthNumber < 10) 
		&& minTempFinal > 35 
		&& (maxTempFinal > 35 || maxTempSum > 170)
		&& wahlfield24hrRainfall < .25 
		&& wahlfield3DayRainfall < .5
	) { 
	// <div class="result">Probably Dry</div>
	// <a class="today-total-button">More Info...</a>
 //   	<div class="more-info">
   		 probablyDry 
 //   		<br>
 //   		<br>
 //   		<div class="history">
 //   			<div><span class="conditions">Recent Conditions</span></div>
	//    		<div>24hr Rainfall:  parseFloat(wahlfield24hrRainfall).toFixed(2) "</div>	
	// 		<div>3 Day Rainfall:  parseFloat(wahlfield3DayRainfall).toFixed(2) "</div>
	// 		<div>3 Day Low:  parseFloat(minTempFinal).toFixed(0) &#8457;</div>
	// 		<div>3 Day High:  parseFloat(maxTempFinal).toFixed(0) &#8457;</div>
	// 		<br>
	// 	</div>
	// 	<div><span class="conditions">Current Conditions</span></div>
	// 	<div> dat.toLocaleString() </div>
	// 	<div> parseFloat(wahlfieldCurrentTemp).toFixed(0) &#8457;  wahlfieldCurrentCond </div>
	// 	<!-- <div>Feels Like:  parseFloat(wahlfieldCurrentFeelsLike).toFixed(0) &#8457;</div>
	// 	<div>Wind:  wahlfieldCurrentWind </div> -->
	// </div>

// <!-- DRY -->
 } else if (
		(thisMonthNumber > 4 || thisMonthNumber < 10) 
		&& minTempFinal > 50 
		&& (maxTempFinal > 60 || maxTempSum > 170)
		&& wahlfield24hrRainfall < .15 
		&& wahlfield3DayRainfall < .25
	) { 
	// <div class="result">Dry</div>
	// <a class="today-total-button">More Info...</a>
 //   	<div class="more-info">
   	dry
 //   		<br>
 //   		<br>
 //   		<div><span class="conditions">Recent Conditions</span></div>
 //   		<div>24hr Rainfall:  parseFloat(wahlfield24hrRainfall).toFixed(2) "</div>	
	// 	<div>3 Day Rainfall:  parseFloat(wahlfield3DayRainfall).toFixed(2) "</div>
	// 	<div>3 Day Low:  parseFloat(minTempFinal).toFixed(0) &#8457;</div>
	// 	<div>3 Day High:  parseFloat(maxTempFinal).toFixed(0) &#8457;</div>
	// 	<br>
	// 	<div><span class="conditions">Current Conditions</span></div>
	// 	<div> dat.toLocaleString() </div>
	// 	<div> parseFloat(wahlfieldCurrentTemp).toFixed(0) &#8457;  wahlfieldCurrentCond </div>
	// 	<div>Feels Like:  parseFloat(wahlfieldCurrentFeelsLike).toFixed(0) &#8457;</div>
	// 	<div>Wind:  wahlfieldCurrentWind </div>
	// </div>

 } else { 
	// <div class="result">Sorry, not enough data found.</div>
	// <a class="today-total-button">More Info...</a>
	// <div class="more-info">
	error
	// 	<div>Check with <a href="http://wmmba.org/">the WMMBA</a> for more info.</div>
	// 	<br>
	// 	<div><span class="conditions">Recent Conditions</span></div>
 //   		<div>24hr Rainfall:  parseFloat(wahlfield24hrRainfall).toFixed(2) "</div>	
	// 	<div>3 Day Rainfall:  parseFloat(wahlfield3DayRainfall).toFixed(2) "</div>
	// 	<div>3 Day Low:  parseFloat(minTempFinal).toFixed(0) &#8457;</div>
	// 	<div>3 Day High:  parseFloat(maxTempFinal).toFixed(0) &#8457;</div>
	// 	<br>
	// 	<div><span class="conditions">Current Conditions</span></div>
	// 	<div> dat.toLocaleString() </div>
	// 	<div> parseFloat(wahlfieldCurrentTemp).toFixed(0) &#8457;  wahlfieldCurrentCond </div>
	// 	<div>Feels Like:  parseFloat(wahlfieldCurrentFeelsLike).toFixed(0) &#8457;</div>
	// 	<div>Wind:  wahlfieldCurrentWind </div>
	// </div>
 } 

module.exports = router