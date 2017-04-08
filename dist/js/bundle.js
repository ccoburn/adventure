'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'home.html',
    controller: 'homeCtrl'
  }).state('one', {
    url: "/one/:id",
    templateUrl: './views/one.html',
    controller: 'oneOptionCtrl'
  }).state('two', {
    url: "/two/:id",
    templateUrl: './views/two.html',
    controller: 'twoOptionsCtrl'
  }).state('three', {
    url: "/three/:id",
    templateUrl: './views/three.html',
    controller: 'threeOptionsCtrl'
  }).state('fight', {
    url: '/fight/:id',
    templateUrl: './views/fight.html',
    controller: 'fightCtrl'
  });
});
'use strict';

angular.module('app').controller('homeCtrl', function ($scope) {

  $scope.earthquake = function () {
    document.querySelector('body').classList.add('shake-chunk');
  };
});
'use strict';

angular.module('app').controller('fightCtrl', function ($scope, monsterService, rollService, storyService, classService, $stateParams) {

  // rolls
  $scope.roll20You = function () {
    $scope.d20Result = rollService.roll20();
    if ($scope.d20Result == 20) {
      $scope.special = "Critical Hit!";
    } else if ($scope.d20Result == 1) {
      $scope.special = "Pathetic!";
    } else {
      $scope.special = "";
    }
  };
  $scope.special = '';

  $scope.removeSpin = function () {
    $scope.spin = false;
  };

  $scope.roll20Them = function () {
    $scope.d20ThemResult = rollService.roll20();
    return $scope.d20ThemResult;
  };

  $scope.roll6two = function () {
    $scope.result6two = rollService.roll6two();
    return $scope.result6two;
  };

  $scope.roll8two = function () {
    $scope.result8two = rollService.roll8two();
    return $scope.result8two;
  };
  $scope.roll8three = function () {
    $scope.result8three = rollService.roll8three();
    return $scope.result8three;
  };

  // monsters
  $scope.getMonsters = function () {
    monsterService.getData().then(function (response) {
      $scope.monster = response;
    });
  };

  $scope.getMonsters();

  // story
  $scope.getStats = classService.stats;

  $scope.getChapters = function () {
    for (var i = 0; i < storyService.chapters.length; i++) {
      if (storyService.chapters[i].id == $stateParams.id) {
        $scope.chapter = storyService.chapters[i];
        for (var j = 0; j < $scope.getStats.length; j++) {
          if ($scope.getStats[j].character === $scope.chapter.character) {
            $scope.stats = $scope.getStats[j];
          }
        }
      }
    }
  };
  $scope.getChapters();

  // fight

  $scope.fight = function () {
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
      $scope.result1 = "You were hit for " + hit + " points.";
      $scope.turn = "Your turn";
    }
    if (swing < $scope.stats.armor_class) {
      $scope.result1 = "The " + $scope.monster.name + " missed!";
      $scope.turn = "Your turn";
    }
    if ($scope.stats.hit_points <= 0) {
      $scope.result2 = "You died";
      $scope.over = true;
      $scope.died = true;
      $scope.stats.hit_points = 0;
    }
    $scope.turn = "";
  };

  $scope.fightSp1 = function () {
    var cast = $scope.d20Result + 5;
    var hit = $scope.stats.spell1Damage();
    if (cast - 5 === 20) {
      hit = hit * 2;
    }
    if (cast - 5 === 1) {
      $scope.result2 = "You " + $scope.monster.name + " missed!";
    }
    if (cast >= $scope.monster.armor_class) {
      $scope.monster.hit_points = $scope.monster.hit_points - hit;
      $scope.result2 = "The " + $scope.monster.name + " was hit for " + hit + " points.";
    }
    if (cast < $scope.monster.armor_class) {
      $scope.result2 = "You missed!";
    }
    if ($scope.monster.hit_points > 0) {
      $scope.fight();
    }
    if ($scope.monster.hit_points <= 0) {
      $scope.result2 = "You killed the " + $scope.monster.name;
      $scope.over = true;
      $scope.won = true;
      $scope.monster.hit_points = 0;
    }
  };

  $scope.fightSp2 = function () {
    var cast = $scope.d20Result + 5;
    var hit = $scope.stats.spell2Damage();
    if (cast - 5 === 20) {
      hit = hit * 2;
    }
    if (cast - 5 === 1) {
      $scope.result2 = "You " + $scope.monster.name + " missed!";
    }
    if (cast >= $scope.monster.armor_class) {
      $scope.monster.hit_points = $scope.monster.hit_points - hit;
      $scope.result2 = "The " + $scope.monster.name + " was hit for " + hit + " points.";
    }
    if (cast < $scope.monster.armor_class) {
      $scope.result2 = "You missed!";
    }
    if ($scope.monster.hit_points > 0) {
      $scope.fight();
    }
    if ($scope.monster.hit_points <= 0) {
      $scope.result2 = "You killed the " + $scope.monster.name;
      $scope.over = true;
      $scope.won = true;
      $scope.monster.hit_points = 0;
    }
  };

  $scope.fightSp3 = function () {
    var cast = $scope.d20Result + 5;
    var hit = $scope.stats.spell3Damage();
    if (cast - 5 === 20) {
      hit = hit * 2;
    }
    if (cast - 5 === 1) {
      $scope.result2 = "You " + $scope.monster.name + " missed!";
    }
    if (cast >= $scope.monster.armor_class) {
      $scope.monster.hit_points = $scope.monster.hit_points - hit;
      $scope.result2 = "The " + $scope.monster.name + " was hit for " + hit + " points.";
    }
    if (cast < $scope.monster.armor_class) {
      $scope.result2 = "You missed!";
    }
    if ($scope.monster.hit_points > 0) {
      $scope.fight();
    }
    if ($scope.monster.hit_points <= 0) {
      $scope.result2 = "You killed the " + $scope.monster.name;
      $scope.over = true;
      $scope.won = true;
      $scope.monster.hit_points = 0;
    }
  };

  $scope.options = function () {
    if ($scope.chapter.button2lnk === "") {
      console.log($scope.chapter.button2lnk);
      $scope.twoOptions = false;
    } else {
      $scope.twoOptions = true;
    }
  };
});
'use strict';

angular.module('app').controller('oneOptionCtrl', function ($scope, storyService, $stateParams) {

  $scope.getChapters = function () {
    for (var i = 0; i < storyService.chapters.length; i++) {
      if (storyService.chapters[i].id == $stateParams.id) {
        $scope.chapter = storyService.chapters[i];
      }
    }
  };
  $scope.getChapters();
});
'use strict';

angular.module('app').controller('threeOptionsCtrl', function ($scope, storyService, $stateParams) {

  $scope.getChapters = function () {
    for (var i = 0; i < storyService.chapters.length; i++) {
      if (storyService.chapters[i].id == $stateParams.id) {
        $scope.chapter = storyService.chapters[i];
      }
    }
  };
  $scope.getChapters();
});
'use strict';

angular.module('app').controller('twoOptionsCtrl', function ($scope, storyService, $stateParams) {

  $scope.getChapters = function () {
    for (var i = 0; i < storyService.chapters.length; i++) {
      if (storyService.chapters[i].id == $stateParams.id) {
        $scope.chapter = storyService.chapters[i];
      }
    }
  };
  $scope.getChapters();
});
'use strict';

angular.module('app').directive('rollDirective', function () {

  return {
    restrict: 'E',
    templateUrl: './views/rollDirective.html'
  };
});
'use strict';

angular.module('app').service('classService', function (rollService) {

  this.stats = [{
    character: 'Druid',
    armor_class: 21,
    hit_points: 40,
    dexterity: 11,
    spell1: "Poison Spray",
    spell1Damage: function spell1Damage() {
      return rollService.roll12two();
    },
    spell2: "Thorn Whip",
    spell2Damage: function spell2Damage() {
      return rollService.roll6two();
    },
    spell3: "Thunderwave",
    spell3Damage: function spell3Damage() {
      return rollService.roll8two();
    }
  }, {
    character: 'Cleric',
    armor_class: 21,
    hit_points: 40,
    dexterity: 11,
    spell1: "Sacred Flame",
    spell1Damage: function spell1Damage() {
      return rollService.roll8two();
    },
    spell2: "Guiding Bolt",
    spell2Damage: function spell2Damage() {
      return rollService.roll6four();
    },
    spell3: "Spiritual Weapon",
    spell3Damage: function spell3Damage() {
      return rollService.roll8two();
    }
  }, {
    character: 'Wizard',
    armor_class: 21,
    hit_points: 40,
    dexterity: 11,
    spell1: "Firebolt",
    spell1Damage: function spell1Damage() {
      return rollService.roll10two();
    },
    spell2: "Ray of Frost",
    spell2Damage: function spell2Damage() {
      return rollService.roll8two();
    },
    spell3: "Magic Missle",
    spell3Damage: function spell3Damage() {
      return rollService.roll4three();
    }
  }];
});
"use strict";
'use strict';

angular.module('app').service('monsterService', function ($http) {

  var monSorted = [150, 325, 183, 216, 169, 57, 139, 156, 259, 150, 325, 183, 216, 169, 57, 259];

  function getRandom() {
    return monSorted[Math.floor(Math.random() * monSorted.length)];
  }

  var monsterNum = getRandom();

  this.getData = function () {
    return $http.get('http://www.dnd5eapi.co/api/monsters/' + monsterNum).then(function (response) {
      console.log(monsterNum);
      console.log(response);
      return response.data;
    });
  };
});
'use strict';

angular.module('app').service('rollService', function () {

  // d20
  this.roll20 = function () {
    var rolled = Math.ceil(Math.random() * 20);
    return rolled;
  };

  // d4
  this.roll4 = function () {
    var rolled = Math.ceil(Math.random() * 4);
    return rolled;
  };

  this.roll4three = function () {
    var total = 0;
    for (var i = 0; i < 3; i++) {
      total += this.roll4();
    }
    return total;
  };

  // d6
  this.roll6 = function () {
    var rolled = Math.ceil(Math.random() * 6);
    return rolled;
  };

  this.roll6two = function () {
    var total = 0;
    for (var i = 0; i < 2; i++) {
      total += this.roll6();
    }
    return total;
  };

  this.roll6four = function () {
    var total = 0;
    for (var i = 0; i < 4; i++) {
      total += this.roll6();
    }
    return total;
  };

  // d8
  this.roll8 = function () {
    var rolled = Math.ceil(Math.random() * 8);
    return rolled;
  };

  this.roll8two = function () {
    var total = 0;
    for (var i = 0; i < 2; i++) {
      total += this.roll8();
    }
    return total;
  };
  this.roll8three = function () {
    var total = 0;
    for (var i = 0; i < 3; i++) {
      total += this.roll8();
    }
    return total;
  };
  this.roll8five = function () {
    var total = 0;
    for (var i = 0; i < 5; i++) {
      total += this.roll8();
    }
    return total;
  };

  this.roll8six = function () {
    var total = 0;
    for (var i = 0; i < 6; i++) {
      total += this.roll8();
    }
    return total;
  };

  // d10
  this.roll10 = function () {
    var rolled = Math.ceil(Math.random() * 10);
    return rolled;
  };

  this.roll10two = function () {
    var total = 0;
    for (var i = 0; i < 2; i++) {
      total += this.roll10();
    }
    return total;
  };

  this.roll10four = function () {
    var total = 0;
    for (var i = 0; i < 4; i++) {
      total += this.roll10();
    }
    return total;
  };

  // d12
  this.roll12 = function () {
    var rolled = Math.ceil(Math.random() * 12);
    return rolled;
  };

  this.roll12two = function () {
    var total = 0;
    for (var i = 0; i < 2; i++) {
      total += this.roll12();
    }
    return total;
  };
});
'use strict';

angular.module('app').service('spellsService', function ($http) {

  var spellNum = 5;

  this.getSpells = function () {
    return $http.get('http://www.dnd5eapi.co/api/spells/' + spellNum).then(function (response) {
      console.log(response);
      return response;
    });
  };
});
'use strict';

angular.module('app').service('storyService', function () {

  this.chapters = [{
    id: 'c1_3o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "two({id: 'c2a_2o'})",
    button2lnk: "two({id: 'c2b_2o'})",
    button3lnk: "two({id: 'c2c_2o'})"
  }, {
    id: 'c2a_2o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'c3a_1o'})",
    button2lnk: "fight({id: 'c3b_f'})",
    button3lnk: ''
  }, {
    id: 'c2b_2o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'c3c_f'})",
    button2lnk: "two({id: 'c3d_2o'})",
    button3lnk: ''
  }, {
    id: 'c2c_2o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "two({id: 'c3e_2o'})",
    button2lnk: "fight({id: 'c3f_f'})",
    button3lnk: ''
  }, {
    id: 'c3a_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c3b_f',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'c4a_1o'})",
    button2lnk: "one({id: 'c4b_1o'})",
    button3lnk: ''
  }, {
    id: 'c3c_f',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'c4c_1o'})",
    button2lnk: "one({id: 'c4d_1o'})",
    button3lnk: ''
  }, {
    id: 'c3d_2o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'c4e_f'})",
    button2lnk: "one({id: 'c4f_1o'})",
    button3lnk: ''
  }, {
    id: 'c3e_2o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'c4g_1o'})",
    button2lnk: "fight({id: 'c4h_f'})",
    button3lnk: ''
  }, {
    id: 'c3f_f',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'c4i_1o'})",
    button2lnk: "one({id: 'c4j_1o'})",
    button3lnk: ''
  }, {
    id: 'c4a_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4b_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4c_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5b_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4d_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4e_f',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5c_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4f_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5c_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4g_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5c_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4h_f',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5c_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4i_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4j_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5c_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c5a_3o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'c6a_f'})",
    button2lnk: "one({id: 'c6b_1o'})",
    button3lnk: "one({id: 'c6c_1o'})"
  }, {
    id: 'c5b_3o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'c6a_f'})",
    button2lnk: "one({id: 'c6b_1o'})",
    button3lnk: "one({id: 'c6c_1o'})"
  }, {
    id: 'c5c_3o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'c6a_f'})",
    button2lnk: "one({id: 'c6b_1o'})",
    button3lnk: "one({id: 'c6c_1o'})"
  }, {
    id: 'c6a_f',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c7_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c6b_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c7_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c6c_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c7_3o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'c8a_1o'})",
    button2lnk: "one({id: 'c8b_1o'})",
    button3lnk: "one({id: 'c8c_1o'})"
  }, {
    id: 'c8a_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c8b_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c8c_1o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd1_3o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "two({id: 'd2a_2o'})",
    button2lnk: "two({id: 'd2b_2o'})",
    button3lnk: "two({id: 'd2c_2o'})"
  }, {
    id: 'd2a_2o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'd3a_f'})",
    button2lnk: "two({id: 'd3b_2o'})",
    button3lnk: ''
  }, {
    id: 'd2b_2o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "two({id: 'd3c_2o'})",
    button2lnk: "fight({id: 'd3d_f'})",
    button3lnk: ''
  }, {
    id: 'd2c_2o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'd3e_f'})",
    button2lnk: "one({id: 'd3f_1o'})",
    button3lnk: ''
  }, {
    id: 'd3a_f',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'd4a_f'})",
    button2lnk: "one({id: 'd4b_1o'})",
    button3lnk: ''
  }, {
    id: 'd3b_2o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'd4c_1o'})",
    button2lnk: "fight({id: 'd4d_f'})",
    button3lnk: ''
  }, {
    id: 'd3c_2o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'd4e_1o'})",
    button2lnk: "fight({id: 'd4f_f'})",
    button3lnk: ''
  }, {
    id: 'd3d_f',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'd4g_1o'})",
    button2lnk: "one({id: 'd4h_1o'})",
    button3lnk: ''
  }, {
    id: 'd3e_f',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'd4i_1o'})",
    button2lnk: "one({id: 'd4j_f'})",
    button3lnk: ''
  }, {
    id: 'd3f_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd4a_f',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'd5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd4b_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd4c_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'd5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd4d_f',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'd5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd4e_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd4f_f',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'd5b_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd4g_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'd5c_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd4h_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'd5c_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd4i_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd4j_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'd5c_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd5a_3o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'd6a_1o'})",
    button2lnk: "one({id: 'd6b_1o'})",
    button3lnk: "fight({id: 'd6c_f'})"
  }, {
    id: 'd5b_3o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'd6a_1o'})",
    button2lnk: "one({id: 'd6b_1o'})",
    button3lnk: "fight({id: 'd6c_f'})"
  }, {
    id: 'd5c_3o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'd6a_1o'})",
    button2lnk: "one({id: 'd6b_1o'})",
    button3lnk: "fight({id: 'd6c_f'})"
  }, {
    id: 'd6a_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'd7_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd6b_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd6c_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'd7_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd7_3o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'd8a_1o'})",
    button2lnk: "one({id: 'd8b_1o'})",
    button3lnk: "one({id: 'd8c_1o'})"
  }, {
    id: 'd8a_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd8b_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'd8c_1o',
    character: 'Druid',
    story1: "This is druid story paragraph one.",
    story2: "This is druid story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w1_3o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "two({id: 'w2a_2o'})",
    button2lnk: "two({id: 'w2b_2o'})",
    button3lnk: "two({id: 'w2c_2o'})"
  }, {
    id: 'w2a_2o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'w3a_f'})",
    button2lnk: "two({id: 'w3b_2o'})",
    button3lnk: ''
  }, {
    id: 'w2b_2o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'w3c_f'})",
    button2lnk: "one({id: 'w3d_1o'})",
    button3lnk: ''
  }, {
    id: 'w2c_2o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'w3e_f'})",
    button2lnk: "two({id: 'w3f_2o'})",
    button3lnk: ''
  }, {
    id: 'w3a_f',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w4a_1o'})",
    button2lnk: "one({id: 'w4b_1o'})",
    button3lnk: ''
  }, {
    id: 'w3b_2o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w4c_1o'})",
    button2lnk: "fight({id: 'w4d_f'})",
    button3lnk: ''
  }, {
    id: 'w3c_f',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w4e_1o'})",
    button2lnk: "one({id: 'w4f_1o'})",
    button3lnk: ''
  }, {
    id: 'w3d_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w3e_f',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w4g_1o'})",
    button2lnk: "one({id: 'w4h_1o'})",
    button3lnk: ''
  }, {
    id: 'w3f_2o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w4i_1o'})",
    button2lnk: "fight({id: 'w4j_f'})",
    button3lnk: ''
  }, {
    id: 'w4a_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4b_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4c_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4d_f',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5b_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4e_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5b_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4f_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5b_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4g_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5c_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4h_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5c_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4i_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4j_f',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5c_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w5a_3o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w6a_1o'})",
    button2lnk: "fight({id: 'w6b_f'})",
    button3lnk: "one({id: 'w5c_1o'})"
  }, {
    id: 'w5b_3o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w6a_1o'})",
    button2lnk: "fight({id: 'w6b_f'})",
    button3lnk: "one({id: 'w5c_1o'})"
  }, {
    id: 'w5c_3o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w6a_1o'})",
    button2lnk: "fight({id: 'w6b_f'})",
    button3lnk: "one({id: 'w5c_1o'})"
  }, {
    id: 'w6a_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w6b_f',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w7_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w6c_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w7_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w7_3o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w8a_1o'})",
    button2lnk: "one({id: 'w8b_1o'})",
    button3lnk: "one({id: 'w8c_1o'})"
  }, {
    id: 'w8a_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w8b_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w8c_1o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Start Over',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "home",
    button2lnk: "",
    button3lnk: ''
  }];
});
//# sourceMappingURL=bundle.js.map
