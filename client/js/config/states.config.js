(() => {
  angular
  .module('myApp')
    .config(states);

  function states($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/html/home.html',
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/register.html',
      controller: 'RegisterController',
      controllerAs: 'register',
    })
    .state('login', {
      url: '/login',
      templateUrl: '/html/login.html',
      controller: 'LoginController',
      controllerAs: 'login',
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '/html/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profile',
      resolve: {
        CurrentUser: (User) => User.getProfile(),
      },
    });
    $urlRouterProvider.otherwise('/');
  }
})();
