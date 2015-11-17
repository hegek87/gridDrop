'use strict';

angular.module('griddropApp')
    .controller('MainController', ['$scope', 'Principal', 'RandomContent', function ($scope, Principal, RandomContent) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
            $scope.initial = RandomContent.getRandomContent();

            $scope.contents = [];
            for(var i = 0; i < 3; ++i) {
                var contentRow = [];
                for(var j = 0; j < 3; ++j) {
                    contentRow.push(RandomContent.getRandomContent());
                }
                $scope.contents.push(contentRow);
            }
        });
    }]);
