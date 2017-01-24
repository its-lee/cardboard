angular.module('cardboard').controller('cards', ['$scope', 'cardboardService', 'modalService', 
function($scope, cardboardService, modalService) {
	
	$scope.onVisibleChange = function(c) {
		cardboardService.updateCard({
			id: c.id,
			visible: c.visible
		});
	}
	
	$scope.showAll = function(visible) {
		_.each($scope.cardsTable.cards, function(c) {
			cardboardService.updateCard({
				id: c.id,
				visible: visible
			});
		});
	}
	
	$scope.cardsTable = {
		search: '',
		cards: cardboardService.cards
	};
}]);
