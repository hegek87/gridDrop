'use strict';

angular.module('griddropApp')
    .directive('dragTarget', ['DragAndDropHelper', 'RandomContent', function(DragAndDropHelper, RandomContent) {
        return {
            restrict: 'A',
            replace: true,
            require: 'gridDropSquare',
            link: function(scope, el, attrs, ctrl) {
                angular.element(el).attr("draggable", attrs['dragTarget']);

                el.bind('dragstart', function(e) {
                    e.originalEvent.dataTransfer.effectAllowed = attrs['dragTarget'] === 'true' ? 'move' : 'none';

                    // We don't use the data transfer to move data, instead we communicate
                    // through required controllers. However, firefox requires data to be set
                    e.originalEvent.dataTransfer.setData('text/plain', 'stop');

                    DragAndDropHelper.setContent(ctrl.getContent());
                    angular.element(e.target).addClass('dragged');
                });

                el.bind('dragend', function(e) {
                    if(ctrl.isPalette()) {
                        ctrl.setContent(RandomContent.getRandomContent())
                    }
                    angular.element(e.target).removeClass('dragged');
                    scope.$apply();
                })
            }
        }
    }]);
