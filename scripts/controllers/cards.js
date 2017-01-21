/*
	Tracking position with draggable in angular.
	http://stackoverflow.com/questions/15470666/angularjs-directive-attribute-binding-left-top-positions-after-dragging-with-ng
*/
angular.module('cardboard').controller('board', ['$scope', 'cardboardService', 'modalService', 
function($scope, cardboardService, modalService) {
	
	const modalTemplateUrl = 'partials/card-modal.html';
	
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
	
	function getSelectedCard()
	{
		return _.find($scope.cards, function(c) { return c.id === $scope.selectedCardId; });
	}
	
	$scope.editCard = function() {
		var c = getSelectedCard();
		if (c)
		{
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
	}
	
	$scope.deleteCard = function() {
		var c = getSelectedCard();
		if (c)
		{
			modalService.showModal({
				templateUrl: 'partials/delete-card-modal.html'
			}, {})
			.then(function(result) {
				cardboardService.deleteCard(c.id);
			});
		}
	}
	
	$scope.onMoveStop = function(attrs, left, top) {
		cardboardService.updateCard({
			id: parseInt(attrs.cardId),
			left: left,
			top: top
		});
	}
	
	$scope.cardClick = function(card) {
		if ($scope.editMode) {
			// If clicking on an already selected card, then unselect it.
			if (card.id === $scope.selectedCardId)
				$scope.selectedCardId = null;
			else
				// If another card is clicked on, then select it.
				$scope.selectedCardId = card.id;
		}
	}
	
	$scope.editClick = function() {
		// When changing mode, ensure that no card is now selected;
		$scope.selectedCardId = null;
		// Switch mode.
		$scope.editMode = !$scope.editMode;
	}
	
	$scope.selectedCardId = null;
	$scope.editMode = false;
	$scope.cards = cardboardService.cardboard.cards;
	
}]);
