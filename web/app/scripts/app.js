'use strict';

/**
 * @ngdoc overview
 * @name stepBoxApp
 * @description
 * # stepBoxApp
 *
 * Main module of the application.
 */
var materialAdmin = angular
  .module('stepBoxApp', [
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'oc.lazyLoad',
    'nouislider',
    'ngTable',
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(['$stateProvider', '$routeProvider', function ($stateProvider, $routeProvider) {

    $stateProvider

    .state ('home', {
        url: '/',
        controller: 'MainCtrl',
        templateUrl: 'views/main.html',
        authenticate: true
    })

    .state ('profile', {
        url: '/perfil',
        controller: 'ProfileCtrl',
        templateUrl: 'views/profile.html',
        authenticate: true
    })

    .state ('employees', {
        url: '/funcionarios',
        controller: 'EmployeesCtrl',
        templateUrl: 'views/employees.html',
        authenticate: false
    })
    .state ('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html',
        authenticate: false
    })

    .state ('logout', {
        url: '/logout',
        controller: function($scope, $route, auth){
            console.log($route);
        },
        authenticate: false
    });


  }])

    .run(['$rootScope', '$state', 'auth', 'ApiConfig', function($rootScope, $state, auth, ApiConfig) {
        $rootScope.$on('$stateChangeStart', function(evt, to, params) {
            if (to.name == 'logout'){
                auth.logout();
                $state.transitionTo('login');
                evt.preventDefault();
            }else{
                if (!auth.isAuthenticated() && to.authenticate) {
                    console.log('go to login');
                    $state.transitionTo('login');
                    evt.preventDefault();
                } 
            }
        });
    }])


  .service('scrollService', function() {
        var ss = {};
        ss.malihuScroll = function scrollBar(selector, theme, mousewheelaxis) {
            $(selector).mCustomScrollbar({
                theme: theme,
                scrollInertia: 100,
                axis:'yx',
                mouseWheel: {
                    enable: true,
                    axis: mousewheelaxis,
                    preventDefault: true
                }
            });
        }
        
        return ss;
    })

  .service('messageService', ['$resource', function($resource){
        this.getMessage = function(img, user, text) {
            var gmList = $resource("data/messages-notifications.json");
            
            return gmList.get({
                img: img,
                user: user,
                text: text
            });
        }
    }])

  .service('growlService', function(){
        var gs = {};
        gs.growl = function(message, type) {
            $.growl({
                message: message
            },{
                type: type,
                allow_dismiss: false,
                label: 'Cancel',
                className: 'btn-xs btn-inverse',
                placement: {
                    from: 'top',
                    align: 'right'
                },
                delay: 2500,
                animate: {
                        enter: 'animated bounceIn',
                        exit: 'animated bounceOut'
                },
                offset: {
                    x: 20,
                    y: 85
                }
            });
        }
        
        return gs;
    });



