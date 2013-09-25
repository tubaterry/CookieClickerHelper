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
var MyTabID = 0

var cookieBankCounter = 0;
var cookiesPerSecond = 0;
var cookiesAllTime = 0;
var cookiesPrevious = 0;
var statsLastUpdated = new Date(0);
var prestige = 0;
var product=new Array();

console.debug("Initializing products");
console.debug("");
productNames=["Cursor","Grandma","Farm","Factory","Mine","Shipment","Alchemy Lab","Portal","Time Machine","Antimatter Condenser"];
productDivs=[]; //Keep blank - this doesn't go anywhere anyway.
for(var item=0;item < 10;item++){
	product[item] = new Object();
	product[item].name=productNames[item];
	product[item].div=productDivs[item];
	product[item].price=0;
	product[item].owned=0;
	product[item].buyTime=0;
}

function popupUpdate(){
	console.debug("sending popup update response");
	chrome.runtime.sendMessage({
		"MyType":"popupUpdateResponse",
		"prestige":prestige,
		"statsLastUpdated":statsLastUpdated,
		"product":product
		},function(response,sender,sendResponse){}
	);
}

function crunchNumbers(){
	console.debug("reticulating splines");
	//prestige=cookiesAllTime/1000000000000;
	prestige=(cookiesAllTime+cookiesPrevious)/1000000000000;
	//prestige=Math.max(0,Math.floor(Math.pow(prestige,0.5)));//old version
	prestige=Math.max(0,Math.floor((-1+Math.pow(1+8*prestige,0.5))/2));//geometric progression
	
	//BuyTime is (object price - cookie bank)/cookiesPerSecond
	for(var item=0; item < 10; item++){
		product[item].buyTime= ((product[item].price - cookieBankCounter)/cookiesPerSecond);
	}
	
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var didIanswer=false;
	if(request.MyType == "TabIDUpdate"){	
		console.debug("received tab id");
		MyTabID=sender.tab.id;
		setInterval(function(){ 
			getCookieData() ;
			},1000);
		didIanswer=true;
	}
	if(request.MyType == "bankUpdate"){
		console.debug("received bank update");
		cookieBankCounter=request.cookieBank;
		cookiesPerSecond=request.cookiesPerSecond;
		crunchNumbers();
		didIanswer=true;
	}
	if(request.MyType == "statsUpdate"){
		console.debug("received stats update");
		cookiesAllTime=request.cookiesAllTime;
		cookiesPrevious=request.cookiesPrevious;
		statsLastUpdated = Date();
		crunchNumbers();
		didIanswer=true;
	}
	if(request.MyType == "productUpdate"){
		console.debug("received products update");
		product[0].price=request.cursorPrice;
		product[0].owned=request.cursorOwned;
		product[1].price=request.grandmaPrice;
		product[1].owned=request.grandmaOwned;
		product[2].price=request.farmPrice;
		product[2].owned=request.farmOwned;
		product[3].price=request.factoryPrice;
		product[3].owned=request.factoryOwned;
		product[4].price=request.minePrice;
		product[4].owned=request.mineOwned;
		product[5].price=request.shipmentPrice;
		product[5].owned=request.shipmentOwned;
		product[6].price=request.alchemyPrice;
		product[6].owned=request.alchemyOwned;
		product[7].price=request.portalPrice;
		product[7].owned=request.portalOwned;
		product[8].price=request.tardisPrice;
		product[8].owned=request.tardisOwned;
		product[9].price=request.hadronPrice;
		product[9].owned=request.hadronOwned;
		
		crunchNumbers();
		didIanswer=true;
	}
	if(request.MyType == "popupUpdateRequest"){
		console.debug("received popup update request");
		popupUpdate();
		didIanswer=true;
	}
	if(didIanswer)
		sendResponse();
});

function getCookieData(){
	console.debug("sending cookie data request")
	chrome.tabs.sendMessage(MyTabID,{
		"MyType":"cookieDataRequest"
		},function(response,sender,sendResponse){}
	);
}