/*
    Tracking position with draggable in angular.
    http://stackoverflow.com/questions/15470666/angularjs-directive-attribute-binding-left-top-positions-after-dragging-with-ng
*/
angular.module('cardboard').controller('cards-board', ['$scope', 'cardboardService', 'modalService', 
function($scope, cardboardService, modalService) {
    
    const modalTemplateUrl = 'partials/card-modal.html';
    
    $scope.addCard = function() {
        modalService.showModal({
            templateUrl: modalTemplateUrl
        }, {
            modalTitle: 'Add Card',
            left: 30,
            top: 100,
            visible: true,
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
        if (!c) return;
        
        modalService.showModal({
            templateUrl: modalTemplateUrl
        }, {
            modalTitle: 'Edit Card',
            id: c.id,
            left: c.left,
            top: c.top,
            visible: true,
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
    
    function hideCard(id) {
        var c = findCardById(id);
        if (!c) return;
        
        cardboardService.updateCard({
            id: id,
            visible: false
        });
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
        // Since this javascript turn is not initiated in something like ng-click, it's not
        // automatically wrapped in an $apply. So, we need to tell angular that there's a chance
        // that the model is being altered. We do this here.
        $scope.$apply(function() {
            switch (option) {
                case "edit": editCard(id); break;
                case "delete": deleteCard(id); break;
                case "hide": hideCard(id); break;
            }
        });
    }
    
    $scope.search = '';
    $scope.cards = cardboardService.cards;
}]);
