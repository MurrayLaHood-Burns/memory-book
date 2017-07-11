var app = angular.module('memoryBook');

app.controller('AlbumCtrl', [
  '$scope',
  'auth',
  'albums',

  function($scope, auth, albums) {
    
    $scope.album = albums.currentAlbum;

    $('#editToggle').bootstrapToggle();
  }
]);
