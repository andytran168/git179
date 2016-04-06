function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
    center: {lat: 42.377, lng: -71.1167},
    zoom: 15
    });
    marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(42.377,-71.1167)});
}