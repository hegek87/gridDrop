'use strict';

angular.module('griddropApp')
    .directive('dragTarget', ['DragAndDropHelper', function(DragAndDropHelper) {
        return {
            restrict: 'A',
            replace: true,
            require: 'gridDropSquare',
            link: function(scope, el, attrs, ctrl) {
                angular.element(el).attr("draggable", "true");

                el.bind('dragstart', function(e) {
                    e.originalEvent.dataTransfer.effectAllowed = 'move';

                    // We don't use the data transfer to move data, instead we communicate
                    // through required controllers. However, firefox requires data to be set
                    e.originalEvent.dataTransfer.setData('text/plain', 'stop');

                    DragAndDropHelper.setContent(ctrl.getContent());
                    angular.element(e.target).addClass('dragged');
                });

                el.bind('dragend', function(e) {
                    angular.element(e.target).removeClass('dragged');
                })
            }
        }
    }]);
