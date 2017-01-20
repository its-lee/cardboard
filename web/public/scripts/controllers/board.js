/*
	Tracking position with draggable in angular.
	http://stackoverflow.com/questions/15470666/angularjs-directive-attribute-binding-left-top-positions-after-dragging-with-ng
*/
angular.module('cardboard').controller('board', ['$scope', 'cardboardService', 'modalService', 
function($scope, cardboardService, modalService) {
	
	const modalTemplateUrl = '/../../partials/card-modal.html';
	
	$scope.cards = cardboardService.cardboard.cards;
	
	$scope.addCard = function() {
		modalService.showModal({
			templateUrl: modalTemplateUrl
		}, {
			modalTitle: 'Add Card',
			left: 20,
			top: 20
		})
		.then(function(result) {
			cardboardService.addCard(result);
		});
	}
	
	$scope.editCard = function(c) {
		modalService.showModal({
			templateUrl: modalTemplateUrl
		}, {
			modalTitle: 'Edit Card',
			id: c.id,
			left: c.left,
			top: c.top,
			title: c.title,
			content: c.content
		})
		.then(function(result) {
			cardboardService.updateCard(result);
		});
	}
	
	$scope.onMoveStop = function(attrs, left, top) {
		
		cardboardService.updateCard({
			id: parseInt(attrs.cardId),
			left: left,
			top: top
		});
		
	}
}]);