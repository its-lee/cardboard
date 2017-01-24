angular.module('cardboard').controller('cards', ['$scope', 'cardboardService', 'modalService', 
function($scope, cardboardService, modalService) {
	
	$scope.onHideChange = function(c) {
		cardboardService.updateCard({
			id: c.id,
			hidden: c.hidden
		});
	}
	
	$scope.hideAll = function(hide) {
		_.each($scope.cardsTable.cards, function(c) {
			cardboardService.updateCard({
				id: c.id,
				hidden: hide
			});
		});
	}
	
	$scope.cardsTable = {
		search: '',
		cards: cardboardService.cards
	};
}]);
