// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('app.core',['ngAnimate', 'ngSanitize', 'satellizer', 'ngResource']);

angular.module('auth', []);
angular.module('app.messages', []);
angular.module('app.settings', []);
angular.module('app.selectOrganization', []);
angular.module('starter', ['ionic','ionic.service.core',
    'angularPromiseButtons', 'ladda', 'starter.controllers', 'starter.services', 'app.core', 'auth',
'app.messages', 'app.settings', 'app.selectOrganization', 'ion-autocomplete'])

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
      .state(
      'app', {
          abstract: true,
          views: {
              'mainContent': {
                  templateUrl: 'js/main-content.html'
              }
          }

      })

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
  $urlRouterProvider.otherwise('/auth');

})
    .run(function ($rootScope, $state) {

        // $stateChangeStart is fired whenever the state changes. We can use some parameters
        // such as toState to hook into details about the state as it is changing
        $rootScope.$on('$stateChangeStart', function (event, toState) {

            // Grab the user from local storage and parse it to an object

            var user = JSON.parse(localStorage.getItem('user'));


            // If there is any user data in local storage then the user is quite
            // likely authenticated. If their token is expired, or if they are
            // otherwise not actually authenticated, they will be redirected to
            // the auth state because of the rejected request anyway
            if (user) {

                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app. Here
                // we are grabbing what is in local storage
                $rootScope.currentUser = user;

                console.log($rootScope.currentUser)
                if(user.organizations.length > 0){
                    $rootScope.activeOrganization = user.organizations[0];
                    console.log($rootScope.activeOrganization);
                }


                // If the user is logged in and we hit the auth route we don't need
                // to stay there and can send the user to the main state
                if (toState.name === 'auth') {

                    // Preventing the default behavior allows us to use $state.go
                    // to change states
                    event.preventDefault();

                    // go to the 'main' state which in our case is users
                    $state.go('app.messages');
                }
            }

        });
    });

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, deployChannel) {

//
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

(function () {
    'use strict';

    angular.module('app.core').factory(
        'authenticate', function($auth, $rootScope, $log, $state) {


        var factory = {};

            factory.login = function(email, password){

                var credentials = {
                    email: email,
                    password: password
                };

                $auth.login(credentials).then(
                function (response) {
                    // Return an $http request for the now authenticated
                    // user so that we can flatten the promise chainf


                    // Stringify the returned data to prepare it
                    // to go into local storage
                    var user = JSON.stringify(response.data.user);

                    console.log(response.data.user);
                    // Set the stringified user data into local storage
                    localStorage.setItem('user', user);

                    // The user's authenticated state gets flipped to
                    //// true so we can now show parts of the UI that rely
                    // on the user being logged in
                    $rootScope.authenticated = true;

                    // Putting the user's data on $rootScope allows
                    // us to access it anywhere across the app
                    $rootScope.currentUser = response.data.user;

                    // Everything worked out so we can now redirect to
                    // the users state to view the data
                    if (response.data.user.organizations.length > 0) {
                        $rootScope.activeOrganization = response.data.user.organizations[0];
                        $state.go('app.messages');
                    } else {
                        $state.go('app.selectOrganization');
                    }


                    // Handle errors
                }, function (error) {

                        //@tmf handle
                   $log.log(error);

                });


            };



        return factory;

    });
})();

/* jshint ignore:start */


angular.module('app.core')
.
constant('baseApiUrl', 'http://teamify-development.herokuapp.com').constant('deployChannel', 'dev');


/* jshint ignore:end */
var core = angular.module('app.core');



core.filter('initials', function () {
    return function (user) {
        var str = user.name.first.charAt(0) + user.name.last.charAt(0);
        return str.toUpperCase();
    };
});

//
angular.module('auth').config(function($stateProvider, $authProvider, baseApiUrl) {

    $authProvider.loginUrl = baseApiUrl + '/api/authenticate/account';

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


angular.module('auth').controller('AuthController', function($scope, $auth, $state, $http,
                                                             $ionicModal, $rootScope, usersResource, authenticate) {
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
        authenticate.login(vm.email, vm.password);

    };

    $ionicModal.fromTemplateUrl('forgotpassword.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    })

    vm.openModal = function() {
        $scope.modal.show();
    };
    vm.closeModal = function() {
        $scope.modal.hide();
        vm.emailSent =  false;
        vm.resetEmail  = '';
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

    vm.resetEmail = '';
    vm.emailSent =  false;
    vm.sendResetEmail = function(){

        if(vm.resetEmail == ''){
            return;
        }
        vm.loadingEmail = true;
        usersResource.sendResetEmail(vm.resetEmail).then(function(result){
                vm.loadingEmail = false;
            vm.emailSent = true;

        },
        function(error){
            vm.loadingEmail = false;
           // @tmf handle
        })

    };

});
angular.module('auth').config(function($stateProvider) {

    $stateProvider.state('auth.signup', {
        url: '/signup',
        views: {
            "test": {
                templateUrl: "js/auth/signup.html",
                controller: 'SignupController as signup'
            }
        }
    });

});

(function() {
    'use strict';

    angular
        .module('auth')
        .controller('SignupController', function SignupController($animate, $log, $scope, accountsResource, authenticate) {
        /*jshint validthis: true */
        var vm = this;



            vm.loading = false;
            vm.doSignUp = function(){


                if (vm.form.$invalid) {
                    var element = angular.element(document.getElementById('signupForm'));
                    $animate.addClass(element, 'shake').then(function() {
                        element.removeClass('shake');
                    });
                        return;
                    }

                vm.loading = true;

                accountsResource.create(vm.form.user).then(function(success){
                 vm.loading = false;
                        console.log(success.email);
                        console.log(success.password);
                    authenticate.login(success.email, success.password);
                },

               function(err){
                   vm.loading = false;
                   vm.loginError = "An account with this email already exists!";
                   $log.log(err);
               });

            };

    });
})();



angular.module('app.messages')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.messages', {

                url: '/messages',
                views: {
                    'menuContent': {
                        templateUrl: 'js/messages/messages.html'
                    }
                }
            });

    }); //
(function () {
    'use strict';
    var module = angular.module('app.messages');
    /* globals angular */
    module.controller('MessagesController', MessagesController);


    MessagesController.$inject = [];

    function MessagesController($log) {
        $log.log('here');
    }


})();

angular.module('app.selectOrganization')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.selectOrganization', {

                url: '/selectorganization',
                views: {
                    'menuContent': {
                        templateUrl: 'js/select-organization/select.html',
                        controller: 'SelectOrganization as selectOrganization'
                    }
                }
            });

    });
(function () {
    'use strict';


    angular.module('app.selectOrganization')
        .controller('SelectOrganization', function MessagesController(accountsResource, $ionicBackdrop, $scope, $log, $http, baseApiUrl, $ionicPopup, $timeout, organizationsResource) {
            var vm = this;

            vm.pendingOrganizations = [];


            vm.getPendingOrganizations = function(){
                accountsResource.pendingInvitations().then(function(response){

                    vm.pendingOrganizations = response[0].invitation_requests;
                });
            };
            vm.getPendingOrganizations();
            //get pending organizations//
           $scope.showConfirm = function(item) {

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Request Invite?',
                    template: 'Once the manager approves your request you will be added to this organization'
                });
               $ionicBackdrop.retain();
                confirmPopup.then(function(res) {
                    if(res) {

                        console.log(item);
                        organizationsResource.requestInvite(item._id).then(function(success){
                            $log.log(success);
                            vm.pendingOrganizations.push(item);
                        },
                        function(err){
                            $log.error(err);
                        })

                    }
                });


            };

            vm.clickedMethod = function (callback) {

                $scope.showConfirm(callback.item);

            }
// inside your controller you can define the 'clickButton()' method the following way
            vm.clickButton = function () {
                var ionAutocompleteElement = document.getElementsByClassName("ion-autocomplete");
                angular.element(ionAutocompleteElement).controller('ionAutocomplete').fetchSearchQuery("", true);
                angular.element(ionAutocompleteElement).controller('ionAutocomplete').showModal();
            }
           vm.callbackMethod = function (query, isInitializing) {
               if (isInitializing) {
                   // depends on the configuration of the `items-method-value-key` (items) and the `item-value-key` (name) and `item-view-value-key` (name)
                   return {items: []}
               } else {
                   return $http.get(baseApiUrl + '/api/organizations/search?name=' + query);
               }
           }




    });

})();
angular.module('app.settings')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.settings', {

                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'js/settings/settings.html',
                        controller: 'SettingsController as settings'
                    }
                }
            });

    });

(function () {

    'use strict';
    var module = angular.module('app.settings');

    module.controller('SettingsController', function SettingsController($log, deployChannel, $scope) {
        console.log('here');
        var deploy = new Ionic.Deploy();
        deploy.setChannel(deployChannel);

        // Update app code with new release from Ionic Deploy
        $scope.doUpdate = function() {
            console.log('here');
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

    });


})();

(function () {
    'use strict';

    angular.module('app.core').factory(
        'accountsResource', function($resource, baseApiUrl, $rootScope) {

        var factory = {};

        function buildResource(subpath) {
            return $resource(
                baseApiUrl + '/api/accounts' + subpath, {}, {
                    update: {
                        method: 'PUT'
                    }
                });
        }

        factory.create = function(account){
                           var resource = buildResource('');
                           return resource.save({account: account}).$promise;
                       };

            factory.pendingInvitations = function(){
                var resource = buildResource('/:_id/pendinginvitations');
                return resource.query({_id:$rootScope.currentUser._id}).$promise;
            };

        return factory;

    });
})();

(function () {
    'use strict';

    angular.module('app.core').factory(
        'organizationsResource', organizationsResource);

    /* @ngInject */
    function organizationsResource($resource, baseApiUrl, $rootScope) {

        var factory = {};

        function buildResource(subpath) {
            return $resource(
                baseApiUrl + '/api/organizations' + subpath, {}, {
                    update: {
                        method: 'PUT'
                    }
                });
        }

        factory.search = function (query) {
            var resource = buildResource('/search');
            return resource.query({name: query}).$promise;
        };

        factory.save = function(organizationId) {
            var resource = buildResource('/:_id/adduser');
            return resource.save({_id:organizationId},{userId: $rootScope.currentUser._id}).$promise;
        };
        factory.requestInvite = function(organizationId) {
            var resource = buildResource('/:_id/requestinvite');
            return resource.save({_id:organizationId},{userId: $rootScope.currentUser._id}).$promise;
        };



        return factory;

    }
})();
//
(function () {
    'use strict';

    angular.module('app.core').factory(
        'usersResource', usersResource);

    /* @ngInject */
    function usersResource($resource, baseApiUrl) {

        var factory = {};

        function buildResource(subpath) {
            return $resource(
                baseApiUrl + 'api/users' + subpath, {}, {
                    update: {
                        method: 'PUT'
                    }
                });
        }

        factory.sendResetEmail = function (email) {
            console.log("url:" + baseApiUrl);
            var resource = $resource(baseApiUrl + '/api/authenticate/forgot',{},{ reset:{
                method: 'POST',
                isArray: false
            }});
            return resource.reset({},{email: email}).$promise;
        };

        factory.resetPassword = function (token, password) {
            var resource = $resource(baseApiUrl + 'authenticate/reset/:token',{},{ reset:{
                method: 'POST',
                isArray: false
            }});
            return resource.reset({token: token},{password: password}).$promise;
        };


        factory.getActiveUsers = function () {
            var resource = buildResource('/active');
            return resource.query({}).$promise;
        };

        factory.getUsers = function () {


        };

        factory.create = function (user) {
            var resource = buildResource('');
            return resource.save(user).$promise;
        };

        factory.update = function (user) {
            var resource = buildResource('/:_id');
            return resource.update({_id: user._id}, user).$promise;
        };

        factory.getFile = function (userId) {
            var resource = buildResource('/:_id/file');
            return resource.query({_id: userId}).$promise;
        };

        return factory;

    }
})();
