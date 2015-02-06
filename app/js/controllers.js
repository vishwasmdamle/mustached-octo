angular.module('controllers', ['services'])
    .controller('NavigationController', ['$location', function (location) {
        console.log(location);
        this.leftMenus = leftMenus;
        this.rightMenus = rightMenus;
        this.brand = brand;
        this.name = "List Controller";

    }])
    .controller('ListController', ['$scope', 'ListService', function ($scope, listService) {
        $scope.init = function() {
            $scope.boards = listService.get();
            console.log('boards ');
             console.log($scope.boards);
        };
        $scope.init();
        $scope.name = "List Controller";
    }])
    .controller('LoginController', ['$scope', function ($scope) {
        $scope.name = "Login Controller";
    }])
    .controller('SignUpController', ['$scope', function ($scope) {
        $scope.name = "Sign Up Controller";
    }]);





leftMenus = [
    {
        name: 'Home',
        path: 'list',
        class: 'glyphicon-home'

    }
];

rightMenus = [
    {
        name: 'Login',
        path: 'login',
        class: 'glyphicon-log-in'
    },
    {
        name: 'Sign Up',
        path: 'signUp',
        class: 'glyphicon-user'

    }
];

brand = {
    name: 'FreeWheelers',
    logo: 'img/logo-large.png'
};