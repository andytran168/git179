function populateUserPage() {
  if(sessionStorage.getItem('user')) {
    var user = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById('name').innerText = user.first + " " + user.last;
    document.getElementById('age').innerText = user.age;
    document.getElementById('gender').innerText = user.gender;
    document.getElementById('location').innerText = "Boston, MA";
    document.getElementById('insurance').innerText = user.insurance;
  }
}

$(document).ready(populateUserPage());
