angular.module('app').controller('noOptionsCtrl', function($scope, storyService, $stateParams){

  $scope.getChapters = function() {
    for (var i = 0;i<storyService.chapters.length;i++) {
      if (storyService.chapters[i].id == $stateParams.id) {
        $scope.chapter = storyService.chapters[i];
      }
    }
  }
    $scope.getChapters()


})
