'use strict';

/**
 * @ngdoc function
 * @name stepBoxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stepBoxApp
 */
angular.module('stepBoxApp')
  .controller('MainCtrl', ['$scope', '$rootScope', 'auth', function ($scope, $rootScope, auth) {
  	$rootScope.login_screen = false;
  	var token = auth.getToken();
    auth.getUser(token, function(user){
    	$scope.user = user;
    });
  }]);
