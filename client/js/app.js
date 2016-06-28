var myApp = angular.module('ngclient', ['ngRoute','angularjs-datetime-picker']);
 
myApp.config(function($routeProvider, $httpProvider) {
  
  $httpProvider.interceptors.push('TokenInterceptor');
 
  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/users', {
      templateUrl: 'partials/users.html',
      controller: 'UsersCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/EditUser/:UserId', {
      templateUrl: 'partials/edit_user.html',
      controller: 'EditUserCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/CreateUser', {
      templateUrl: 'partials/create_user.html',
      controller: 'CreateUserCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/meetings', {
      templateUrl: 'partials/meetings.html',
      controller: 'MeetingsCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/EditMeeting/:MeetingId', {
      templateUrl: 'partials/edit_meeting.html',
      controller: 'EditMeetingCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/CreateMeeting', {
      templateUrl: 'partials/create_meeting.html',
      controller: 'CreateMeetingCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/JoinMeetings', {
      templateUrl: 'partials/join_meetings.html',
      controller: 'JoinMeetingsCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/page2', {
      templateUrl: 'partials/page2.html',
      controller: 'Page2Ctrl',
      access: {
        requiredLogin: true
      }
    }).when('/page3', {
      templateUrl: 'partials/page3.html',
      controller: 'Page3Ctrl',
      access: {
        requiredLogin: true
        
      }
    }).otherwise({
      redirectTo: '/login'
    });
});
 
myApp.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // when the page refreshes, check if the user is already logged in
  AuthenticationFactory.check();
 
  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      $location.path("/login");
    } else {
      // check if user object exists else fetch it. This is incase of a page refresh
      if (!AuthenticationFactory.user) AuthenticationFactory._id = $window.sessionStorage._id;
      if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
      if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
    }
  });
 
  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;
    $rootScope.role = AuthenticationFactory.userRole;
    // if the user is already logged in, take him to the home page
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/');
    }
  });
});
// Ajax loading directive
myApp.directive("ajaxLoading", function() {
  return {
    template:'<div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div>'
  };
});