angular.module('griddropApp')
    .directive('gridDropSquare', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                size: '=',
                content: '=',
                isPalette: '=',
                gridDropX: '=',
                gridDropY: '='
            },
            controller: ['$scope', function($scope) {
                this.getGridDropX = function() {
                    return $scope.gridDropX;
                };

                this.getGridDropY = function() {
                    return $scope.gridDropY;
                };

                this.getContent = function() {
                    return $scope.content;
                };

                this.setContent = function(content) {
                    $scope.content = content;
                };

                this.isPalette = function() {
                    return $scope.isPalette;
                };

                $scope.$watch('content.displayClass', function(displayClass) {
                    $scope.chosenClass = 'grid-size-' + $scope.size + ' ' + displayClass;
                })
            }],
            link: function(scope, el, attrs, ctrl) {},
            templateUrl: 'scripts/components/dragAndDropGrid/grid-drop-square.html'
        }
    });
