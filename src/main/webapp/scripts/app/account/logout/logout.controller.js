'use strict';

angular.module('griddropApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
