(() => {
  angular
    .module('myApp')
    .controller('LoginController', LoginController);

  function LoginController(SweetAlert, User) {
    const vm = this;
    vm.submit = login;

    function login(userObj) {
      User.login(userObj)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          vm.user.email = null;
          vm.user.password = null;
          SweetAlert.swal('Login Failed:', err.data.error);
        });
    }
  }
})();
