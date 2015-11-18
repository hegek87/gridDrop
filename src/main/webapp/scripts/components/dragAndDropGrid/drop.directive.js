angular.module('griddropApp')
    .directive('dropTarget', ['DragAndDropHelper', function(DragAndDropHelper) {
        return {
            restrict: 'A',
            require: 'gridDropSquare',
            link: function(scope, el, attrs, ctrl) {
                el.bind('drop', function(e) {
                    if(e.preventDefault) {
                        e.preventDefault();
                    }
                    if(e.stopPropagation) {
                        e.stopPropagation();
                    }
                    if(ctrl.getContent().color === 'lightgrey') {
                        ctrl.setContent(DragAndDropHelper.getContent());
                    }
                    angular.element(e.currentTarget).removeClass('hover');
                    scope.$emit('grid-drop-change', {
                        dropPositionX: ctrl.getGridDropX(),
                        dropPositionY: ctrl.getGridDropY()
                    });
                    scope.$apply();
                });

                el.bind('dragover', function(e) {
                    if(e.preventDefault) {
                        e.preventDefault();
                    }

                    return false;
                });

                el.bind('dragenter', function(e) {
                    angular.element(e.currentTarget).addClass('hover');
                });

                el.bind('dragleave', function(e) {
                    angular.element(e.currentTarget).removeClass('hover');
                });
            }
        }
    }]);
