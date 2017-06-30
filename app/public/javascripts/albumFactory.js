var app = angular.module('memoryBook');

app.factory('albums', ['$http', 'auth',
function($http, auth){

  var o = {
    albums: []
  };

  o.getAll = function() {
    return $http.get('/albums', {
      headers: {authorization: 'Bearer ' + auth.getToken()}
    }).success(function(data){
      angular.copy(data, o.albums);
    })
  };

  o.create = function(album) {
    return $http.post('/users/' + auth.currentUser() + '/albums', album, {
      headers: {authorization: 'Bearer ' + auth.getToken()}
    }).success(function(data) {
      o.albums.push(data);
    });
  };

  o.delete = function(id) {
    return $http.put('/albums' + id + '/delete', {
      headers: {authorization: 'Bearer ' + auth.getToken()}
    }).success(function(data) {
      // delete that shit;
    });
  };


  o.get = function(id) {
    return $http.get('/albums/' + id).then(function(res){
      return res.data;
    });
  };

  o.addTags = function(id, tags) {
    return $http.post('/albums/' + id + '/tags', tags, {
      headers : {authorization: 'Bearer ' + auth.getToken()}
    });
  };

  o.deleteTag = function(id, tag) {
    return $http.put('/albums/' + id + '/tags/delete', tag, {
      headers : {authorization: 'Bearer ' + auth.getToken()}
    });
  };

  return o;
}]);
