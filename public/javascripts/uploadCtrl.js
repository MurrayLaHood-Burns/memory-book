var app = angular.module('memoryBook');

app.controller('UploadCtrl', [
  '$scope',
  'auth',

  function($scope, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;

  }
]);
