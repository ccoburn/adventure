angular.module('app').service('spellsService', function($http){

var spellNum = 5;

this.getSpells = function() {
  return $http.get('http://www.dnd5eapi.co/api/spells/' + spellNum).then(function(response){
    console.log(response)
    return response;
  });
};








});
