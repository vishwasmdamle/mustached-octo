angular.module('services', ['ngResource', 'ngCookies'])
    .service('ListService', ['$resource', function ($resource) {
        return {
            board : $resource('/board/:id', {}, {
                    listAll: {
                        method: 'GET',
                        isArray: true
                    },
                    get: {
                        method: 'GET'
                    },
                    post: {
                        method: 'POST'
                    },
                    delete: {
                        method: 'DELETE'
                    }
                }
            ),
            list : $resource('/list/:id', {}, {
                    listAll : {
                        method: 'GET',
                        isArray: true
                    },
                    get: {
                        method: 'GET'
                    },
                    post: {
                        method: 'POST'
                    },
                    delete: {
                        method: 'DELETE'
                    }
                }
            )
        }
    }])
    .service('LoginService', ['$location', '$http', '$cookieStore', function (location, http, cookieStore) {
        var self = this;
        self.isLoggedIn = function() {
            return (cookieStore.get('currentUser') != null);
        };

        self.redirectToLogin = function() {
            location.path('login');
        };

        self.logout = function() {
            self.invalidate();
            location.path('login');
        }
        self.invalidate = function() {
            cookieStore.put('currentUser', null);
        }

        self.authenticate = function(username, password, success, failure) {
            self.invalidate();
            http.post('/auth', {username : username, password : password})
            .success(
                function(user) {
                    cookieStore.put('currentUser', user);
                    success();
                }
            )
            .error(failure);
         };

        self.validateUsername = function(username, success, failure) {
            http.get('/username/' + username)
                .success(success)
                .error(failure);
         };

        self.createUser = function(user, success, failure) {
            http.post('/user', user)
                .success(success)
                .error(failure);
         };

         self.getCurrentUser = function() {
         return cookieStore.get('currentUser');
         };
   }]);