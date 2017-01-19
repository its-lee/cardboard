/*
	Tracking position with draggable in angular.
	http://stackoverflow.com/questions/15470666/angularjs-directive-attribute-binding-left-top-positions-after-dragging-with-ng
*/
angular.module('cardboard').controller('board', ['$scope', 'cardboardService', 
	function($scope, cardboardService) {
	
	$scope.cards = cardboardService.cards;
	
	// Called when an element has finished being dragged.
	// TODO: Save to server.
	$scope.onMoveStop = function(id, l, t) {
		
		console.log(id);
		// TODO: Sanitise l & t to be between 0 and 1.
		// TODO: Save l & t back to model and db.
		console.log(l, t);
		
	}
}]);

angular.module('cardboard').directive('draggable', function() {
	return {
		restrict: 'A',
		scope: {
			onMoveStop: '&onMoveStop'
		},
		link: function(scope, element, attrs) {
			element.draggable({
				cursor: "move",			// use the move compass cursor.
				containment: "#board", 	// cards must stay in the board.
				scroll: false,			// don't allow scroll outside of containment.
				stack: ".card",			// let jquery-ui automatically control the listed elements' z-order to allow stacking.				
				stop: function(event, ui) {
					// defer callback to current controller.
					scope.onMoveStop({ 
						element: element[0].id,
						left: ui.position.left,
						top: ui.position.top
					});
				}
			});
		}
	};
});