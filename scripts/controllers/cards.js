angular.module('cardboard').controller('cards', ['$scope', 'cardboardService', 'modalService', 
function($scope, cardboardService, modalService) {
	
	function findCardById(id) {
		return _.find($scope.cards, function(c) { return c.id === id; });
	}
	
	$scope.hideCard = function(id, hide) {
		var c = findCardById(id);
		if (!c) return;
		
		cardboardService.updateCard({
			id: id,
			hidden: hide
		});
	}
	
	$scope.cards = cardboardService.cards;
}]);
