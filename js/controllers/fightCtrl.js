angular.module('app').controller('fightCtrl', function($scope, monsterService, spellsService, rollService, storyService) {

  $scope.getSpells = function() {
    spellsService.getSpells().then(function(response){
      $scope.spellsService = response;

    })
    }
  $scope.getSpells();

  $scope.roll6More = function() {
    rollService.roll6More(8);
  }
  $scope.roll20 = function() {
    $scope.d20Result = rollService.roll20();
    if ($scope.d20Result == 20) {
      $scope.d20Result = $scope.d20Result + " Critical Hit!";
    } else if ($scope.d20Result == 1) {
      $scope.d20Result = $scope.d20Result + " You failed!";
    }
  }


  $scope.getMonsters = function() {
      monsterService.getData().then(function(response) {
      $scope.monster = response;
    });
  }

  $scope.getMonsters();

})
