'use strict';

/**
 * @ngdoc function
 * @name stepBoxApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the stepBoxApp
 */
angular.module('stepBoxApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
