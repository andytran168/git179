// This code utilizes the Google API the Places library.
// <script src="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places">
function populateClinicPage() {
  var clinic = JSON.parse(sessionStorage.getItem('clinic'));
  var myLatLng = {lat: clinic.geometry.location.lat, lng: clinic.geometry.location.lng};
  var marker;

  document.getElementById('nav-button').href="/home";
  document.getElementById('header').innerText = clinic.name;

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

  if(document.getElementById('clinicInfo')) {
    document.getElementById('clinicInfo').innerHTML = "<p>" + clinic.name + "</br>" + clinic.formatted_address + "</br>" + clinic.formatted_phone_number +
    "</br>" + clinic.website + "</p>";
  }
}
