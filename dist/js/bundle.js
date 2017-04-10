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
    document.querySelector('.story-block').classList.add('shake-chunk');
  };
});
'use strict';

angular.module('app').directive('rollDirective', function () {

  return {
    restrict: 'E',
    templateUrl: './views/rollDirective.html'
  };
});
'use strict';

angular.module('app').controller('fightCtrl', function ($scope, monsterService, rollService, storyService, classService, $stateParams) {

  $scope.showSpells = function () {
    if ($scope.stats.character === "Wizard") {
      $scope.wizardSpells = true;
    }
    if ($scope.stats.character === "Cleric") {
      $scope.clericSpells = true;
    }
  };

  // rolls
  $scope.roll20You = function () {
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
      $scope.theEnd = true;
    }
  };

  $scope.fightSp1 = function () {
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
    if ($scope.monster.hit_points > 0) {
      $scope.fight();
    }
    if ($scope.monster.hit_points <= 0) {
      $scope.youWon = "You killed the " + $scope.monster.name;
      $scope.over = true;
      $scope.won = true;
      $scope.monster.hit_points = 0;
      $scope.turn = "";
      $scope.theEnd = true;
    }
  };

  $scope.fightSp2 = function () {
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
    if ($scope.monster.hit_points > 0) {
      $scope.fight();
    }
    if ($scope.monster.hit_points <= 0) {
      $scope.youWon = "You killed the " + $scope.monster.name;
      $scope.over = true;
      $scope.won = true;
      $scope.monster.hit_points = 0;
      $scope.turn = "";
      $scope.theEnd = true;
    }
  };

  $scope.fightSp3 = function () {
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
    if ($scope.monster.hit_points > 0) {
      $scope.fight();
    }
    if ($scope.monster.hit_points <= 0) {
      $scope.youWon = "You killed the " + $scope.monster.name;
      $scope.over = true;
      $scope.won = true;
      $scope.monster.hit_points = 0;
      $scope.turn = "";
      $scope.theEnd = true;
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
    story1: "The mountain wind chills your bones as you emerge from the Temple of Talos and you gather your robes around you. Two years have passed quickly and you must return in haste to your village. Talos has made known to you his pleasure in your service and has granted you a portion of his power. Whatever is coming threatens his hold on this part of the world as well as your people’s.",
    story2: "After making your way down the well-worn trail to the base of the mountain, you arrive at a crossroads. Straight ahead is a forest. The trees are thick and the path is narrow. Rumors say travelers have disappeared inside, but it offers the fastest walking route north. To the right is a wide road around the forest. West leads to a village where you can arrange passage on a ship. This may see you to your village the soonest, but the ocean can be dangerous. Where will you go?",
    sideimg: '',
    topimg: '',
    button1txt: 'The forest sounds nice',
    button2txt: 'A well-worn road offers the safest bet',
    button3txt: 'Time to set sail. No time for walking',
    button1lnk: "two({id: 'c2a_2o'})",
    button2lnk: "two({id: 'c2b_2o'})",
    button3lnk: "two({id: 'c2c_2o'})"
  }, {
    id: 'c2a_2o',
    character: 'Cleric',
    story1: "You have been walking warily through the forest for what seems like hours. Paths have split and converged several times and you have long since lost track of which direction is north. You are lost. You rest on a boulder to think, pray, and eat. As you are bringing out some bread and cheese, you hear a rustling in a nearby thicket.",
    story2: "Your instincts say to run, but your curiosity begs to you stay.",
    sideimg: '',
    topimg: '',
    button1txt: 'Get away as fast as you can',
    button2txt: 'Stay and see what is coming',
    button3txt: 'option 3',
    button1lnk: "one({id: 'c3a_1o'})",
    button2lnk: "fight({id: 'c3b_f'})",
    button3lnk: ''
  }, {
    id: 'c2b_2o',
    character: 'Cleric',
    story1: "You walk along the road and pass many travelers. After several days, you come to a crossroads and must turn north, towards your village. This road is not so wide, but still well-traveled. You turn to start down this road when you hear a low, moaning cry for help just off the road. ",
    story2: "You approach the source of the sound and see a man, bleeding from a gut wound, sitting with his back to a tree. He begs for you to help him. This way has taken too long already and you don't know if you hold the power to completely heal the man. Perhaps you should turn the corner and keep going.",
    sideimg: '',
    topimg: '',
    button1txt: "You don't have time for this",
    button2txt: 'Attempt a healing spell',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'c3c_f'})",
    button2lnk: "two({id: 'c3d_2o'})",
    button3lnk: ''
  }, {
    id: 'c2c_2o',
    character: 'Cleric',
    story1: "You enter the village and start asking around for passage. It's not the season for sea travel. Storms are common. You tell them you are on an errand from Talos, the very god of storms, but none offer to take you.",
    story2: "Finally you find a man who says his brother could be willing to take you. The price is outrageous, but he says if you can find out what is killing his cattle at night, and in turn kill it, passage will be free.",
    sideimg: '',
    topimg: '',
    button1txt: 'Pay the man and get on with it',
    button2txt: 'Go to the cattle and wait for nightfall',
    button3txt: 'option 3',
    button1lnk: "two({id: 'c3e_2o'})",
    button2lnk: "fight({id: 'c3f_f'})",
    button3lnk: ''
  }, {
    id: 'c3a_1o',
    character: 'Cleric',
    story1: "Running, panting, tripping, you race through the forest. The rustling hasn’t stopped. In fact, it’s increased. Calling on Talos, you prepare a spell and turn just in time to see the hobgoblin slice your knees. Your spell is cut short and your life is as well. The creature gurgles in what sounds like laughter as more emerge from behind trees.",
    story2: "As the world fades to black, you feel a rumbling in the back of your mind. Talos is displeased.",
    died: "You have died",
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
    story1: "After laying waste to the creature, you notice tracks. Following the tracks may not be the wisest thing to do, but you are running out of options. The tracks lead off the path. Do you pray for direction or follow the tracks? Talos may be displeased if you call on him too often for things like directions.",
    story2: "",
    sideimg: '',
    topimg: '',
    button1txt: 'Follow the tracks',
    button2txt: 'Pray for guidance',
    button3txt: 'option 3',
    button1lnk: "one({id: 'c4a_1o'})",
    button2lnk: "one({id: 'c4b_1o'})",
    button3lnk: ''
  }, {
    id: 'c3c_f',
    character: 'Cleric',
    story1: "That was close. Maybe if you helped the man he would have shown you a way around the ambush. Too late now. He's surely dead. You continue walking, now a bit more cautious. You are nearing your village, but are very tired. You see an inn on the side of the road. It's been days since you've slept in a bed and your power has been drained from the battle, but you feel a pull toward the village.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Stop at the inn',
    button2txt: 'Keep pushing on',
    button3txt: 'option 3',
    button1lnk: "one({id: 'c4c_1o'})",
    button2lnk: "one({id: 'c4d_1o'})",
    button3lnk: ''
  }, {
    id: 'c3d_2o',
    character: 'Cleric',
    story1: "You focus your energies and call on Talos for healing power. The man's pale face colors and his rapid breathing begins to slow to normal. He looks at you in wonder. You leave him some food and tell him to rest a bit before he trires to move on.",
    story2: "You ask him who did this to you and he tells you he was running from a gathering of monsters ahead down the road you intend to travel. One is lying in wait just ahead. He tells you of another, lesser-known route that will place you to the west of the village. You thank him. Part of you is angry and wants get vengence for the man, but you need to press forward. Your village awaits.",
    sideimg: '',
    topimg: '',
    button1txt: "A little vengence won't take too much time",
    button2txt: 'The man is fine, time to move on',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'c4e_f'})",
    button2lnk: "one({id: 'c4f_1o'})",
    button3lnk: ''
  }, {
    id: 'c3e_2o',
    character: 'Cleric',
    story1: "The seas are calm. Talos has smiled on you. You land and thank your greedy captain. It's only half a day's walk to your village from here.",
    story2: "The road forks. One way leads up over a hill, the other around it. Which do you choose?",
    sideimg: '',
    topimg: '',
    button1txt: 'Head over the hill',
    button2txt: 'Go around it',
    button3txt: 'option 3',
    button1lnk: "one({id: 'c4g_1o'})",
    button2lnk: "fight({id: 'c4h_f'})",
    button3lnk: ''
  }, {
    id: 'c3f_f',
    character: 'Cleric',
    story1: "Well, that's one creature that won't be feasting on cattle tonight. The next morning you tell the man and his brother what you have found. His brother still demands the outrageously price for passage to your village. Angry for time wasted and your life risked, you demand to be taken for a reasonable fee, if not for free, as was agreed upon. He still refuses. Do you press your case or pay the man?",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: "He doesn't know who he is messing with",
    button2txt: "Oh, just pay the man and get going",
    button3txt: 'option 3',
    button1lnk: "one({id: 'c4i_1o'})",
    button2lnk: "one({id: 'c4j_1o'})",
    button3lnk: ''
  }, {
    id: 'c4a_1o',
    character: 'Cleric',
    story1: "You carefully follow the creature’s tracks until you come to the edges of what looks like a crude camp. Goblins, hobgoblins, and other creatures roam about and fight for food. You aren’t getting past them, and even if you could, you would still be lost. Perhaps through intuition, perhaps through divine inspiration, you come up with a plan.",
    story2: "Calling on Talos, you summon pealing thunder and a bolt of lightning that strikes a tree in the center of the camp, lighting the tree nearby encampments on fire. The creatures flee. You follow. It’s not long before they bolt out of the forest, bellowing their guttural screams. You wait for them to disperse and exit yourself. It’s dark, but you are finally able to get your bearings with a quick look at the stars. You are close now. Through some miracle, you have made your way north and the village should be just over the next ridge. The forest placed you much closer than it should have. Strange. Though you have only been in the forest for a day, the stars indicate it has been several.",
    sideimg: '',
    topimg: '',
    button1txt: 'Almost home. Time to be hero.',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4b_1o',
    character: 'Cleric',
    story1: "As you call to Talos in supplication, you sense his frustration, but also his need for urgency. In this time of need, he grants you with a power not yet bestowed upon you and it makes you nervous. He wants you to speak with the dead.",
    story2: "The spell is successful and the creature you have just slain begins speaking in words you can understand. You demand to know the way out of the forest and it is forced to comply. Shuddering, you memorize the instructions relayed from the corpse and quickly proceed out of the forest. As you exit, you realize that your village is close, most likely, just over the next ridge, though by all accounts you should still days away.  No matter. Nothing to do but move forward.",
    sideimg: '',
    topimg: '',
    button1txt: 'Head to the village',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4c_1o',
    character: 'Cleric',
    story1: "The bed felt great and the meal was certainly better than the scraps you have left in your bag. You decide that it was a good decision.",
    story2: "As you progress toward the village you see the remains of what must have been a large bonfire. Curious, you keep moving. There's no time for investigation. Your village is just around the corner.",
    sideimg: '',
    topimg: '',
    button1txt: 'Approach the village',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4d_1o',
    character: 'Cleric',
    story1: "The night rapidly grows dark. The moon isn't shining. Strange. It was full last night. You come around a bend and see the crackling flames of a bonfire. Creatures are dancing with the flames. You turn to go off the road and around.",
    story2: "Just as you turn, you find that you were being followed. The troop of goblins laughs and you hear a word that sounds like dinner. You prepare a spell, but a spear is already through your belly.",
    died: "You have died.",
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
    story1: "That felt good. You'd like to tear through the rest of the group that did this, but think better of it. You have a duty. After a day of walking you come to the crest of hill. Your village waits below.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Duty awaits',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4f_1o',
    character: 'Cleric',
    story1: "You proceed and spend a day traveling. It is uneventful and at times pleasant. It gives you plenty of time to think about the looming evil you will no doubt face when you reach the village.",
    story2: "You come to the crest of a hill. Your village waits below. You pray to Talos for strength.",
    sideimg: '',
    topimg: '',
    button1txt: 'Time to face the evil',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4g_1o',
    character: 'Cleric',
    story1: "You head to the top of the hill and look down. Your village lies straight ahead. You glance down to the path you could have taken and see a monster lying in wait.",
    story2: "Glad to have avoided it, you pray to Talos and call down lightning to kill the creature so it will not be able to prey on unwitting travelers.",
    sideimg: '',
    topimg: '',
    button1txt: 'Proceed down the hill to your village',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4h_f',
    character: 'Cleric',
    story1: "You are weary, but at least the creature won't be able to attack anyone not prepared to fight back. Your village lies just ahead. Nervous and tired, you press on.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'On to the village',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c4i_1o',
    character: 'Cleric',
    story1: "The argument quickly gets heated. The greedy captain tells you to leave. You continue to demand passage, and soon your demands turn to threats. You begin the utterance for a spell, but a hand covers your mouth as your throat is slit. You forgot about the brother.",
    story2: "As you sink to the floor, you hear the captain yell at his brother. He says Lord Bryce wanted you alive. Bryce. Your brother? Alive? Darkness.",
    died: "You have died",
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
    story1: "You pay the man and proceed to the ship. It's a short, uneventful trip, though the captain keeps staring at you when he thinks you aren't looking. You land and head on the trail to your village.",
    story2: "After a half a day's journey, you come to a hill overlooking your village. Duty awaits.",
    sideimg: '',
    topimg: '',
    button1txt: 'Head down to face the looming evil',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c5a_3o',
    character: 'Cleric',
    story1: "The closer to get to the village, the louder the screams. You run into the village and into pure chaos. You are too late. Monsters stalk the streets, goblins mixed with the undead. You call forth lightning and holy light to clear a path to what looks like Master Perryl hiding behind an overturned cart. He says, though clenched fists, that Bryce returned a few days ago. He is alive. His army arrived an hour ago. Bryce is the evil spoken of in prophesy.",
    story2: "He says Bryce found some tunnels yesterday behind the blacksmith and was very excited. Shocked and angry, you run towards the tunnels. You don't know what Bryce could be thinking, but you feel you must confront him. You enter the tunnels and immediately produce light from your hand. The tunnel splits in three directions.",
    sideimg: '',
    topimg: '',
    button1txt: 'Go left',
    button2txt: 'Head right',
    button3txt: 'Continue straight',
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
    story1: "After making quick work of that creature, you press forward, secretly hoping there are more to take your frustration out on. Sadly, the tunnel soon opens up to an open cavern. Standing in the middle is your brother. He turns to you and smiles.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Go talk to Bryce',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c7_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c6b_1o',
    character: 'Cleric',
    story1: "Twisting and turning through the tunnels, you follow the path down. Twice you duck behind a rock as large groups of undead come the other way.",
    story2: "Eventually, the tunnel opens up to an open cavern. Standing in the middle is your brother. He turns to you and smiles.",
    sideimg: '',
    topimg: '',
    button1txt: 'Go talk to Bryce',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'c7_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'c6c_1o',
    character: 'Cleric',
    story1: "You run down the path, hoping there is still time to stop Bryce from whatever it is he is up to. The floor beneath you rumbles. You leap forward just in time to grasp a ledge as the floor beneath you crumbles.",
    story2: "As struggle to pull yourself up you see a zombie standing above you. It lunges for, crashes on top of you, and you both plummet to your doom.",
    died: "You have died",
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
    story1: "Bryce walks toward you and embraces you. He tells you he missed you and he has great plans for the both of you. He says he learned from a wizard in secret how to raise the dead and control them. He says that beneath the village, here in these caverns, lies a focal point for necromantic power.",
    story2: "You step back as he explains his plan to bring order to the lands around through his undead hordes, all obeying his will. By way of demonstration, he waves his hand toward you and what must be 50 undead come lumbering in, surrounding you. Bryce offers to let you join him. He will teach how to control them. You will rule the land together. The idea of you two bringing peace and order is appealing. You also itch to attack him outright and mentally prepare a guiding bolt to blast him if needed. In the back of your mind, you feel Talos waiting.",
    sideimg: '',
    topimg: '',
    button1txt: "Accept your brother's offer",
    button2txt: 'Send a bolt to blast the traitor',
    button3txt: 'Seek out Talos',
    button1lnk: "one({id: 'c8a_1o'})",
    button2lnk: "one({id: 'c8c_1o'})",
    button3lnk: "one({id: 'c8b_1o'})"
  }, {
    id: 'c8a_1o',
    character: 'Cleric',
    story1: "You turn around, looking at the undead around you. You begin to see the beauty of them and the order in their endless devotion. You take your brother's hand and he begins to teach you. In this place of power, you learn quickly, banishing Talos from your mind in the process. Who needs a jealous god getting in the way of true power?",
    story2: "Bryce asks what you'd like to do first. You smile and tell him you'd love to destroy the village. He agrees. Can't have any meddling in your plans.",
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
    story1: "You turn to get a good look at the undead surrounding you. Mentally, you appeal to Talos and feel his disgust with the creatures. Your mind begins to merge with his and his holy light surges through you.",
    story2: "Instinctively, you seize control of the horde from Bryce and make him their target. He screams, shooting fire from his hands, but there are too many of them. Once sure he is dead, you push the holy light from you into the horde. All of them, near and far. You feel them burning and smile. Talos is pleased.",
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
    story1: "Screaming with rage, you blast a bolt at your brother. He laughs and puts up an arcane shield he had already prepared.",
    story2: "Frowning, he waves his hand toward you and legion decends upon you. You call to Talos for help, but he ignores you. You have, afterall, ignored him.",
    died: "You have died",
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
    story1: "Two years moves quickly when training in magic. Your masters at the school have approved of your progress, and though they wish you were stronger, there is nothing to be done. The prophesy states the champion must be from the village. You must go and see what is to be done. As you walk out the door of the school, the grand master tells you to remember to summon the masters when it is time. You nod and head forward.",
    story2: "You learned a teleport spell, but you have not yet tried it succcessfully. You'd like to get to the village quickly, but also don't want to end up inside a mountain. There is a road from the school that heads toward your village. The masters also told you of a cave system nearby that should serve as a shortcut.",
    sideimg: '',
    topimg: '',
    button1txt: 'Teleport to the village',
    button2txt: 'Travel down the road',
    button3txt: 'Head to the caves',
    button1lnk: "two({id: 'w2a_2o'})",
    button2lnk: "two({id: 'w2b_2o'})",
    button3lnk: "two({id: 'w2c_2o'})",
    bar: "wizard-bar"
  }, {
    id: 'w2a_2o',
    character: 'Wizard',
    story1: "You form the arcane circle, making sure to use the correct symbols for the season and the alignment of the planets. You step into the center and activate with the words you have been taught and immediately lose your breath.",
    story2: "You collapse to the ground and look at your surroundings. This is not your village. You wait for nightfall and look at the stars to get your bearings. It looks like you miscalculated. The village is not far. You may have saved yourself a few days. In the distance you see a fire.",
    sideimg: '',
    topimg: '',
    button1txt: 'Approach the fire to investigate',
    button2txt: 'Stay put and sleep off your weariness from the spell',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'w3a_f'})",
    button2lnk: "two({id: 'w3b_2o'})",
    button3lnk: ''
  }, {
    id: 'w2b_2o',
    character: 'Wizard',
    story1: "The road is calm and you pass many travelers. A woman with a horse-drawn cart full of bolts of cloth offers you a ride. You readily accept and make light conversation.",
    story2: "Soon, however, she pulls the cart down a side path. You let her know you'll be getting off, but she ignores you. You attempt to get down, but you soon notice a knife to your back. Happy you have kept your true nature a secret, you use shocking grasp to jolt her, and you jump off the cart. You turn to run, either through the trees or down the road you came.",
    sideimg: '',
    topimg: '',
    button1txt: 'Try to lose her in the woods',
    button2txt: 'Run back down the road',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'w3c_f'})",
    button2lnk: "one({id: 'w3d_1o'})",
    button3lnk: ''
  }, {
    id: 'w2c_2o',
    character: 'Wizard',
    story1: "You enter the darkness of the cave and produce dancing lights around you. The darkness retreats. This will be fast, but not easy. Time to test your skills.",
    story2: "You turn a corner and hear a gutteral sound around the corner. Obviously a monster. Should you prepare a spell and fight, or try out your invisibility spell?",
    sideimg: '',
    topimg: '',
    button1txt: 'Fight the thing',
    button2txt: 'Turn invisible and sneak by',
    button3txt: 'option 3',
    button1lnk: "fight({id: 'w3e_f'})",
    button2lnk: "two({id: 'w3f_2o'})",
    button3lnk: ''
  }, {
    id: 'w3a_f',
    character: 'Wizard',
    story1: "After slaying the creature, you look around the camp. Three lie dead, apparently killed by the thing you just destroyed. The fire looks inviting, but you are hesitent to stay.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Warm yourself and search for food before finding shelter',
    button2txt: 'Leave and sleep in seclusion',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w4b_1o'})",
    button2lnk: "one({id: 'w4a_1o'})",
    button3lnk: ''
  }, {
    id: 'w3b_2o',
    character: 'Wizard',
    story1: "You wake rested and proceed toward the village. You decide on caution and take a path away from the road, not wanting to come into any trouble.",
    story2: "Trouble, however, finds you. You come into a clearing and see a group of goblins and other creatures resting. Thinking of how goblins took Bryce from you, you begin to prepare a fireball. You also don't want to be distracted from your mission. You could sneak around. It will take longer, but may be safer.",
    sideimg: '',
    topimg: '',
    button1txt: 'Bring the fire',
    button2txt: 'Go around them',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w4c_1o'})",
    button2lnk: "fight({id: 'w4d_f'})",
    button3lnk: ''
  }, {
    id: 'w3c_f',
    character: 'Wizard',
    story1: "After making quick work of the attacker, you scan the woods for more, also glancing behind to see if you were followed. Seeing no pursuers, you move forward toward the village. Ahead, you see a man struggling with a cart that has a broken wheel. You'd like to help, but time is short, and after the experience with the woman you are loathe to meet anyone else on the road.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Help the man',
    button2txt: 'Go passed and avoid eye contact',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w4e_1o'})",
    button2lnk: "one({id: 'w4f_1o'})",
    button3lnk: ''
  }, {
    id: 'w3d_1o',
    character: 'Wizard',
    story1: "You race down the road, glancing behind you and preparing a ball of fire to hurl at her if she tries to pursue. You are confident in your escape as she doesn't seem to want to follow. She smiles.",
    story2: "An arrow flies out of the trees and hits you in the chest. A group of men and women exit the woods and approach your fallen body, laughing.",
    died: "You have died",
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
    story1: "That was a rush. You've practiced the spells, but haven't yet had a chance to put them to practice. Confident now in your abilities, you press on. The path forks. Do you go left or right?",
    story2: "",
    sideimg: '',
    topimg: '',
    button1txt: 'Go left',
    button2txt: 'Go right',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w4g_1o'})",
    button2lnk: "one({id: 'w4h_1o'})",
    button3lnk: ''
  }, {
    id: 'w3f_2o',
    character: 'Wizard',
    story1: "You turn off your lights and smile to yourself as you walk by the waiting creature unnoticed. This was too easy. You continue through the caverns until you come to another turn.",
    story2: "You sense another waiting creature around the corner. Do you turn out your lights and go invisible once more, or do you fight?",
    sideimg: '',
    topimg: '',
    button1txt: 'Sneak by again',
    button2txt: 'Fight the thing',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w4i_1o'})",
    button2lnk: "fight({id: 'w4j_f'})",
    button3lnk: ''
  }, {
    id: 'w4a_1o',
    character: 'Wizard',
    story1: "You quickly leave and make yourself a shelter beneath some bushes. Satisfied that you are well-concealed, you sleep for the night and wake up restful.",
    story2: "In the morning you strike out toward your village. After a day of walking, your village comes into sight. It is surrounded by goblins. You are too late.",
    sideimg: '',
    topimg: '',
    button1txt: 'Get a closer look',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4b_1o',
    character: 'Wizard',
    story1: "Rummaging through the dead travelers' bags, you find some cheese and dried meat. Smiling, you warm your tired body by the fire.",
    story2: "It's not long before you hear footsteps. A lot of footsteps. You turn to see an entire army of goblins marching down the road toward you. You turn to flee, but are soon overtaken from behind. They slash and stab with their spears. You kill many with fire, but not nearly enough. Goblins. Just like Bryce.",
    died: "You have died",
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
    story1: "You say the words and fire rains down upon the creatures. Screaming, flailing, they rush you. You throw another fireball, but are slightly off mark, not having the time to prepare it first. The flaming horde soon piles on top of you.",
    story2: "Killed by goblins. Just like Bryce.",
    died: "You have died",
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
    story1: "You suppose you couldn't get past a fight all together. That one must have been a scout of some kind. They won't know you were ever here. You continue on toward your village only to find as it comes into view that it is surrounded by goblins. You are too late.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Get a closer look',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4e_1o',
    character: 'Wizard',
    story1: "You approach the man and offer your assistance. Using a spell, you mend his wheel and he thanks you profusely. He was afraid because he heard there was a mass of goblins on the road earlier. You say your goodbyes and tell him you are happy to help.",
    story2: "As you approach the village you see where the goblins he spoke of were going. They surround the village. You are too late.",
    sideimg: '',
    topimg: '',
    button1txt: 'Get a closer look',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4f_1o',
    character: 'Wizard',
    story1: "You walk by the man and don't look at him. You feel bad, but you have a village to save. If you can.",
    story2: "As the village comes into view, you see it is surrounded by an army of goblins. You are too late.",
    sideimg: '',
    topimg: '',
    button1txt: 'get a closer look',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4g_1o',
    character: 'Wizard',
    story1: "The caverns don't offer much of a challenge. You've bested a few small creatures and have only needed to resort to invisibility twice. You emerge from the caves with your village in sight and your breath catches.",
    story2: "The village is surrounded by a goblin army. You are too late.",
    sideimg: '',
    topimg: '',
    button1txt: 'Get a closer look',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4h_1o',
    character: 'Wizard',
    story1: "The caverns have been treacherous. You've faced giant spiders, undead and more. Now, however, you feel you are ready to face whatever lies in wait when you reach the village. As you emerge from the caves and see the village in the distance you are not so sure. A goblin army is surrounding the village.",
    story2: "You are too late. You think of your brother as you get closer.",
    sideimg: '',
    topimg: '',
    button1txt: 'Get a closer look',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w4i_1o',
    character: 'Wizard',
    story1: "You turn out your light and turn the corner. Again, you smile to yourself and you walk by the creature. Your smile goes away, however, when you step off the ledge into the abyss.",
    story2: "If only you had your lights.",
    died: "You have died",
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
    story1: "Not bad for your first battle. You look past the felled creature and see a ledge and very long drop. Good thing you didn't turn out your lights. You proceed through the cavern until you finally see light. You are relieved and pleased with yourself. That is, until you see the village. It is surrounded by an army of goblins. You are too late.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Get a closer look',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w5a_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w5a_3o',
    character: 'Wizard',
    story1: "You try to sneak closer without alerting the army, but they have scouts everywhere. In trees. behind rocks. Everywhere. You are quickly spotted. You begin to prepare a spell most likely too complex for your level of understanding of the arcane, but the army parts for you when you arrive.",
    story2: "You enter the village, confused and quickly find Maste Perryl waiting for you. He tells you Bryce arrived yesterday with the army. He is alive. He is with them, though not neccessarily commanding them. He says that Bryce entered some caves behind the blacksmith and instructed Master Perryl to send you in after him. You want to see Bryce, want to trust your brother, but don't trust the goblins. You feel a pull toward the caverns you can't describe. You also don't want the goblins at your back. You could either send a warning shot, or just fight the one standing guard and blast the gate closed.",
    sideimg: '',
    topimg: '',
    button1txt: 'Send fire at the goblins as a warning',
    button2txt: 'Blast the gate to the village',
    button3txt: 'Ignore the goblins and just go to the caverns',
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
    story1: "You lob fire over the goblins' heads as a warning to stay back. This is misinterpreted as an all out attack. Arrows fly overhead and you cannot get up your shield of magic in time.",
    story2: "",
    died: "You have died.",
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
    story1: "You have defeated the guard and the gate is closed. They goblins clearly are not happy. No matter. You head inside the caverns to find your brother. You have questions. You run into the caverns and navigate the tunnels until you find an open cavern with Bryce standing in the middle. He looks worried.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'Talk your brother',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w7_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w6c_1o',
    character: 'Wizard',
    story1: "The goblins can wait. You need to get inside to start the ritual. Where did that thought come from? Stop Bryce. You need to stop Bryce. You run into the caverns and navigate the tunnels until you find an open cavern with Bryce standing in the middle.",
    story2: "He looks worried.",
    sideimg: '',
    topimg: '',
    button1txt: 'Talk to your brother',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "one({id: 'w7_3o'})",
    button2lnk: "",
    button3lnk: ''
  }, {
    id: 'w7_3o',
    character: 'Wizard',
    story1: "You walk up to Bryce and he gives you a cautious hug. He says he is glad you are here, but not happy about what he has to do. You tell him you are here to stop him from whatever it is he is planning. He says he is there to stop you. While at the school, he discovered he was being manipulated by the masters. They were training him subconciously to perform a ritual beneath the village. The masters were seeking more power by raising a demon king.",
    story2: "Bryce says he escaped and found the goblins, whose were ancient enemies with the demon king. Your instinct tells you this is a lie, and you tell him that. He says that you are now the one they have trained to perfom the ritual. You tell him he is lying. He asks why you are moving your arms and muttering the ritual under your breath. He asks you to help him destroy the alter at the center of the cavern to stop the demon from rising. You now remember that your masters have instructed you to summon them when you found the site. You have a burning desire to complete the ritual yourself.",
    sideimg: '',
    topimg: '',
    button1txt: 'Destroy the alter',
    button2txt: 'Summon your masters',
    button3txt: 'Complete the ritual yourself',
    button1lnk: "one({id: 'w8a_1o'})",
    button2lnk: "one({id: 'w8b_1o'})",
    button3lnk: "one({id: 'w8c_1o'})"
  }, {
    id: 'w8a_1o',
    character: 'Wizard',
    story1: "You focus your power on stoping your arms and your muttering. You beg Bryce to help you. With the wave of a hand, a tremor rumbles the ground and the alter cracks. He tells you it needs something else to be destroyed.",
    story2: "You send everything you can at the alter and it crumbles. You and Bryce embrace. The masters will clearly be displeased, but you feel with a little time and training, the two of you can face them together.",
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
    story1: "You push Bryce down with a force of air and summon your masters, who promptly teleport into the cavern. Bryce scrambles backward and they strike him down with powerful magic. They thank you and urge you to complete the ritual.",
    story2: "As you finish they demon king flashed into the cavern. He explains that he is not fully here and needs a sacrifice. The masters look to you and smile.",
    died: "You have died",
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
    story1: "You cast hold on Bryce and complete the ritual. The demon king flashes into the cavern laughing. He explains that in order to fully manifest and grant you the power you desire, he needs a sacrifice. You look at Bryce and smile.",
    story2: "First he dies, and then the masters. They will regret making a puppet of you.",
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
