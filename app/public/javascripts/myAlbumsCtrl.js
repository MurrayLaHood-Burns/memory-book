var app = angular.module('memoryBook');

app.controller('MyAlbumsCtrl', [
  '$scope',
  'auth',
  'albums',

  function($scope, auth, albums) {
    
    $scope.albums = albums.albums;
    
    $scope.createAlbum = function() {
    
      if(!$scope.title || $scope.title === '') { return; }
      albums.create({
        title: $scope.title
      });
      $scope.title = '';
    };
  }
]);
