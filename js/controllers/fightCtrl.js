angular.module('app').controller('fightCtrl', function($scope, monsterService, rollService, storyService, classService, $stateParams, $location, $anchorScroll) {

  $scope.toTop = function() {
        $location.hash('top');
        $anchorScroll();
      }

$scope.showSpells = function() {
  if ($scope.stats.character === "Wizard") {
    $scope.wizardSpells = true;
  }
  if ($scope.stats.character === "Cleric") {
    $scope.clericSpells = true;
  }
}

// rolls
$scope.roll20You = function() {
  $scope.d20Result = rollService.roll20();
  if ($scope.d20Result == 20) {
    $scope.special = "Critical Hit!";
    $scope.specialShow = true;
  } else if ($scope.d20Result == 1) {
    $scope.special = "Pathetic!";
    $scope.specialShow = true;
  } else {
  $scope.special = "";
}
}
$scope.special = '';

$scope.removeSpin = function() {
  $scope.spin = false;
}

$scope.roll20Them = function() {
  $scope.d20ThemResult = rollService.roll20();
  return $scope.d20ThemResult;
}

  $scope.roll6two = function() {
    $scope.result6two = rollService.roll6two();
    return $scope.result6two;
  }

  $scope.roll8two = function() {
    $scope.result8two = rollService.roll8two();
    return $scope.result8two;
  }
  $scope.roll8three = function() {
    $scope.result8three = rollService.roll8three();
    return $scope.result8three;
  }


// monsters
  $scope.getMonsters = function() {
      monsterService.getData().then(function(response) {
      $scope.monster = response;
    });
  }

  $scope.getMonsters();

// story
$scope.getStats = classService.stats;


  $scope.getChapters = function() {
    for (var i = 0;i<storyService.chapters.length;i++) {
      if (storyService.chapters[i].id == $stateParams.id) {
        $scope.chapter = storyService.chapters[i];
        for (var j =0; j<$scope.getStats.length; j++) {
          if ($scope.getStats[j].character === $scope.chapter.character) {
            $scope.stats = $scope.getStats[j];
          }
        }
      }
    }
  }
$scope.getChapters()


// fight

$scope.fight = function() {
  var swing = $scope.roll20Them() + $scope.monster.strength;
  var hit = $scope.roll6two();
  if ($scope.monster.hit_dice === "2d8") {
    hit = $scope.roll8two();
  }
  if ($scope.monster.hit_dice === "3d8" || $scope.monster.hit_dice === "5d8" || $scope.monster.hit_dice === "4d10" || $scope.monster.hit_dice === "6d8") {
    hit = $scope.roll8three();
  }
  if (swing >= $scope.stats.armor_class) {
    $scope.stats.hit_points = $scope.stats.hit_points - hit;
    $scope.result1 = "The " + $scope.monster.name + " hit you for " + hit + " points.";
    $scope.turn = "Your turn";
  }
  if (swing < $scope.stats.armor_class) {
    $scope.result1 = "The " + $scope.monster.name + " missed!";
    $scope.turn = "Your turn";
  }
  if ($scope.stats.hit_points <= 0) {
    $scope.youDied = "You died";
    $scope.over = true;
    $scope.died = true;
    $scope.stats.hit_points = 0;
    $scope.turn = "";
    $scope.theEnd= true

  }

}

$scope.fightSp1 = function() {
  var cast = $scope.d20Result + 5;
  var hit = $scope.stats.spell1Damage();
  if (cast - 5 === 20) {
    hit = hit * 2;
  }
  if (cast - 5 === 1) {
    $scope.result2 = "You missed!";
  }
  if (cast >= $scope.monster.armor_class) {
    $scope.monster.hit_points = $scope.monster.hit_points - hit;
    $scope.result2 = "The " + $scope.monster.name + " was hit for " + hit + " points.";
  }
  if (cast < $scope.monster.armor_class) {
    $scope.result2 = "You missed!";
}
  if ($scope.monster.hit_points > 0 ) {
    $scope.fight();
  }
  if ($scope.monster.hit_points <= 0) {
    $scope.youWon = "You killed the " + $scope.monster.name;
    $scope.over = true;
    $scope.won = true;
    $scope.monster.hit_points = 0;
    $scope.turn = ""
    $scope.theEnd= true
  }

}

$scope.fightSp2 = function() {
  var cast = $scope.d20Result + 5;
  var hit = $scope.stats.spell2Damage();
  if (cast - 5 === 20) {
    hit = hit * 2;
  }
  if (cast - 5 === 1) {
    $scope.result2 = "You missed!";
  }
  if (cast >= $scope.monster.armor_class) {
    $scope.monster.hit_points = $scope.monster.hit_points - hit;
    $scope.result2 = "The " + $scope.monster.name + " was hit for " + hit + " points.";
  }
  if (cast < $scope.monster.armor_class) {
    $scope.result2 = "You missed!";
}
if ($scope.monster.hit_points > 0 ) {
  $scope.fight();
}
if ($scope.monster.hit_points <= 0) {
  $scope.youWon = "You killed the " + $scope.monster.name;
  $scope.over = true;
  $scope.won= true;
  $scope.monster.hit_points = 0;
  $scope.turn = ""
  $scope.theEnd= true
}
}

$scope.fightSp3 = function() {
  var cast = $scope.d20Result + 5;
  var hit = $scope.stats.spell3Damage();
  if (cast - 5 === 20) {
    hit = hit * 2;
  }
  if (cast - 5 === 1) {
    $scope.result2 = "You missed!";
  }
  if (cast >= $scope.monster.armor_class) {
    $scope.monster.hit_points = $scope.monster.hit_points - hit;
    $scope.result2 = "The " + $scope.monster.name + " was hit for " + hit + " points.";
  }
  if (cast < $scope.monster.armor_class) {
    $scope.result2 = "You missed!";
}
if ($scope.monster.hit_points > 0 ) {
  $scope.fight();
}
if ($scope.monster.hit_points <= 0) {
  $scope.youWon = "You killed the " + $scope.monster.name;
  $scope.over = true;
  $scope.won = true;
  $scope.monster.hit_points = 0;
  $scope.turn = ""
  $scope.theEnd= true
}
}

$scope.options = function() {
  if ($scope.chapter.button2lnk === "") {
    console.log($scope.chapter.button2lnk);
    $scope.twoOptions = false;
  }
    else {$scope.twoOptions = true;
    }
  }



})
