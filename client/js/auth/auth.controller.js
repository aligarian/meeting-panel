myApp.controller('LoginCtrl', ['$scope', '$window', '$location','sharedData', 'UserAuthFactory', 'AuthenticationFactory',
  function($scope, $window, $location,sharedData, UserAuthFactory, AuthenticationFactory) {
    $scope.user = {
      username: 'admin',
      password: 'admin'
    };
    
    $scope.login = function() {
 
      var username = $scope.user.username,
          password = $scope.user.password;
 
      if (username !== undefined && password !== undefined) {
        UserAuthFactory.login(username, password).success(function(data) {
          //console.log(data);
          sharedData.dataObj = data.user;
          $scope.userData = sharedData.dataObj;
          AuthenticationFactory.isLogged = true;
          AuthenticationFactory._id = data.user._id;
          AuthenticationFactory.user = data.user.name;
          AuthenticationFactory.userRole = data.user.role;
          
          $window.sessionStorage.token = data.token;
          $window.sessionStorage._id = data.user._id;
          $window.sessionStorage.user = data.user.name; // to fetch the user details on refresh
          $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refreshObj;
          
         
          if(data.user.role == 'admin'){
             $location.path("/");
          }else{
            $location.path("/JoinMeetings");
          }
         
 
        }).error(function(status) {
          alert('Oops something went wrong!');
        });
      } else {
        alert('Invalid credentials');
      }
 
    };
 
  }
]);