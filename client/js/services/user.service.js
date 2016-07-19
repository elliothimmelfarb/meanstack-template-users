(() => {
  angular
    .module('myApp')
    .service('User', User);

  function User($http, $auth) {
    this.login = login;
    this.register = register;
    this.getProfile = getProfile;
    this.logout = logout;
    this.isAuthenticated = isAuthenticated;
    this.getUsername = getUsername;

    function isAuthenticated() {
      return $auth.isAuthenticated();
    }

    function getUsername() {
      return $auth.getPayload().username;
    }

    function logout() {
      return $auth.logout()
        .then(() => {
          this.currentUser = null;
        });
    }

    function getProfile() {
      return $http.get('api/users/profile');
    }

    function register(userObj) {
      return $auth.signup(userObj);
    }

    function login(userObj) {
      return $auth.login(userObj);
    }
  }
})();
