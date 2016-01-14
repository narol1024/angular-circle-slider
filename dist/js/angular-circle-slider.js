angular.module('ui.circleSlider', []).directive('circleSlider', ['$document', '$timeout', function($document, $timeout) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            value: '=',
            max: '@',
            readonly: '@',
            onSliderStart: '=',
            onSliderChange: '=',
            onSliderEnd: '='
        },
        template: '<div class="circle" tabIndex="0">' +
            '   <div class="text-wrap"><span class="text"></span></div>' +
            '   <div class="handler"></div>' +
            '</div>',
        link: function(scope, element, attr) {
            var readonly = attr.readonly;
            var onSliderStart = attr.onSliderStart;
            var onSliderChange = attr.onSliderChange;
            var onSliderEnd = attr.onSliderEnd;
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
                if (newValue !== oldValue && onSliderChange) {
                    scope.onSliderChange(newValue);
                }
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

            //圆环拖动
            $circle.bind('mousedown', function(event) {
                if (!readonly) {
                    var result = calculation(event);
                    if (onSliderStart) {
                        scope.onSliderStart(result);
                    }
                    $document.bind('mousemove', calculation);
                    $document.bind('mouseup', mouseup);
                }
            });

            function calculation(event) {
                var position = {
                    x: event.pageX - circlePosition.x,
                    y: event.pageY - circlePosition.y
                };
                var atan = Math.atan2(position.x - circleWidthHelf, position.y - circleWidthHelf);
                var deg = parseInt(-atan / PI2 + 180);
                $timeout(function() {
                    transform(deg);
                    scope.value = deg || scope.value;
                }, 30);
                return deg || scope.value;
            }

            function mouseup() {
                if (onSliderEnd) {
                    scope.onSliderEnd(scope.value);
                }
                $document.unbind('mousemove', calculation);
                $document.unbind('mouseup', mouseup)
            }

            //键盘绑定事件
            $circle.bind('keydown', keydown);
            $circle.bind('keyup', keyup);

            function keydown(event) {
                if (onSliderStart) {
                    scope.onSliderStart(scope.value);
                }
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

            function keyup() {
                if (onSliderEnd) {
                    scope.onSliderEnd(scope.value);
                }
            }
        }
    };
}]);
