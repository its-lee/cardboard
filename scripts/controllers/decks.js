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
		})
		.then(function(result) {
			cardboardService.updateDeck(result);
		});
	}
	
	$scope.deleteDeck = function(d) {
		modalService.showModal({
			templateUrl: 'partials/delete-deck-modal.html'
		}, {
			card_count: cardboardService.getCardsInDeck(d.id).length,
		})
		.then(function(result) {
			cardboardService.deleteDeck(d.id);
		});
	}
	
	$scope.hideAll = function(d, hide) {
		_.each(cardboardService.getCardsInDeck(d.id), function(c) {
			cardboardService.updateCard({
				id: c.id,
				hidden: hide
			});
		});
	}
	
	$scope.decks = cardboardService.decks;
}]);
