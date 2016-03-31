'use strict';

/**
 * @ngdoc function
 * @name stepBoxApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the stepBoxApp
 */

angular.module('stepBoxApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'auth', '$state', 'growlService',
  	function ($scope, $rootScope, $location, auth, $state, growlService) {
    
    $rootScope.login_screen = true;
  	$rootScope.logged_in = auth.isAuthenticated();
    this.login = 1;
    this.register = 0;
    this.forgot = 0;
    var original;
    $rootScope.login_user = {
        email: 'victorluna22@gmail.com',
        password: '123456'
    };
    original = angular.copy($rootScope.login_user);
    $rootScope.login = function () {
        auth.login($rootScope.login_user.email, $rootScope.login_user.password, function (result) {
            //console.log("LoginCtrl.login result", result);
            if (!result.data.error) {
      			   $state.transitionTo('home');
               $rootScope.login_screen = false;
            } else {
                if (result.message !== null) {
                    growlService.growl(result.message, 'inverse');
                } else {
                    growlService.growl('There was an error processing the request. Try again', 'inverse');
                }
            }
        });
    };

  }]);
