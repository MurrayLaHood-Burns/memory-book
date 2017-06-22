var app = angular.module('memoryBook', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('home',{
        url:'/home',
        templateUrl: '/home.html',
        controller: 'HomeCtrl',
      })

      .state('login', {
        url: '/login',
        templateUrl: '/login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
          if(auth.isLoggedIn()){
            $state.go('home');
          }
        }]
      })

      .state('register', {
        url: '/register',
        templateUrl: '/register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
          if(auth.isLoggedIn()){
            $state.go('home');
          }
        }]

      })

      .state('upload', {
        url: '/upload',
        templateUrl: '/upload.html',
        controller: 'UploadCtrl',
      });
  

    $urlRouterProvider.otherwise('home');
  }
]);
