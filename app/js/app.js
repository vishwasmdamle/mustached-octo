{
    var app = angular.module('SampleAngularApp', ['ngRoute', 'controllers'])
        .directive('navigation', function () {
            return {
                restrict: 'E',
                templateUrl: 'views/navigation.html'
            }
        })
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                    when('/list', {
                        templateUrl: 'views/list.html',
                        controller: 'ListController'
                    }).
                    when('/login', {
                        templateUrl: 'views/login.html',
                        controller: 'LoginController'
                    }).
                    when('/signUp', {
                        templateUrl: 'views/signUp.html',
                        controller: 'SignUpController',
                        caseInsensitiveMatch: true
                    }).
                    otherwise({
                        redirectTo: '/list'
                    });
            }]);
}
