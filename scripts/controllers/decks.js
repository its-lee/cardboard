angular.module('cardboard').controller('decks', ['$scope', 'cardboardService', 'modalService', 
function($scope, cardboardService, modalService) {
	
	const modalTemplateUrl = 'partials/deck-modal.html';
	
	$scope.addDeck = function() {
		modalService.showModal({
			templateUrl: modalTemplateUrl
		}, {
			modalTitle: 'Add Deck'
		})
		.then(function(result) {
			cardboardService.addDeck(result);
		});
	}
	
	$scope.editDeck = function(d) {
		modalService.showModal({
			templateUrl: modalTemplateUrl
		}, {
			modalTitle: 'Edit Deck',
			id: d.id,
			name: d.name,
			description: d.description,
			remove: false
		})
		.then(function(result) {
			if (result.remove)
				cardboardService.deleteDeck(result.id);
			else
				cardboardService.updateDeck(result);
		});
	}
	
	$scope.decks = cardboardService.cardboard.decks;
}]);
