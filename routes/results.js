var express = require("express");
var request = require('request-promise');

freezeThaw = "Any moisture in the trail is likely freezing/expanding at night, and thawing during the day. If you ride, make sure it is early in the morning while the trail is still frozen.";

frozen = "It's winter, and the temps are below freezing. The trail is probably frozen. It might be rideable on a fat bike.";

muddy = "The trail has had enough recent rainfall that damage will be done if ridden.";

questionable = "The trail has had rain recently, but the temperatures have been warm enough that it might be ok to ride. If you're making ruts, turn back.";

probablyDry = "Given the time of year, warmer temps, and little to no recent rainfall, the trail should be dry enough to ride without damage.";

dry = "It's warm and the trail has had little to recent rainfall. Get out and enjoy it!";

error = "error";

module.exports = {
	freezeThaw,
	frozen,
	muddy,
	questionable,
	probablyDry,
	dry,
	error
}