'use strict';

angular.module('griddropApp')
    .controller('MainController', ['$scope', 'Principal', 'RandomContent', function ($scope, Principal, RandomContent) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
            $scope.initial = RandomContent.getRandomContent();

            $scope.totalScore = 0;

            $scope.contents = [];
            for(var i = 0; i < 3; ++i) {
                var contentRow = [];
                for(var j = 0; j < 3; ++j) {
                    contentRow.push({ score: 0, color: 'lightgrey' });
                }
                $scope.contents.push(contentRow);
            }

            $scope.$on('grid-drop-change', function(result) {
                console.log('here');
                $scope.checkGridForAdjacentMatches($scope.contents);
            });

            $scope.checkGridForAdjacentMatches = function(grid) {
                for(var i = 0; i < grid.length; ++i) {
                    for(var j = 0; j < grid[i].length; ++j) {
                        $scope.checkElementForAdjacentMatches(i, j, grid);
                    }
                }
            };

            $scope.checkElementForAdjacentMatches = function(x, y, grid) {
                var isMatchFound = false;
                var topLeft = ((x === 0) || (y === 0)) ? {} : grid[x-1][y-1];
                var top = (x === 0) ? {} : grid[x-1][y];
                var topRight = ((x === 0) || (y === grid.length - 1)) ? {} : grid[x-1][y+1];
                var midLeft = (y === 0) ? {} : grid[x][y-1];
                var midRight = (y === grid.length - 1) ? {} : grid[x][y+1];
                var bottomLeft = ((x === grid.length - 1) || y === 0) ? {} : grid[x+1][y-1];
                var bottom = (x === grid.length - 1) ? {} : grid[x+1][y];
                var bottomRight = ((x === grid.length - 1) || (y === grid.length - 1)) ? {} : grid[x+1][y+1];

                isMatchFound = $scope.isMatch(grid[x][y], topLeft);
                isMatchFound = $scope.isMatch(grid[x][y], top);
                isMatchFound = $scope.isMatch(grid[x][y], topRight);
                isMatchFound = $scope.isMatch(grid[x][y], midLeft);
                isMatchFound = $scope.isMatch(grid[x][y], midRight);
                isMatchFound = $scope.isMatch(grid[x][y], bottomLeft);
                isMatchFound = $scope.isMatch(grid[x][y], bottom);
                isMatchFound = $scope.isMatch(grid[x][y], bottomRight);

                if(isMatchFound) {
                    $scope.reset(grid[x][y]);
                }

                return isMatchFound;
            };

            $scope.isMatch = function(original, gridElement) {
                if(original.color === gridElement) {
                    $scope.reset(gridElement);
                    return true;
                }
                else {
                    return false;
                }
            };

            $scope.reset = function(gridElement) {
                gridElement.color = 'lightgrey';
                $scope.totalScore += girdElement.score;
                gridElement.score = 0;
            }
        });
    }]);
