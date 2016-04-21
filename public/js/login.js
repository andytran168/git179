function saveUser() {
  var user = {};
  user.first = document.getElementById('first').value;
  user.last = document.getElementById('last').value;
  user.insurance = document.getElementById('insurance').value;
  user.username = document.getElementById('username').value;
  sessionStorage.setItem("user", JSON.stringify(user));
  window.location= "http://" + document.location.host + "/home";
}
