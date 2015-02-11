angular.module('services', ['ngResource', 'ngCookies'])
    .service('ListService', ['$resource', function ($resource) {
        return $resource('/data/:id', {}, {
                list: {
                    method: 'GET',
                    isArray: true
                },
                get: {
                    method: 'GET'
                },
                post: {
                    method: 'POST'
                }
            }
        )
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

         self.getCurrentUser = function() {
         return cookieStore.get('currentUser');
         };
   }]);