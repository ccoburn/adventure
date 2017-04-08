angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'home.html',
    controller: 'homeCtrl'
  })
  .state('one', {
    url: "/one/:id",
    templateUrl: './views/one.html',
    controller: 'oneOptionCtrl'
  })
  .state('two', {
    url: "/two/:id",
    templateUrl: './views/two.html',
    controller: 'twoOptionsCtrl'
  })
  .state('three', {
    url: "/three/:id",
    templateUrl: './views/three.html',
    controller: 'threeOptionsCtrl'
  })
  .state('fight', {
    url: '/fight/:id',
    templateUrl: './views/fight.html',
    controller: 'fightCtrl'
  })


});
