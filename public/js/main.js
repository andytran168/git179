function populatePageHeader() {
  if(sessionStorage.getItem('user')) {
    document.getElementById('login-button').innerText = "Profile";
    document.getElementById('login-button').href = "/user";
  }
}
