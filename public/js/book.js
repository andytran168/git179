var patient = {
 name: "Max",
 distance: "1.4 mile",
 photo: "img/ph.png"
};


$(document).ready(function() {
	"use strict";
	$("#book").click(function() {
		localStorage.setItem("patient",JSON.stringify(patient));	
	});
	});
    
	
 
 