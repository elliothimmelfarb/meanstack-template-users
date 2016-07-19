(() => {
  angular
    .module('myApp')
    .controller('ProfileController', ProfileController);

  function ProfileController(CurrentUser) {
    const vm = this;

    activate();

    function activate() {
      vm.currentuser = CurrentUser; // eslint-disable-line no-param-reassign
    }
  }
})();
