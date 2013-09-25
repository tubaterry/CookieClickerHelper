/*
	Copyright 2013, Chris Terry - tuba.terry@gmail.com
	This file is part of Cookie Clicker Helper.

    Cookie Clicker Helper is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Cookie Clicker Helper is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Cookie Clicker Helper.  If not, see <http://www.gnu.org/licenses/>.
*/
var timer = 0;
var cookieBankCounter = 0;

function setID(){
	chrome.runtime.sendMessage({
			"MyType":"TabID",
		});
}
setInterval(setID,1000);

function numberize(sillyString){
	var result = new Number;
	result = 0;
	for(var chunk=0; chunk < (sillyString.split(",")).length; chunk++){
		result += Number(sillyString.split(",")[chunk]);
		result = result * 1000;
	}
	result = result / 1000;
	return result;
}

function sendData(){
	//There is definitely a smarter way to do this.
	var cookieBankCounter = 0;
	var cookiesPerSecond  = 0;
	var cookiesAllTime = 0;
	var cursorPrice = 0;
	var cursorOwned = 0;
	var grandmaPrice = 0;
	var grandmaOwned = 0;
	var farmPrice = 0;
	var farmOwned = 0;
	var factoryPrice = 0;
	var factoryOwned = 0;
	var minePrice = 0;
	var mineOwned = 0;
	var shipmentPrice = 0;
	var shipmentOwned = 0;
	var alchemyPrice = 0;
	var alchemyOwned = 0;
	var portalPrice = 0;
	var portalOwned = 0;
	var tardisPrice = 0;
	var tardisOwned = 0;
	var hadronPrice = 0;
	var hadronOwned = 0;

	cookieBankCounter = numberize(String(((document.getElementById("cookies").innerText)).split(/[\n\s]+/)[0]));
	cookiesPerSecond  = numberize(String(((document.getElementById("cookies").innerText)).split(/[\n\s]+/)[5]));
	cookiesAllTime = numberize((((document.getElementById("menu")).getElementsByClassName("subsection")[0].getElementsByClassName("price plain"))[1]).innerText);
	if(((document.getElementById("menu")).getElementsByClassName("subsection")[0].getElementsByClassName("price plain"))[2] !== "undefined")
		cookiesPrevious = numberize((((document.getElementById("menu")).getElementsByClassName("subsection")[0].getElementsByClassName("price plain"))[2]).innerText);
	
	cursorPrice = numberize((document.getElementById("product0")).getElementsByClassName("price")[0].innerText);
	grandmaPrice = numberize((document.getElementById("product1")).getElementsByClassName("price")[0].innerText);
	farmPrice = numberize((document.getElementById("product2")).getElementsByClassName("price")[0].innerText);
	factoryPrice = numberize((document.getElementById("product3")).getElementsByClassName("price")[0].innerText);
	minePrice = numberize((document.getElementById("product4")).getElementsByClassName("price")[0].innerText);
	shipmentPrice = numberize((document.getElementById("product5")).getElementsByClassName("price")[0].innerText);
	alchemyPrice = numberize((document.getElementById("product6")).getElementsByClassName("price")[0].innerText);
	portalPrice = numberize((document.getElementById("product7")).getElementsByClassName("price")[0].innerText);
	tardisPrice = numberize((document.getElementById("product8")).getElementsByClassName("price")[0].innerText);
	hadronPrice = numberize((document.getElementById("product9")).getElementsByClassName("price")[0].innerText);
	
	if(typeof((document.getElementById("product0")).getElementsByClassName("owned")[0]) !== "undefined")
		cursorOwned = numberize((document.getElementById("product0")).getElementsByClassName("owned")[0].innerText);
	if(typeof((document.getElementById("product1")).getElementsByClassName("owned")[0]) !== "undefined")
		grandmaOwned = numberize((document.getElementById("product1")).getElementsByClassName("owned")[0].innerText);
	if(typeof((document.getElementById("product2")).getElementsByClassName("owned")[0]) !== "undefined")
		farmOwned = numberize((document.getElementById("product2")).getElementsByClassName("owned")[0].innerText);
	if(typeof((document.getElementById("product3")).getElementsByClassName("owned")[0]) !== "undefined")	
		factoryOwned = numberize((document.getElementById("product3")).getElementsByClassName("owned")[0].innerText);
	if(typeof((document.getElementById("product4")).getElementsByClassName("owned")[0]) !== "undefined")
		mineOwned = numberize((document.getElementById("product4")).getElementsByClassName("owned")[0].innerText);
	if(typeof((document.getElementById("product5")).getElementsByClassName("owned")[0]) !== "undefined")	
		shipmentOwned = numberize((document.getElementById("product5")).getElementsByClassName("owned")[0].innerText);	
	if(typeof((document.getElementById("product6")).getElementsByClassName("owned")[0]) !== "undefined")
		alchemyOwned = numberize((document.getElementById("product6")).getElementsByClassName("owned")[0].innerText);	
	if(typeof((document.getElementById("product7")).getElementsByClassName("owned")[0]) !== "undefined")
		portalOwned = numberize((document.getElementById("product7")).getElementsByClassName("owned")[0].innerText);	
	if(typeof((document.getElementById("product8")).getElementsByClassName("owned")[0]) !== "undefined")
		tardisOwned = numberize((document.getElementById("product8")).getElementsByClassName("owned")[0].innerText);
	if(typeof((document.getElementById("product9")).getElementsByClassName("owned")[0]) !== "undefined")
		hadronOwned = numberize((document.getElementById("product9")).getElementsByClassName("owned")[0].innerText);
	
	
	chrome.runtime.sendMessage({
			"MyType": "StatusUpdate",
			"cookieBank":cookieBankCounter,
			"cookiesPerSecond":cookiesPerSecond,
			"cookiesAllTime":cookiesAllTime,
			"cookiesPrevious":cookiesPrevious,
			"cursorPrice":cursorPrice,
			"cursorOwned":cursorOwned,
			"grandmaPrice":grandmaPrice,
			"grandmaOwned":grandmaOwned,
			"farmPrice":farmPrice,
			"farmOwned":farmOwned,
			"factoryPrice":factoryPrice,
			"factoryOwned":factoryOwned,
			"minePrice":minePrice,
			"mineOwned":mineOwned,
			"shipmentPrice":shipmentPrice,
			"shipmentOwned":shipmentOwned,
			"alchemyPrice":alchemyPrice,
			"alchemyOwned":alchemyOwned,
			"portalPrice":portalPrice,
			"portalOwned":portalOwned,
			"tardisPrice":tardisPrice,
			"tardisOwned":tardisOwned,
			"hadronPrice":hadronPrice,
			"hadronOwned":hadronOwned
		});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.MyType == "StatusUpdate"){	
		sendData();
		sendResponse();
	}
	else{
		sendResponse({});
	}
});