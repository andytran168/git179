function saveUser() {
  var user = {};
  user.name = document.getElementById('first').value + " " + document.getElementById('last').value;
  user.age = document.getElementById('age').value;
  user.gender = document.getElementById('gender')
  user.insurance = document.getElementById('insurance').value;
  user.username = document.getElementById('username').value;
  sessionStorage.setItem("user", JSON.stringify(user));
  window.location= "http://" + document.location.host + "/home";
}
