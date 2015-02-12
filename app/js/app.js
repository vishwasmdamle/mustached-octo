{
    var app = angular.module('SampleAngularApp', ['ngRoute', 'controllers', 'directives'])
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                    when('/list', {
                        templateUrl: 'views/list.html',
                        controller: 'ListController'
                    }).
                    when('/userHome', {
                        templateUrl: 'views/list.html',
                        controller: 'ListController',
                        caseInsensitiveMatch: true
                    }).
                    when('/login', {
                        templateUrl: 'views/login.html',
                        controller: 'LoginController'
                    }).
                    when('/logout', {
                        templateUrl: 'views/login.html',
                        controller: 'LoginController'
                    }).
                    when('/board/:id', {
                        templateUrl: 'views/Board.html',
                        controller: 'BoardController',
                    }).
                    when('/signUp', {
                        templateUrl: 'views/signUp.html',
                        controller: 'SignUpController',
                        caseInsensitiveMatch: true
                    }).
                    otherwise({
                        redirectTo: '/home'
                    });
            }]);
}
