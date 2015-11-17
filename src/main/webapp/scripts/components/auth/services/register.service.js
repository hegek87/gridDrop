'use strict';

angular.module('griddropApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


