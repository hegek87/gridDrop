angular.module('griddropApp')
    .directive('grid', function() {
        return {
            restrict: 'E',
            scope: {
                width: '=',
                height: '='
            },
            controller: ['$scope', function($scope) {
                $scope.dummy = {
                    score: 10
                };
                $scope.content = {};

                this.getContent = function() {
                    return $scope.content;
                };

                this.setContent = function(content) {
                    $scope.content = content;
                };
            }],
            link: function(scope, element, attrs, ctrl) {
                scope.getRows = function() {
                    return new Array(scope.width);
                };
                scope.getCols = function() {
                    return new Array(scope.height);
                };
            },
            templateUrl: 'scripts/components/dragAndDropGrid/grid.html'

        }
    });
