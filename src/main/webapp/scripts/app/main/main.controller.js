'use strict';

angular.module('griddropApp')
    .controller('MainController', function ($scope, Principal) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;

            $scope.getRandomContent = function() {
                return {
                    score: Math.floor((Math.random() * 100) + 1),
                    color: $scope.randomColor()
                }
            };

            $scope.randomColor = function() {
                var letters = '0123456789ABCDEF'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++ ) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            };

            $scope.contents = [];
            for(var i = 0; i < 9; ++i) {
                $scope.contents.push($scope.getRandomContent());
            }
        });
    });
