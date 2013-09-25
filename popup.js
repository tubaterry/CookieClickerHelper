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
var prestige = 0;
var statsLastUpdated = new Date(0);
var product=new Array(10);
productDiv=[cursorMessage,grandmaMessage,farmMessage,factoryMessage,mineMessage,shipmentMessage,alchemyMessage,portalMessage,tardisMessage,hadronMessage];


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var didIanswer=false;
	if(request.MyType == "popupUpdateResponse"){
		console.debug("received update response");
		product=request.product;
		prestige=request.prestige;
		statsLastUpdated=new Date(request.statsLastUpdated);
		
		updatePopup();
		didIanswer=true;
	}
	if(didIanswer)
		sendResponse();
});

function updatePopup(){
	var rightNow = new Date();
	//tabID.innerHTML=MyTabID;
	//cookieBank.innerHTML = cookieBankCounter;
	
	if(  ((rightNow - statsLastUpdated)/60000) > 1){
		if(statsLastUpdated.getHours() == 0)
			niceTime = ("12:"+statsLastUpdated.getMinutes())
		else niceTime = (statsLastUpdated.getHours()+":"+statsLastUpdated.getMinutes())
		statsUpdated.innerHTML = ("<br>Based on stats page last opened at "+niceTime)
	} else
		statsUpdated.innerHTML = "";
	
	if( statsLastUpdated.getTime() == 0 )
		statsUpdated.innerHTML = "Open the Stats page to calculate prestige.";
	else prestigeMessage.innerHTML = ("Total prestige upon reset: "+prestige+" (+"+(prestige*2)+"%)");
	
	var itemsWaiting = 0;
	for(var item=0; item < 10; item++){	
		if(product[item].buyTime > 0){
			var totalseconds = Math.round(product[item].buyTime);
			var hours = parseInt(totalseconds / 3600);
			totalseconds = parseInt(totalseconds % 3600);
			var minutes = parseInt(totalseconds / 60);
			var seconds = parseInt(totalseconds % 60);
			productDiv[item].innerHTML = ("<br>"+product[item].name+": ");
			if(hours >= 1)
				productDiv[item].innerHTML = (productDiv[item].innerHTML+hours+"h ");
			if(minutes >= 1)
				productDiv[item].innerHTML = (productDiv[item].innerHTML+minutes+"m ");
			if(seconds >= 1)
				productDiv[item].innerHTML = (productDiv[item].innerHTML+seconds+"s");
			itemsWaiting++;
		}
		else{
			productDiv[item].innerHTML = "";
		}
	}
	if(itemsWaiting > 0)
		availabilityHeader.innerHTML = "<br>Wait time to buy:";
}

function sendUpdateRequest(){
	console.debug("Sending update request");
	chrome.runtime.sendMessage({
		"MyType":"popupUpdateRequest",
	});
}

document.addEventListener('DOMContentLoaded', function(){
	sendUpdateRequest();
	setInterval(function(){sendUpdateRequest();},1000);
	console.debug("Beginning popup update cycle.");
});