// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('app.core',['ngAnimate', 'ngSanitize', 'satellizer']);
angular.module('auth', []);
angular.module('starter', ['ionic','ionic.service.core', 'angularPromiseButtons', 'ladda', 'starter.controllers', 'starter.services', 'app.core', 'auth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, deployChannel) {


        var deploy = new Ionic.Deploy();
        deploy.setChannel(deployChannel);
        
        // Update app code with new release from Ionic Deploy
        $scope.doUpdate = function() {
            deploy.update().then(function(res) {
                console.log('Ionic Deploy: Update Success! ', res);
            }, function(err) {
                console.log('Ionic Deploy: Update error! ', err);
            }, function(prog) {
                console.log('Ionic Deploy: Progress... ', prog);
            });
        };

        // Check Ionic Deploy for new code
        $scope.checkForUpdates = function() {
            console.log('Ionic Deploy: Checking for updates');
            deploy.check().then(function(hasUpdate) {
                console.log('Ionic Deploy: Update available: ' + hasUpdate);
                $scope.hasUpdate = hasUpdate;
            }, function(err) {
                console.error('Ionic Deploy: Unable to check for updates', err);
            });
        }


    })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

/* jshint ignore:start */


angular.module('app.core')
.
constant('baseApiUrl', 'http://teamify-development.herokuapp.com').constant('deployChannel', 'dev');


/* jshint ignore:end */
angular.module('auth').config(function($stateProvider, $authProvider, baseApiUrl) {

    $authProvider.loginUrl = baseApiUrl + '/api/authenticate';

    $stateProvider.state('auth', {
        url: '/auth',
        templateUrl:"js/auth/auth.html",
        controller:'AuthController as auth'
    })
        .state('logout', {
            url: '/logout',
            controller: function($scope,$auth,$rootScope,$state) {

                $auth.logout().then(function() {

                    // Remove the authenticated user from local storage
                    localStorage.removeItem('user');

                    // Flip authenticated to false so that we no longer
                    // show UI elements dependant on the user being logged in
                    $rootScope.authenticated = false;

                    // Remove the current user info from rootscope
                    $rootScope.currentUser = null;

                    $state.go('auth');
                });
            }
        });

});


angular.module('auth').controller('AuthController', function($scope, $auth, $state, $http, $rootScope, $q, $timeout) {
    var vm = this;
    vm.email = "";
    vm.password = "";

    vm.loading = false;

    vm.login = function() {
        vm.loading = true;
        var credentials = {
            email: vm.email,
            password: vm.password,
            name: vm.name
        };

       $auth.login(credentials).then(function(response) {
            // Return an $http request for the now authenticated
            // user so that we can flatten the promise chainf


            // Stringify the returned data to prepare it
            // to go into local storage
            var user = JSON.stringify(response.data.user);

            // Set the stringified user data into local storage
            localStorage.setItem('user', user);

            // The user's authenticated state gets flipped to
            // true so we can now show parts of the UI that rely
            // on the user being logged in
            $rootScope.authenticated = true;

            // Putting the user's data on $rootScope allows
            // us to access it anywhere across the app
            $rootScope.currentUser = response.data.user;


           vm.loading = false;
            // Everything worked out so we can now redirect to
            // the users state to view the data
            $state.go('tab.dash');

            // Handle errors
        }, function(error) {
            vm.loading = false;
            vm.loginError = true;
            vm.loginErrorText = error.data.error;
            // Because we returned the $http.get request in the $auth.login
            // promise, we can chain the next promise to the end here
        });
    };



});