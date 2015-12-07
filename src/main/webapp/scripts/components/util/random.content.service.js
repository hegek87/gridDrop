'use strict';

angular.module('griddropApp')
    .factory('RandomContent', function() {

        var colors = [
            'red',
            'blue',
            'green',
            'orange',
            'black',
            'yellow',
            'white',
            'pink'
        ];

        var currentShape = 'grid-cell';

        return {
            getRandomContent: function () {
                return {
                    score: Math.floor((Math.random() * 100) + 1),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    displayClass: currentShape
                }
            },

            randomColor: function () {
                var letters = '0123456789ABCDEF'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
        }
    });
