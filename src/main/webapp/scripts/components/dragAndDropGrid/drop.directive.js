angular.module('griddropApp')
    .directive('dropTarget', function() {
        return {
            restrict: 'A',
            link: function(scope, el, attrs, ctrl) {
                el.bind('drop', function(e) {
                    if(e.preventDefault) {
                        e.preventDefault();
                    }
                    if(e.stopPropagation) {
                        e.stopPropagation();
                    }
                    angular.element(e.currentTarget).removeClass('hover');
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
    });
