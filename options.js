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

function save_options() {

	var showCookieBankEnabled = (document.getElementById("showCookieBank").checked);
	localStorage["showCookieBank"] = showCookieBankEnabled;
	
	var showCCShortcutEnabled = (document.getElementById("showCCShortcut").checked);
	localStorage["showCCShortcut"] = showCCShortcutEnabled;
	
	var showGoldenCookieEnabled = (document.getElementById("showGoldenCookie").checked);
	localStorage["showGoldenCookie"] = showGoldenCookieEnabled;
	
	var alertType = 0;
	var alertTypeSelect = document.getElementById("alertType");
	var purchaseAlertTimeout = 0;
	var purchaseAlertTimeoutSelect = document.getElementById("purchaseAlertTimeout");
	
	for(var which = 0; which < alertTypeSelect.length; which++){
		if(alertTypeSelect[which].selected == true){
			localStorage["alertType"] = which;
			break;
		}
	}
	
	for(var which = 0; which < purchaseAlertTimeoutSelect.length; which++){
		if(purchaseAlertTimeoutSelect[which].selected == true){
			localStorage["purchaseAlertTimeout"] = purchaseAlertTimeoutSelect[which].value;
			break;
		}
	}

	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
	update_notes();
}

// Restores select box state to saved value from localStorage.
function restore_options() {
	//defaults to selected if no value found
	var showCookieBankEnabled = document.getElementById("showCookieBank");
	if(localStorage["showCookieBank"] == "false")
		showCookieBankEnabled.checked = false;
	else
		showCookieBankEnabled.checked = true;
	
	var showCCShortcut = document.getElementById("showCCShortcut");
	if(localStorage["showCCShortcut"] == "false")
		showCCShortcut.checked = false;
	else
		showCCShortcut.checked = true;
	
	var showGoldenCookieEnabled = document.getElementById("showGoldenCookie");
	if(localStorage["showGoldenCookie"] == "false")
		showGoldenCookieEnabled.checked = false;
	else
		showGoldenCookieEnabled.checked = true;
	
	var alertType = localStorage["alertType"];
	var alertTypeSelect = document.getElementById("alertType");
	var purchaseAlertTimeout = localStorage["purchaseAlertTimeout"];
	var purchaseAlertTimeoutSelect = document.getElementById("purchaseAlertTimeout");
	
	alertTypeSelect[alertType].selected = true;
	
	for(var which = 0; which < purchaseAlertTimeoutSelect.length; which++){
		if(purchaseAlertTimeoutSelect[which].value == purchaseAlertTimeout){
			purchaseAlertTimeoutSelect[which].selected = true;
		}else
		purchaseAlertTimeoutSelect[which].selected = false;
	}
	update_notes();
}

function update_notes(){
	var alertType = localStorage["alertType"];
	configNotes.innerHTML="";
	if(alertType == 1)
		configNotes.innerHTML+=("<li>Desktop alerts do not show if the Cookie Clicker game is front and center.");
	if(localStorage["showGoldenCookie"] == "true")
		configNotes.innerHTML+=("<li>Golden Cookie alerts only show if alerts are enabled above.");		
	if(alertType == 0)
		areAlertsEnabled.hidden=true;
	else
		areAlertsEnabled.hidden=false;
	if(localStorage["changeLogClicked"] == "true")
		changeLog.hidden = true;
	else{
		changeLog.hidden = false;
		changeLog.onclick=function(){
			changeLog.hidden = true;
			localStorage["changeLogClicked"] = "true";
		};
	}
}

function set_defaults(){
	var changeLogClicked = localStorage["changeLogClicked"];
	localStorage.clear();
	localStorage["showCookieBank"] = true;
	localStorage["showCCShortcut"] = true;
	localStorage["showGoldenCookie"] = true;
	localStorage["alertType"] = 0;
	localStorage["purchaseAlertTimeout"] = 30;
	localStorage["changeLogClicked"] = changeLogClicked;
	restore_options();
}

document.addEventListener('DOMContentLoaded', function(){
	if(localStorage.length <= 1)
		set_defaults();
	else
		restore_options();
});
document.onchange=save_options;
document.querySelector('#reset').addEventListener('click', function(){ 
	set_defaults();
	restore_options();
	});