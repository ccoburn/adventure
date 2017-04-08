angular.module('app').service('monsterService', function($http){


var monSorted = [150, 325, 183, 216, 169, 57, 139, 156, 259, 150, 325, 183, 216, 169, 57, 259]

function getRandom() {
 return monSorted[Math.floor(Math.random() * monSorted.length)]
}

var monsterNum = getRandom();

this.getData = function() {
  return $http.get('http://www.dnd5eapi.co/api/monsters/' + monsterNum).then(function(response){
    console.log(monsterNum);
    console.log(response);
    return response.data;
  })

}





});
