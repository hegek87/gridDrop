'use strict';

angular.module('griddropApp')
    .factory('DragAndDropHelper', function() {
        var content;

        return {
            setContent: function(content) {
                this.content = content;
            },

            getContent: function() {
                return this.content;
            }
        }
    });
