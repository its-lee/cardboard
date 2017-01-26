angular.module('cardboard').controller('xxport', ['$scope', 'cardboardService',
function($scope, cardboardService) {
	
	$scope.exportData = function() {
		saveTextAs(JSON.stringify(cardboardService.cardboard), 'cardboard-' + Date.now().toString());
	}
	
	$scope.importData = function(a, b, c) {

	}
}]);
