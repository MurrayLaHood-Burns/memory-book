var app = angular.module('memoryBook');

app.controller('AlbumCtrl', [
  '$scope',
  'auth',
  'albums',

  function($scope, auth, albums) {
    
    $scope.album = albums.currentAlbum;

    jQuery('#editToggle').bootstrapToggle();

    //$scope.editMode = jQuery('#editToggle').prop('checked');

    /*$scope.isEditMode = function(){
      var editMode = $('#editToggle').prop('checked');
      return editMode;
    };*/

    $('#editToggle').change(function() {
      $scope.$apply(function() {
        $scope.isEditMode = $('#editToggle').prop('checked');
      });
    });

  }
]);
