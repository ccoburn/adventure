'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'home.html',
    controller: 'homeCtrl'
  }).state('none', {
    url: "/none/:id",
    templateUrl: './views/none.html',
    controller: 'noOptionsCtrl'
  }).state('two', {
    url: "/two/:id",
    templateUrl: './views/two.html',
    controller: 'twoOptionsCtrl'
  }).state('three', {
    url: "/three/:id",
    templateUrl: './views/three.html',
    controller: 'threeOptionsCtrl'
  }).state('fight', {
    url: '/fight',
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

angular.module('app').controller('fightCtrl', function ($scope, monsterService, spellsService, rollService, storyService) {

  $scope.getSpells = function () {
    spellsService.getSpells().then(function (response) {
      $scope.spellsService = response;
    });
  };
  $scope.getSpells();

  $scope.roll6More = function () {
    rollService.roll6More(8);
  };
  $scope.roll20 = function () {
    $scope.d20Result = rollService.roll20();
    if ($scope.d20Result == 20) {
      $scope.d20Result = $scope.d20Result + " Critical Hit!";
    } else if ($scope.d20Result == 1) {
      $scope.d20Result = $scope.d20Result + " You failed!";
    }
  };

  $scope.getMonsters = function () {
    monsterService.getData().then(function (response) {
      $scope.monster = response;
    });
  };

  $scope.getMonsters();
});
'use strict';

angular.module('app').controller('noOptionsCtrl', function ($scope, storyService, $stateParams) {

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

angular.module('app').service('classService', function ($http) {

  this.getData = function () {
    return $http.get('http://www.dnd5eapi.co/api/monsters').then(function (response) {
      console.log(response);

      return response.data;
    });
  };
});
'use strict';

angular.module('app').service('monsterService', function ($http) {

  var monSorted = [150, 325, 165, 183, 216, 169, 57, 139, 156, 259];

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

  this.roll20 = function () {
    var rolled = Math.ceil(Math.random() * 20);
    return rolled;
  };

  this.roll6 = function () {
    var rolled = Math.ceil(Math.random() * 6);
    return rolled;
  };

  this.roll6More = function (num) {
    var total = 0;
    for (var i = 0; i < num; i++) {
      total += this.roll6();
    }
    console.log(total);
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
    id: 'w1_3o',
    character: 'Wizard',
    story1: "This is wizard story paragraph one.",
    story2: "This is wizard story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: "three({id: 'w2a_3o'})",
    button2lnk: "two({id: 'w2b_2o'})",
    button3lnk: "none({id: 'w2c_0o'})"
  }, {
    id: 'c1_3o',
    character: 'Cleric',
    story1: "This is cleric story paragraph one.",
    story2: "This is cleric story paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: '',
    button2lnk: '',
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
    button1lnk: '',
    button2lnk: '',
    button3lnk: ''
  }, {
    id: 'w2a_3o',
    character: 'Wizard',
    story1: "This is wizard story part 2 paragraph one.",
    story2: "This is wizard story part 2 paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 4',
    button2txt: 'option 5',
    button3txt: 'option 6',
    button1lnk: '',
    button2lnk: '',
    button3lnk: ''
  }, {
    id: 'w2b_2o',
    character: 'Wizard',
    story1: "This is wizard story part 2b paragraph one.",
    story2: "This is wizard story part2b paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 7',
    button2txt: 'option 8',
    button3txt: '',
    button1lnk: '',
    button2lnk: '',
    button3lnk: ''
  }, {
    id: 'w2c_0o',
    character: 'Wizard',
    story1: "This is wizard story part2c paragraph one.",
    story2: "This is wizard story part2c paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: '',
    button2lnk: '',
    button3lnk: ''
  }];
});
//# sourceMappingURL=bundle.js.map
