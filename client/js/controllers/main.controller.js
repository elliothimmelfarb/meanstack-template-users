// MainController
(() => {
  angular
    .module('myApp')
    .controller('MainController', MainController);

  function MainController() {
    console.log('MainController!');
    const vm = this;
    vm.name = 'trang';
  }
})();
