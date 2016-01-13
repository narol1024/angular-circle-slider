(function(window, document, angular) {
    angular.module('ui.circleSlider', []).directive('circleSlider', ['$document', '$timeout', function($document, $timeout) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                value: '=',
                max: '@'
            },
            template: '<div class="circle">' +
                '   <div class="text-wrap"><span class="text"></span></div>' +
                '   <div class="handler" tabIndex="0"></div>' +
                '</div>',
            link: function(scope, element, attr) {
                var $circle = element;
                var $handler = $circle.find('.handler');
                var $text = $circle.find('.text');
                var circleWidthHelf = $circle.width() / 2;
                var handlerWidthHelf = $handler.width() / 2;
                var circleOffset = $circle.offset();
                var circlePosition = {
                    x: circleOffset.left,
                    y: circleOffset.top
                };
                var PI2 = Math.PI / 180;

                scope.$watch('value', function(newValue, oldValue) {
                    transform(scope.value);
                });

                function transform(deg) {
                    var X = Math.round(circleWidthHelf * Math.sin(deg * PI2));
                    var Y = Math.round(circleWidthHelf * -Math.cos(deg * PI2));
                    var perc = (deg * scope.max / 360) | 0;
                    $handler.css({
                        left: X + circleWidthHelf - handlerWidthHelf,
                        top: Y + circleWidthHelf - handlerWidthHelf
                    });
                    $text.html(perc + "&deg;");
                }

                $handler.bind('mousedown', function() {
                    $document.bind('mousemove', mousemove);
                    $document.bind('mouseup', mouseup);
                });

                function mousemove(event) {
                    var position = {
                        x: event.pageX - circlePosition.x,
                        y: event.pageY - circlePosition.y
                    };
                    var atan = Math.atan2(position.x - circleWidthHelf, position.y - circleWidthHelf);
                    var deg = -atan / PI2 + 180;
                    $timeout(function() {
                        transform(deg);
                        scope.value = parseInt(deg);
                    }, 30);
                }

                function mouseup() {
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup)
                }
                $handler.bind('keydown', keydown);

                function keydown(event) {
                    switch (event.keyCode) {
                        case 40:
                        case 39:
                            scope.$apply(function() {
                                scope.value = scope.value++ < scope.max ? scope.value : 0;
                            });
                            break;
                        case 38:
                        case 37:
                            //left
                            scope.$apply(function() {
                                scope.value = scope.value-- < 0 ? scope.max : scope.value;
                            });
                            break;
                        default:
                            break;
                    }
                }
            }
        };
    }]);
}(window, document, angular));
