'use strict';

/**
 * @ngdoc function
 * @name stepBoxApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the stepBoxApp
 */
angular.module('stepBoxApp')
  .controller('RegisterCtrl', ['$scope', 'api', function ($scope, api) {
    $scope.user = {};

    $scope.register = function(){
    	api.register($scope.user, function(result){
    		console.log(result);
    	});
    };

  }]);
