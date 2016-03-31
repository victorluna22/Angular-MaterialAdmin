'use strict';

angular.module('stepBoxApp')
.factory('auth', function ($window, $rootScope, $location, api) {
    var storage = $window.localStorage;
    var cachedToken = "-1";
    var cachedUser;
    return {
        login: function (email, password, cb) {
            var a = this;
            api.login(email, password, function (result) {
                // if (!result.data.error) {
                //     $rootScope.user = result.data.user;
                //     a.setToken(result.data.token);
                //     cb(result);
                // } else {
                //     cb({status: 500, message: "The operation could not be completed"});
                // }
            });
        },
        
        setToken: function (token) {
            cachedToken = token;
            console.log('setToken', token);
            storage.setItem('Step_UserToken', token);
        },
        getToken: function () {
            if (cachedToken == "-1") cachedToken = storage.getItem('Step_UserToken');
            if (cachedToken === null) cachedToken = "-1";
            return cachedToken;
        },
        isAuthenticated: function () {
            // console.log("isAuth", this.getToken());
            return this.getToken() != "-1";
        },
        logout: function () {
            this.setToken("-1");
            $rootScope.permissions = {ready: false};
            $rootScope.$emit("update-user-token", "-1");
        },
        getUser: function (token, cb) {
            var a = this;
            if (cachedUser) {
                return cachedUser;
            } else {
                var lookup = function (result) {
                    if (result.status == 200) {
                        cachedUser = result;
                        $rootScope.$emit("user-lookup", result);
                        cb(cachedUser);
                    } else {
                        //console.log("getUser errror");
                        storage.removeItem('Step_UserToken');
                        cachedToken = "-1";
                        $rootScope.$emit("update-user-token", "-1");
                        $location.path('/login');
                    }
                };
                api.lookup(token, lookup);
                return "NO_CACHE";
            }
        }
    };
});