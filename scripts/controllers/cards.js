/*
	Tracking position with draggable in angular.
	http://stackoverflow.com/questions/15470666/angularjs-directive-attribute-binding-left-top-positions-after-dragging-with-ng
*/
angular.module('cardboard').controller('cards', ['$scope', 'cardboardService', 'modalService', 
function($scope, cardboardService, modalService) {
	
	const modalTemplateUrl = 'partials/card-modal.html';
	
	function addCard() {
		modalService.showModal({
			templateUrl: modalTemplateUrl
		}, {
			modalTitle: 'Add Card',
			left: 30,
			top: 100,
			decks: cardboardService.decks,
			defaultDeck: cardboardService.defaultDeck,
		})
		.then(function(result) {
			result.deck_id = result.selectedDeck.id;
			cardboardService.addCard(result);
		});
	}
	
	function findCardById(id) {
		return _.find($scope.cards, function(c) { return c.id === id; });
	}
	
	function editCard(id) {
		var c = findCardById(id);
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
				content: c.content,
				decks: cardboardService.decks,
				defaultDeck: cardboardService.defaultDeck,
				selectedDeck: _.find(cardboardService.decks, function(d) { return d.id === c.deck_id; })
			})
			.then(function(result) {
				result.deck_id = result.selectedDeck.id;
				cardboardService.updateCard(result);
			});
		}
	}
	
	function deleteCard(id) {
		var c = findCardById(id);
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
	
	$scope.onContextClick = function(option, id) {
		//var id = attrs["card-id"]
		
		switch (option) {
			case "add": addCard(); break;
			case "edit": editCard(id); break;
			case "delete": deleteCard(id); break;
		}
	}
	
	$scope.cards = cardboardService.cards;
	
}]);
