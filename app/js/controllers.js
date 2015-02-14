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
            return(loginService.isLoggedIn() === menu.authRequired);
        }

        this.isActive = function(path) {
            return location.path() === '/' + path;
        }

        this.init();
    }])

    .controller('ListController', ['$scope', 'ListService', 'LoginService', function (scope, listService, loginService) {
        scope.init = function() {
            scope.colors = ['default', 'primary', 'info', 'success', 'warning', 'danger'];
            if(loginService.isLoggedIn()) {
                scope.boards = listService.board.listAll({members : loginService.getCurrentUser().username});
                scope.initNewBoard();
            } else {
                loginService.redirectToLogin();
            }
        };

        scope.initNewBoard = function() {
            scope.newBoard = {name : null, owners : [loginService.getCurrentUser().username], members : [loginService.getCurrentUser().username], lists : [], class : 'primary'};
            scope.newBoard.newMember = '';
            scope.newBoard.newOwner = '';
        }

        scope.delete = function(board) {
            listService.board.delete({id : board._id}, scope.init);
        }

        scope.addMember = function(element) {
            if(scope.newBoard.members.indexOf(element) == -1) {
                scope.newBoard.members.push(element);
                scope.error = null;
            } else {
                scope.error = 'Username Should Be Unique!'
            }
            scope.newBoard.newMember = '';
        };

        scope.addOwner = function(element) {
            if(scope.newBoard.owners.indexOf(element) == -1) {
                scope.addMember(element);
                scope.newBoard.owners.push(element);
                scope.error = null;
            } else {
                scope.error = 'Username Should Be Unique!'
            }
            scope.newBoard.newOwner = '';
        };

        scope.createBoard = function() {
            if(!scope.newBoard.name || scope.newBoard.name == '') {
                scope.error = 'Please Fill In Mandatory Details!';
            } else {
                if(scope.newBoard.newOwner != '') {
                    scope.addOwner(scope.newBoard.newOwner);
                }
                if(scope.newBoard.newMember != '') {
                    scope.addMember(scope.newBoard.newMember);
                }
                scope.newBoard.createdOn = new Date();
                console.log(scope.newBoard);
                scope.showModal = false;
                delete scope.newBoard.newOwner;
                delete scope.newBoard.newMember;
                var ret = listService.board.post(scope.newBoard, scope.init);
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
            scope.initNewList();
            listService.board.get(
                {members : loginService.getCurrentUser().username, id : routeParams.id},
                function(data) {
                    scope.board = data;
                    scope.lists = listService.list.listAll({boardId : scope.board._id});
                }
            );
        };

        scope.initNewList = function() {
            scope.newList = {name : null, note : ''};
        }

        scope.createList = function() {
            if(!scope.newList.name || scope.newList.name == '') {
                scope.error = 'Please Fill In Mandatory Details!';
            } else {

                console.log(scope.newList);
                scope.showModal = false;
                var ret = listService.list.post(scope.newList, scope.appendList);
            }
        };

        scope.appendList = function(data) {
            scope.board.lists.push(data._id);
            listService.board.post(scope.board, scope.init);
        }
        scope.deleteList = function(id) {
            scope.board.lists.splice(scope.board.lists.indexOf(id), 1);
            listService.board.post(scope.board, scope.init);
        }

        scope.init();

    }])
    .controller('NoteController', ['$scope', 'ListService', '$document', function (scope, listService) {
        scope.rowCount = 0;

        scope.save = function(list) {
            listService.list.post(list);
        };

        scope.delete = function(list) {
            listService.list.delete({id : list._id},
                function() {
                    scope.$parent.deleteList(list._id);
                }
            );
        };
        scope.update = function(elementIndex) {
            var element = angular.element('#list' + elementIndex + '_text');
            var height = element.css('height').toString().match('[0-9]+');
            var lineHeight = element.css('line-height').toString().match('[0-9]+');
            var scrollHeight = element.prop('scrollHeight');
            if(height < scrollHeight)  scope.rowCount = scope.rowCount + (scrollHeight - height) / lineHeight;
        };
    }])
    .controller('SignUpController', ['$scope', 'LoginService', function (scope, loginService) {
        loginService.invalidate();

        scope.validateUsername =function(username) {
            console.log('validating');
            loginService.validateUsername(username,
                function() {
                    scope.duplicateUsernameError = false;
                    scope.validUsername = true;
                },
                function() {
                    scope.validUsername = false;
                    scope.duplicateUsernameError = true;
                }
            );
        }

        scope.createUser =function(name, username, password) {
            console.log('creating');
            var newUser = {username : username, name : name, password : password};
            loginService.createUser(newUser,
                function() {
                    console.log('created');
                    loginService.redirectToLogin();
                },
                function() {console.log('failed');}
            );
        }
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