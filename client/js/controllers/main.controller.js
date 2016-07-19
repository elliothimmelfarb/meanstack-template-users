// MainController
(() => {
  angular
    .module('myApp')
    .controller('MainController', MainController);

  function MainController(User, $state) {
    const vm = this;
    vm.isAuthenticated = isAuthenticated;
    vm.username = getUsername();
    vm.logout = logout;

    function getUsername() {
      return User.getUsername();
    }

    function isAuthenticated() {
      return User.isAuthenticated();
    }

    function logout() {
      User.logout()
        .then(() => {
          $state.go('home');
        });
    }
  }
})();
