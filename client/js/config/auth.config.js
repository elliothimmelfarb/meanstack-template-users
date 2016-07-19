(() => {
  angular
  .module('myApp')
    .config(auth);

  function auth($authProvider) {
    const authP = $authProvider;
    authP.loginUrl = '/api/users/login';
    authP.signupUrl = '/api/users/register';

    authP.facebook({
      clientId: '282619428795743',
      url: '/api/users/facebook',
    });
  }
})();
