// This code utilizes the Google API the Places library.
// <script src="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places">
function populateClinicPage() {
  var clinic = JSON.parse(sessionStorage.getItem('clinic'));
  var myLatLng = {lat: clinic.geometry.location.lat, lng: clinic.geometry.location.lng};
  var marker;

  document.getElementById('nav-button').href="/home";
  document.getElementById('header').innerText = clinic.name;
  if(document.getElementById('map')) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng,
        mapTypeControl: false,
        panControl: true,
        zoomControl: true,
        streetViewControl: false
      });

    marker = new google.maps.Marker({
      position: myLatLng,
      map: map
    });
  }

  if(document.getElementById('clinicInfo')) {
    document.getElementById('clinicInfo').innerHTML = "<p>" + clinic.name + "</br>" + clinic.formatted_address + "</br>" + clinic.formatted_phone_number +
    "</br>" + clinic.website + "</p>";
  }
}

function reviewClinic() {
    var rev = {};
    rev.rating = document.getElementById('rating').value;
    rev.review = document.getElementById('review').value;
    if (rev.rating == 1) {
    rev.rating = "★";
} else if (rev.rating == 2) {
    rev.rating = "★★";
} else if (rev.rating == 3) {
    rev.rating = "★★★";
}else if (rev.rating == 4) {
    rev.rating = "★★★★";
}else if (rev.rating == 5) {
    rev.rating = "★★★★★";
};
    sessionStorage.setItem('review', JSON.stringify(rev));
    $("#post").click(function(){
        $("#reviewTable").append("<tr><th>April 22, 2016</th><th>Overall Rating</th></tr><tr><td>by a Verified Patient</td><td>" + rev.rating +"</td></tr><tr><td></td><td colspan='2'>" + rev.review + "</td></tr>");
    });
}

function loadReviews() {
  var rev = JSON.parse(sessionStorage.getItem('review'));
  if(rev) {
    $("#reviewTable").append("<tr><th>April 22, 2016</th><th>Overall Rating</th></tr><tr><td>by a Verified Patient</td><td>" + rev.rating +"</td></tr><tr><td></td><td colspan='2'>" + rev.review + "</td></tr>");
  }
}
