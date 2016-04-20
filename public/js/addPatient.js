




$(document).ready(function() {
	
	var retrievedPatient=localStorage.getItem("patient");
	var patient=JSON.parse(retrievedPatient);
	 <li><a href="/patientinfo"><img src="img/ph.png" alt="Image" /><h2>Joanne Doe</h2> <p>1.2 mile</p></a></li>
	 
	var html='<li><a href="/patientinfo"><img src="'+patient.photo+'" alt="Image" /><h2>'+patient.name+'</h2> <p>'+patient.distance+'</p></a></li>';
	
	$("#patientsin").append(html);
	
		
	});
	