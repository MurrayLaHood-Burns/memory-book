var app = angular.module('memoryBook');

app.controller('AlbumCtrl', [
  '$scope',
  'auth',
  'albums',

  function($scope, auth, albums) {
    
    $scope.albums = albums.albums;
    
  }
]);
