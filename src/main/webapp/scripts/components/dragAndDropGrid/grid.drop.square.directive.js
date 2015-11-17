angular.module('griddropApp')
    .directive('gridDropSquare', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                size: '=',
                content: '='
            },
            link: function(scope, el, attrs, ctrl) {},
            templateUrl: 'scripts/components/dragAndDropGrid/grid-drop-square.html'
        }
    });
