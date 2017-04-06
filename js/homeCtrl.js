angular.module('app').controller('homeCtrl', function($scope){

$scope.earthquake = function() {
  document.querySelector('body').classList.add('shake-chunk')
}


});
