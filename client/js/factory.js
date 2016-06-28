myApp.factory('dataFactory', function($http) {
  /** https://docs.angularjs.org/guide/providers **/
  var urlBase = '/api/';
  var _dataFactory = {};
 
  
  _dataFactory.getUsers = function() {
    return $http.get(urlBase+'admin/users');
  };
  _dataFactory.getUserById = function(id) {
    return $http.get(urlBase+'admin/user/'+id);
  };
  _dataFactory.getMeetings = function() {
    return $http.get(urlBase+'admin/meetings');
  };
  _dataFactory.getMeetingsForUser = function(id) {
    return $http.get(urlBase+'join_meeting/'+id);
  };
  _dataFactory.getMeetingById = function(id) {
    return $http.get(urlBase+'admin/meeting/'+id);
  };
  return _dataFactory;
});
myApp.factory('sharedData', function() {
  var _dataObj = {};
  return {
    dataObj: _dataObj
  };
});
myApp.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});