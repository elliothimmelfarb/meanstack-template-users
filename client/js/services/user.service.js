(() => {
  angular
    .module('myApp')
    .service('User', User);

  function User($http, $q, $auth) {
    this.currentUser = {};
    this.login = login;
    this.register = register;
    this.getProfile = getProfile;

    function getProfile() {
      return $http.get('api/user/profile');
    }

    function register(userObj) {
      return $auth.signup(userObj);
    }

    function login(userObj) {
      return $auth.login(userObj);
    }
  }
})();
