angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'home.html',
    controller: 'homeCtrl'
  })
  .state('cleric', {
    url: "/cleric",
    templateUrl: './cleric/views/clericMain.html',
    controller: 'clericMainCtrl'
  })
  .state('druid', {
    url: "/druid",
    templateUrl: './druid/views/druidMain.html',
    controller: 'druidMainCtrl'
  })
  .state('wizard', {
    url: "/wizard",
    templateUrl: './wizard//views/wizMain.html',
    controller: 'wizMainCtrl'
  })


});
