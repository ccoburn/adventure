angular.module('app').service('classService', function($http){


this.getData = function() {
  return $http.get('http://www.dnd5eapi.co/api/monsters').then(function(response){
    console.log(response)

                    return response.data;
  });

};
});
