function populatePage() {
  if(sessionStorage.getItem('user')) {
    var user = JSON.parse(sessionStorage.getItem('user'));
    var update = '<li class="ui-li-has-thumb ui-first-child"><a href="/patientinfo" class="ui-btn ui-btn-icon-right ui-icon-carat-r"><img src="img/ph.png" alt="Image"><h2>' + user.name + '</h2><p>6 minutes</p></a></li>' + document.getElementById('patientlist').innerHTML;
    document.getElementById('patientlist').innerHTML = update;
  }
}

$(document).ready(populatePage());
