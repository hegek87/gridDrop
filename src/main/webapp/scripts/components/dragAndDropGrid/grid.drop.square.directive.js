angular.module('griddropApp')
    .directive('gridDropSquare', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                size: '=',
                content: '='
            },
            controller: ['$scope', function($scope) {
                this.getContent = function() {
                    return $scope.content;
                };

                this.setContent = function(content) {
                    $scope.content = content;
                }
            }],
            link: function(scope, el, attrs, ctrl) {},
            templateUrl: 'scripts/components/dragAndDropGrid/grid-drop-square.html'
        }
    });
