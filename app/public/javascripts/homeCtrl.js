var app = angular.module('memoryBook');

app.controller('HomeCtrl', [
  '$scope',
  'auth',

  function($scope, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.search = function() {
    };
  }
]);
