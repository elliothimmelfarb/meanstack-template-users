(() => {
  angular
    .module('myApp')
    .controller('RegisterController', RegisterController);

  function RegisterController(SweetAlert, User, $state) {
    const vm = this;
    vm.submit = submit;

    function submit(userObj) {
      if (userObj.password !== userObj.password2) {
        vm.user.password = null;
        vm.user.password2 = null;
        SweetAlert.swal('Passwords must match. Try again.');
      }
      User.register(userObj)
        .then(() => {
          $state.go('login');
        })
        .catch(err => {
          vm.user.password = null;
          vm.user.password2 = null;
          vm.user.email = null;
          vm.user.username = null;
          SweetAlert.swal('Registration failed:', err.data.error);
        });
    }
  }
})();
