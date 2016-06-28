myApp.controller("HeaderCtrl", ['$scope', '$location', '$window', 'UserAuthFactory',
  function($scope, $location,$window,  UserAuthFactory) {
    $scope.$watch(function () {
      return $window.sessionStorage.userRole;
    }, function (value) {
      $scope.userRole =  $window.sessionStorage.userRole;
    });
    // $scope.userData = sharedData.dataObj;
    // console.log($scope.userData);
    //$scope.userRole =  $window.sessionStorage.userRole;
    // console.log($scope.userRole);
    $scope.isActive = function(route) {
      return route === $location.path();
    }
    $scope.logout = function () {
      var socket = io.connect();
      socket.emit('logout', $window.sessionStorage._id);
      //socket.disconnect();
      UserAuthFactory.logout();
    }
  }
]);

myApp.controller("HomeCtrl", ['$scope',  'dataFactory','AuthenticationFactory','$window','socket', '$http',
  function($scope,  dataFactory, AuthenticationFactory,socket, $http) {
    $scope.loading = true;
    $scope.users = [];
    //console.log(AuthenticationFactory);
    // Access the factory and get the latest users list
    dataFactory.getUsers().then(function(data) {
      $scope.users = data.data;
      $scope.users.forEach(function(e,i){
        $scope.users[i].status ='Inactive';
      });
    }).finally(function() {
      // called no matter success or failure
      var socket = io.connect();
      socket.emit('join', {user_id: AuthenticationFactory._id});
      socket.on("new_user", function(data) {
        console.log(data);
          $scope.users.forEach(function(e,i){
            if(e._id == data.msg){
              $scope.users[i].status = 'Active';
            }
          });
          $scope.$apply();
          // console.log($scope.users);
          // console.log(data.msg);
      });
      socket.on("del_user",function(data){
        console.log(data);
        $scope.users.forEach(function(e,i){
          if(e._id == data){
            $scope.users[i].status = 'Inactive';
          }
        });
        $scope.$apply();
      });
      $scope.loading = false;
    });
    $scope.deleteUser=function(UserId){
      $http.delete('/api/admin/user/'+UserId).success(function(data){
        alert('User deleted!!');
        $location.path( "/" );
      }).error(function (data, status, header, config) {
          console.log('error');
      });
    };
    
    //socket for realtime
      // var socket = io.connect();
  
      //     $scope.messages = [];
      //     $scope.roster = [];
      //     $scope.name = '';
      //     $scope.text = '';
  
      //     socket.on('connect', function () {
      //       $scope.setName();
      //     });
  
      //     socket.on('message', function (msg) {
      //       $scope.messages.push(msg);
      //       $scope.$apply();
      //     });
  
      //     socket.on('roster', function (names) {
      //       $scope.roster = names;
      //       $scope.$apply();
      //     });
  
      //     $scope.send = function send() {
      //       console.log('Sending message:', $scope.text);
      //       socket.emit('message', $scope.text);
      //       $scope.text = '';
      //     };
  
      //     $scope.setName = function setName() {
      //       socket.emit('identify', $scope.name);
      //     };
    //socket end
  }
]);
myApp.controller("EditUserCtrl", ['$scope','$routeParams', 'dataFactory','$http',
  function($scope, $routeParams, dataFactory, $http) {
    var UserId = $routeParams.UserId;
   dataFactory.getUserById(UserId).then(function(data) {
      $scope.formUser = data.data;
    });
    $scope.updateUser = function(){
      $http.put('/api/admin/user/'+UserId, $scope.formUser).success(function (data, status, headers, config) {
              alert('User updated!!');
              $location.path( "/users" );
            })
            .error(function (data, status, header, config) {
                console.log('error');
            });
    }
 
  }
]);
myApp.controller("CreateUserCtrl", ['$scope', 'dataFactory','$http',
  function($scope,  dataFactory, $http) {
    $scope.createUser = function(){
      $http.post('/api/admin/user', $scope.formUser).success(function (data, status, headers, config) {
              alert('User created!!');
              $location.path( "/users" );
            })
            .error(function (data, status, header, config) {
                console.log('error');
            });
    }
  }
]);
myApp.controller("MeetingsCtrl", ['$scope', 'dataFactory', '$http',
  function($scope,  dataFactory, $http) {
    $scope.meetings = [];
    // Access the factory and get the latest meetings list
    dataFactory.getMeetings().then(function(data) {
      $scope.meetings = data.data;
    });
    $scope.deleteMeeting=function(MeetingId){
      $http.delete('/api/meeting/'+MeetingId).success(function(data){
        alert('Meeting deleted!!');
        $location.path( "/meetings" );
      });
    };
  }
]);
myApp.controller("EditMeetingCtrl", ['$scope','$routeParams', 'dataFactory','$http',
  function($scope, $routeParams, dataFactory, $http) {
    var MeetingId = $routeParams.MeetingId;
    //$scope.user = [];
 
    // Access the factory and get the latest products list
    dataFactory.getMeetingById(MeetingId).then(function(data) {
      $scope.formMeeting = data.data;
    });
    $scope.updateMeeting = function(){
      $http.put('/api/Meeting/'+MeetingId, $scope.formMeeting).success(function (data, status, headers, config) {
              alert('Meeting updated!!');
            $location.path( "/meetings" );
            })
            .error(function (data, status, header, config) {
                console.log('error');
            });
    }
 
  }
]);
myApp.controller("CreateMeetingCtrl", ['$scope', 'dataFactory', '$http',
  function($scope,  dataFactory, $http) {
    $scope.formMeeting = {time:'2015-01-01'};
    //$scope.formMeeting.time = '2015-01-01';
    $scope.createMeeting = function(){
      console.log($scope.formMeeting);
      $http.post('/api/meeting', $scope.formMeeting).success(function (data, status, headers, config) {
              alert('Meeting created!!');
              $location.path( "/meetings" );
            })
            .error(function (data, status, header, config) {
                console.log('error');
            });
    }
  }
]);
myApp.controller("JoinMeetingsCtrl", ['$scope','AuthenticationFactory', 'dataFactory', '$http','socket',
  function($scope,AuthenticationFactory,  dataFactory, $http, socket) {
    $scope.meetings = [];
    //var socket = io.connect();
    socket.emit('join', {user_id:AuthenticationFactory._id});
    // Access the factory and get the latest meetings list
    // $scope.userData =  sharedData.dataObj;
    dataFactory.getMeetingsForUser(AuthenticationFactory._id).then(function(data) {
      $scope.meetings = data.data;
    });
    $scope.JoinMeeting =  function(MeetingId){
      $http.post('/api/join_meeting',{'user_id':AuthenticationFactory._id,'meeting_id':MeetingId}).success(function (data, status, headers, config) {
              alert('Successfully updated.');
               $scope.meetings = data;
            })
            .error(function (data, status, header, config) {
                console.log('error');
            });
    }
    $scope.LeaveMeeting=function(MeetingId){
      $http.delete('/api/join_meeting/'+AuthenticationFactory._id+'/'+MeetingId).success(function(data){
        alert('Successfully updated.');
        dataFactory.getMeetingsForUser(AuthenticationFactory._id).then(function(data) {
          $scope.meetings = data.data;
        });
        //$location.path( "/JoinMeetings" );
      });
    };
  }
]);
myApp.controller("Page3Ctrl", ['$scope', 'dataFactory',
  function($scope, dataFactory) {
    $scope.products = [];
 
    // Access the factory and get the latest products list
    dataFactory.getProducts().then(function(data) {
      $scope.products = data.data;
    });
 
  }
]);