angular.module('cardboard').service('modalService', ['$uibModal',
	function ($uibModal) {
		
		var modalDefaults = {
			backdrop: true,
			keyboard: true,
			modalFade: true,
			templateUrl: ''	// Must be externally!
		};
		
		var modalOptions = {};
		
		this.showModal = function (customModalDefaults, customModalOptions) {
			if (!customModalDefaults) customModalDefaults = {};
			customModalDefaults.backdrop = 'static';
			return this.show(customModalDefaults, customModalOptions);
		};
		
		this.show = function (customModalDefaults, customModalOptions) {
			
			//Create temp objects to work with since we're in a singleton service
			//Map angular-ui modal custom defaults to modal defaults defined in service
			var tempModalDefaults = {};
			angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
			
			//Map modal.html $scope custom properties to defaults defined in service
			var tempModalOptions = {};
			angular.extend(tempModalOptions, modalOptions, customModalOptions);
			
			// Set the controller for the template referred to by templateUrl.
			if (!tempModalDefaults.controller) {
				tempModalDefaults.controller = function ($scope, $uibModalInstance) {
					// Set the data in the scope from custom options.
					$scope.modalOptions = tempModalOptions;
					
					$scope.modalOptions.ok = function (result) {
						// Return updated custom options to the user.
						$uibModalInstance.close($scope.modalOptions);
					};
					$scope.modalOptions.close = function (result) {
						$uibModalInstance.dismiss('cancel');
					};
				}
			}
			
			return $uibModal.open(tempModalDefaults).result;
		};
}]);
