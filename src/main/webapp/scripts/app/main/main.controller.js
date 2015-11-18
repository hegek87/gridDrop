'use strict';

angular.module('griddropApp')
    .controller('MainController', ['$scope', 'Principal', 'RandomContent', function ($scope, Principal, RandomContent) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
            $scope.initial = RandomContent.getRandomContent();

            $scope.totalScore = 0;
            $scope.gameOver = false;

            $scope.contents = [];

            $scope.resetGame = function() {
                $scope.contents = [];
                for(var i = 0; i < 3; ++i) {
                    var contentRow = [];
                    for(var j = 0; j < 3; ++j) {
                        contentRow.push({ score: 0, color: 'lightgrey' });
                    }
                    $scope.contents.push(contentRow);
                }
                $scope.totalScore = 0;
            };
            $scope.resetGame();


            $scope.$on('grid-drop-change', function(event, position) {
                $scope.clearMatches($scope.contents, position.dropPositionX, position.dropPositionY);
                if($scope.isGameOver()) {
                    $scope.gameOver = true;
                }
            });

            $scope.isGameOver = function() {
                var gameOver = true;
                angular.forEach($scope.contents, function(rows) {
                    angular.forEach(rows, function(el) {
                        if(el.color === 'lightgrey') {
                            gameOver = false;
                        }
                    })
                })
            };

            $scope.clearMatches = function(grid, x, y) {
                var initialScore = $scope.totalScore;

                $scope.clearAdjacentMatches(grid, x, y);

                if($scope.scoreChanged(initialScore)) {
                    $scope.reset(grid[x][y]);
                }
            };

            $scope.clearAdjacentMatches = function(grid, x, y) {
                $scope.clearCellIfPossible(grid[x][y], $scope.getCellFromCoordinates(grid, x-1, y-1)); // top left
                $scope.clearCellIfPossible(grid[x][y], $scope.getCellFromCoordinates(grid, x-1, y)); // top
                $scope.clearCellIfPossible(grid[x][y], $scope.getCellFromCoordinates(grid, x-1, y+1)); // top right
                $scope.clearCellIfPossible(grid[x][y], $scope.getCellFromCoordinates(grid, x, y-1)); // mid left
                $scope.clearCellIfPossible(grid[x][y], $scope.getCellFromCoordinates(grid, x, y+1)); // mid right
                $scope.clearCellIfPossible(grid[x][y], $scope.getCellFromCoordinates(grid, x+1, y-1)); // bottom left
                $scope.clearCellIfPossible(grid[x][y], $scope.getCellFromCoordinates(grid, x+1, y)); // bottom
                $scope.clearCellIfPossible(grid[x][y], $scope.getCellFromCoordinates(grid, x+1, y+1)); // bottom right
            };

            $scope.clearCellIfPossible = function(original, adjacent) {
                if($scope.isMatch(original, adjacent)) {
                    $scope.reset(adjacent);
                }
            };

            $scope.isMatch = function(original, gridElement) {
                return original.color === gridElement.color;
            };

            $scope.reset = function(gridElement) {
                gridElement.color = 'lightgrey';
                $scope.totalScore += gridElement.score;
                gridElement.score = 0;
            };

            $scope.getCellFromCoordinates = function(grid, x, y) {
                if($scope.outOfBounds(x, y, grid.length)) {
                    return {}
                }
                return grid[x][y];
            };

            $scope.outOfBounds = function(x, y, gridSize) {
                return x < 0 || y < 0 || x >= gridSize || y >= gridSize;
            };

            $scope.scoreChanged = function(initialScore) {
                return initialScore !== $scope.totalScore;
            }
        });
    }]);
