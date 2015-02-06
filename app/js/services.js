angular.module('services', ['ngResource'])
    .factory('ListService', ['$resource', function ($resource) {
        return $resource('/data/:id', {}, {
                get: {
                    method: 'GET',
                    isArray: true
                }
            }
        )
    }]);