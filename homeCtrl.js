angular.module('app').controller('homeCtrl', function($scope, spellsService, rollService, monsterService){

$scope.earthquake = function() {
  document.querySelector('body').classList.add('shake-chunk')
}

$scope.getSpells = function() {
  spellsService.getSpells().then(function(response){
    $scope.spellsService = response;

  })
  }
  $scope.getSpells();
  $scope.roll6More = rollService.roll6More(8);
  $scope.getMonsters = function() {
    monsterService.getData().then(function(response) {
    $scope.monsters = response;
  });
}
  $scope.getMonsters();
});
