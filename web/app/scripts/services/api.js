'use strict';

/**
 * @ngdoc service
 * @name gdsApp.UserApi
 * @description
 * # UserApi
 * Service in the gdsApp.
 */
angular.module('stepBoxApp')
  .service('api', function ($http, $location, localStorageService, ApiConfig, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var api = {};

    var apiUrl = ApiConfig.API_URL;
    var app_token = ApiConfig.APP_TOKEN;
    var platform = ApiConfig.PLATFORM;
    var client = ApiConfig.CLIENT;

    api.lookup = function (token, cb) {
        cb({status: 200, name: 'Victor'});
    };

    api.login = function (email, password, cb) {
        $http.post(apiUrl + '/User/Auth', {email:email, password:password}, {headers: {}})
        .then(function (data) {
         console.log('Success loginUser: ', data);
          cb(data);
        }, function (error) {
          console.warn('Error loginUser: ', error);
        });
    };

    api.register = function(data, cb){
      cb('to do');
    };

    return api;
});