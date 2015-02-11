angular.module('controllers', ['services'])
    .controller('NavigationController', ['$location', 'LoginService', function (location, loginService) {
        this.init = function(){
            this.leftMenus = leftMenus;
            this.rightMenus = rightMenus;
            this.brand = brand;
            console.log('auth ' + this.authState);
        };

        this.isLoggedIn = function() {
            return loginService.isLoggedIn();
        };

        this.getProfile = function() {
            if(!loginService.isLoggedIn())
                return null;
            var profile = loginService.getCurrentUser();
            if(!profile.thumbnail) {
                profile.thumbnail = 'img/default-profile.png';
            }
            return profile;
        }

        this.isVisible = function(menu) {
            if(!menu || menu.authRequired === null) return false;
//            console.log('authState ' + loginService.isLoggedIn() + ' menu.auth ' + menu.authRequired + ' menu.name ' + menu.name + ' ret ' + (this.authState === menu.authRequired));
            return(loginService.isLoggedIn() === menu.authRequired);
        }

        this.isActive = function(path) {
            return location.path() === '/' + path;
        }

        this.init();
    }])

    .controller('ListController', ['$scope', 'ListService', 'LoginService', function (scope, listService, loginService) {
        scope.init = function() {
            console.log(loginService);
            scope.showModal =  true;
            console.log(loginService.isLoggedIn());
            scope.initNewBoard();
            if(loginService.isLoggedIn()) {
                scope.boards = listService.list({members : loginService.getCurrentUser().username});
            } else {
                loginService.redirectToLogin();
            }
        };

        scope.initNewBoard = function() {
            scope.newBoard = {name : null, owners : [loginService.getCurrentUser().username], members : [loginService.getCurrentUser().username], lists : []};
        }

        scope.addOwnerOrMember = function(type) {
        var list, newObject;
            if(type === 'owner') {
                list = 'owners';
                newObject = 'newOwner';
            } else {
                list = 'members';
                newObject = 'newMember';
            }
            if(scope.newBoard[list].indexOf(scope.newBoard[newObject]) == -1) {
                scope.newBoard[list].push(scope.newBoard[newObject]);
                scope.error = null;
            } else {
                scope.error = 'Usernames Should Be Unique!'
            }
            scope.newBoard[newObject] = '';
        };

        scope.createBoard = function() {
            if(!scope.newBoard.name || scope.newBoard.name == '') {
                scope.error = 'Please Fill In Mandatory Details!';
            } else {
                scope.newBoard.createdOn = new Date();
                console.log(scope.newBoard);
                scope.showModal = false;
                delete scope.newBoard.newOwner;
                delete scope.newBoard.newMember;
                var ret = listService.post(scope.newBoard);
                scope.initNewBoard();
            }

        };
        scope.init();
        scope.name = "List Controller";
    }])

    .controller('LoginController', ['$scope', 'LoginService', '$location', function (scope, loginService, location) {
        if(location.path() === '/logout') {
            console.log('logout');
            loginService.logout();
            location.path('login');
        }
        if(loginService.isLoggedIn()) {
            location.path('list');
            return;
        }
        scope.authenticate = function(username, password) {
            console.log(username + password);
            if(username && password) {
                loginService.authenticate(username, password,
                    function() {
                        location.path('list');
                    },
                    function(data) {
                        console.log(data);
                        scope.error = data.error;
                    }
                );
            } else {
                scope.error = "Please enter all fields!";
            }
        }
    }])

    .controller('BoardController', ['$scope', 'ListService', 'LoginService', '$routeParams', function (scope, listService, loginService, routeParams) {
        scope.init = function() {
            console.log(routeParams);
            scope.board = listService.get({members : loginService.getCurrentUser().username, id : routeParams.id});
        };
        scope.init();

    }])
    .controller('SignUpController', ['$scope', function (scope) {
        scope.name = "Sign Up Controller";
    }]);





profile = {};

leftMenus = [
    {
        name: 'Home',
        path: 'list',
        class: 'glyphicon-home',
        authRequired: true
    }
];

rightMenus = [
    {
        name: 'Login',
        path: 'login',
        class: 'glyphicon-log-in',
        authRequired: false
    },
    {
        name: 'Sign Up',
        path: 'signUp',
        class: 'glyphicon-user',
        authRequired: false
    },
    {
        name: 'Log Out',
        path: 'logout',
        class: 'glyphicon-log-out',
        authRequired: true

    }
];

brand = {
    name: 'Mustached Octo',
    logo: 'img/logo-large.png'
};