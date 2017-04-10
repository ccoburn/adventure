angular.module('app').controller('homeCtrl', function($scope){

$scope.earthquake = function() {
  document.querySelector('.story-block').classList.add('shake-chunk')
}


});
