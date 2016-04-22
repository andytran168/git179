// This code utilizes the Google API the Places library.
// <script src="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places">

var map, places, infoWindow;
var service;
var markers = [];
var autocomplete;
var countryRestrict = {'country': 'us'};
var MARKER_PATH = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');
var mapPosition = {};

var countries = {
'us': {
    center: {lat: 38.2, lng: -89.7},
    zoom: 4
}
};

function showPostion(pos) {
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
      mapTypeControl: false,
      panControl: true,
      zoomControl: false,
      streetViewControl: false
    });
  infoWindow = new google.maps.InfoWindow({
      content: document.getElementById('info-content')

  });
  var Cambridge = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude)
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: Cambridge,
    radius: 1000,
    type: ['hospital']
  }, callback);


function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {

    clearResults();
    clearMarkers();
    // Make marker for each clinic
    for (var i = 0; i < results.length; i++) {
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
        var markerIcon = MARKER_PATH + markerLetter + '.png';
        // Animate dropping the icons  on the map.
        markers[i] = new google.maps.Marker({
        position: results[i].geometry.location,
        animation: google.maps.Animation.DROP,
        icon: markerIcon
        });
        // If user clicks a clinic marker, show the details of that clinic
        markers[i].placeResult = results[i];
        google.maps.event.addListener(markers[i], 'click', showInfoWindow);
        setTimeout(dropMarker(i), i * 100);
        addResult(results[i], i);
    }
    }
  }
}

  autocomplete = new google.maps.places.Autocomplete(
                  (
          document.getElementById('autocomplete')), {
          types: ['(cities)'],
          componentRestrictions: countryRestrict
      });

  places = new google.maps.places.PlacesService(map);

  autocomplete.addListener('place_changed', onPlaceChanged);
}




function initMap() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPostion);
} else {
    console.log("Unable to get location from device");
  }
}


function initClinicMap(placeid) {
  var mpa = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: 41.2, lng: -89.7},
      mapTypeControl: false,
      panControl: true,
      zoomControl: false,
      streetViewControl: false
    });
  var request = {
    placeId: placeid
  };
  var service = new google.maps.places.PlacesService(mpa);
  service.getDetails(request, getPlaceInfo);
}

function getPlaceInfo(place, status) {
  if(status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(place);
  }
}

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
var place = autocomplete.getPlace();
console.log(place);
if (place.geometry) {
    map.panTo(place.geometry.location);
    map.setZoom(15);
    search();
} else {
    document.getElementById('autocomplete').placeholder = 'Enter a city';
}
}

// Search for clinics in the selected city, within the viewport of the map.
function search() {
var search = {
    bounds: map.getBounds(),
    types: ['hospital']
};

places.nearbySearch(search, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
    clearResults();
    clearMarkers();
    // Make marker for each clinic
    for (var i = 0; i < results.length; i++) {
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
        var markerIcon = MARKER_PATH + markerLetter + '.png';
        // Animate dropping the icons  on the map.
        markers[i] = new google.maps.Marker({
        position: results[i].geometry.location,
        animation: google.maps.Animation.DROP,
        icon: markerIcon
        });
        // If user clicks a clinic marker, show the details of that clinic
        markers[i].placeResult = results[i];
        google.maps.event.addListener(markers[i], 'click', showInfoWindow);
        setTimeout(dropMarker(i), i * 100);
        addResult(results[i], i);
    }
    }
});
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
      if (markers[i]) {
      markers[i].setMap(null);
      }
  }
  markers = [];
}

function dropMarker(i) {
  return function() {
      markers[i].setMap(map);
  };
}

function addResult(result, i) {
  var results = document.getElementById('results');
  var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
  var markerIcon = MARKER_PATH + markerLetter + '.png';

  var tr = document.createElement('tr');
  tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
  tr.onclick = function() {
      google.maps.event.trigger(markers[i], 'click');
  };

  var iconTd = document.createElement('td');
  var nameTd = document.createElement('td');
  var icon = document.createElement('img');
  icon.src = markerIcon;
  icon.setAttribute('class', 'placeIcon');
  icon.setAttribute('className', 'placeIcon');
  var name = document.createTextNode(result.name);
  iconTd.appendChild(icon);
  nameTd.appendChild(name);
  tr.appendChild(iconTd);
  tr.appendChild(nameTd);
  results.appendChild(tr);
}

function clearResults() {
  var results = document.getElementById('results');
  while (results.childNodes[0]) {
      results.removeChild(results.childNodes[0]);
  }
}

// Get the]details for a clinic. Show the information in an info window
function showInfoWindow() {
  var marker = this;
  places.getDetails({placeId: marker.placeResult.place_id},
      function(place, status) {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
          }
          infoWindow.open(map, marker);
          buildIWContent(place);
      });
}

// put clinic information into the HTML elements used by the info window.
function buildIWContent(place) {
  sessionStorage.setItem('clinic', JSON.stringify(place));
  document.getElementById('iw-icon').innerHTML = '<img class="clinicIcon" ' +
      'src="' + place.icon + '"/>';
  document.getElementById('iw-url').innerHTML = '<b><a href="' + "/clinic" +
      '">' + place.name + '</a></b>';
  document.getElementById('iw-address').textContent = place.vicinity;
  if (place.formatted_phone_number) {
      document.getElementById('iw-phone-row').style.display = '';
      document.getElementById('iw-phone').textContent =
          place.formatted_phone_number;
  } else {
      document.getElementById('iw-phone-row').style.display = 'none';
  }

  // The regexp isolates the first part of the URL (domain plus subdomain)
  // to give a short URL for displaying in the info window.
  if (place.website) {
      var fullUrl = place.website;
      var website = hostnameRegexp.exec(place.website);
      if (website === null) {
      website = 'http://' + place.website + '/';
      fullUrl = website;
      }
      document.getElementById('iw-website-row').style.display = '';
      document.getElementById('iw-website').textContent = website;
  } else {
      document.getElementById('iw-website-row').style.display = 'none';
  }
  /*document.getElementById('iw-review').innerHTML = '<a href=' + "/clinic3" +
      '>' + "Review" + '</a>';*/
}

function populateClinicPage() {
  populatePageHeader();
  document.getElementById('nav-button').href="/home";
  var clinic = JSON.parse(sessionStorage.getItem('clinic'));
  document.getElementById('header').innerText = clinic.name;
  if(document.getElementById('clinicInfo')) {
    document.getElementById('clinicInfo').innerHTML = "<p>" + clinic.name + "</br>" + clinic.formatted_address + "</br>" + clinic.formatted_phone_number +
    "</br>" + clinic.website + "</p>";
  }
}

function initClinicMap1 () {
  var clinic = JSON.parse(sessionStorage.getItem('clinic'));
  var myLatLng = {lat: clinic.geometry.location.lat, lng: clinic.geometry.location.lng};
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: myLatLng,
      mapTypeControl: false,
      panControl: true,
      zoomControl: true,
      streetViewControl: false
    });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });
  }

function populatePageHeader() {
  if(sessionStorage.getItem('user')) {
    document.getElementById('login-button').innerText = "Profile";
    document.getElementById('login-button').href = "/user";
  }
}

function saveUser() {
  var user = {};
  user.first = document.getElementById('first').value;
  user.last = document.getElementById('last').value;
  user.insurance = document.getElementById('insurance').value;
  user.username = document.getElementById('username').value;
  sessionStorage.setItem("user", JSON.stringify(user));
  window.location= "http://" + document.location.host + "/home";
}





function reviewClinic() {
    rev = {};
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
        $("#reviewTable").append("<tr><th>April 22, 2016</th><th>Overall Rating</th></tr><tr><td>by a Verified Patient</td><td>" + 
  rev.rating +"</td></tr><tr><td></td><td colspan='2'>" + rev.review + "</td></tr>");
    }); 
}

function populatePageHeader() {
  if(sessionStorage.getItem('user')) {
    document.getElementById('login-button').innerText = "Profile";
    document.getElementById('login-button').href = "/user";
  }
}

