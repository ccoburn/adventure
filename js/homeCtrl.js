angular.module('app').controller('homeCtrl', function($scope, $location, $anchorScroll){

$scope.earthquake = function() {
  document.querySelector('.story-block').classList.add('shake-chunk')
}

$scope.toTop = function() {
      $location.hash('top');
      $anchorScroll();
}

});
