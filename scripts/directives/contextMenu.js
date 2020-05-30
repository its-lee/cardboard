/*
    Context menu jQuery plugin from https://swisnl.github.io/jQuery-contextMenu/
*/
angular.module('cardboard').directive('contextMenu', function() {
    return {
        restrict: 'E',
        scope: {
            onContextClick: "&onContextClick"
        },
        link: function(scope, element, attrs) {
            
            $.contextMenu({
                selector: attrs.selector, 
                callback: function(key, options) {
                    scope.onContextClick({
                        option: key, 
                        // TODO: Pass something more general!!
                        id: parseInt($(this).attr("card-id")),
                    });
                },
                items: angular.fromJson(attrs.items)
            });
        }
    };
});
