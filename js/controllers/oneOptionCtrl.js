angular.module('app').controller('oneOptionCtrl', function($scope, storyService, $stateParams, $location, $anchorScroll){

  $scope.getChapters = function() {
    for (var i = 0;i<storyService.chapters.length;i++) {
      if (storyService.chapters[i].id == $stateParams.id) {
        $scope.chapter = storyService.chapters[i];
      }
    }
  }
    $scope.getChapters()

    $scope.toTop = function() {
          $location.hash('top');
          $anchorScroll();
        }

})
