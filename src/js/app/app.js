'use strict';
(function () {
    var requirements = [
        'ngRoute',
        'ngSanitize',
        'LocalStorageModule',
        'RegexGame.controllers',
        'RegexGame.services'
    ];
    if (window.cordova)
        requirements.push('ionic');

    var app = angular.module('RegexGame', requirements);
    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/?', {
                templateUrl: '/static/templates/views/index.html',
                controller: 'IndexController'
            }).when('/play/:levelId', {
                templateUrl: '/static/templates/views/game.html',
                controller: 'GameController'
            }).when('/created/?', {
                templateUrl: '/static/templates/views/game.html',
                controller: 'GameController'
            }).when('/golf/?', {
                templateUrl: '/static/templates/views/game.html',
                controller: 'GameController'
            }).when('/about/?', {
                templateUrl: '/static/templates/views/about.html',
                controller: 'IndexController'
            }).when('/end/?', {
                templateUrl: '/static/templates/views/end.html',
                controller: 'IndexController'
            }).when('/create/?', {
                templateUrl: '/static/templates/views/create.html',
                reloadOnSearch: false,
                controller: 'CreateController'
            }).when('/search/?', {
                templateUrl: '/static/templates/views/search.html',
                reloadOnSearch: false,
                controller: 'SearchController'
            }).otherwise({
                redirectTo: '/'
            });
        }]);

    if (window.cordova)
        app.run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar)
                    StatusBar.styleDefault();
            });
            $("#i-know-regex-mode").bootstrapSwitch('state');
        });
    else
        app.run(function ($rootScope, $location, $timeout) {
            $rootScope.$on('$routeChangeSuccess',
                function (event) {
                    document.getElementsByTagName("body")[0].className = "";
                    ga('send', 'pageview', {page: $location.path()});
                    if (typeof twttr != 'undefined' && $location.path() == "/")
                        $timeout(function () {
                            twttr.widgets.load(document.getElementById("index-container"));
                        });
                });
            $("#i-know-regex-mode").bootstrapSwitch('state');
        });
}());