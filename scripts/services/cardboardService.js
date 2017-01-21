angular.module('cardboard').service('cardboardService', ['localStorageService', function (localStorageService) {
	
	// private:
	this.save = function() {
		localStorageService.set("cardboard", this.cardboard);
	}
	// public:
	
	function findById(col, id) {
		return _.find(col, function(c) { return c.id === id; });
	}
	
	function findMaxId(col) {
		return _.isEmpty(col) ? 0 : _.max(col, function(c) { return c.id; }).id;
	}
	
	function findIndexById(col, id) {
		return _.findIndex(col, function(c) { return c.id === id; });
	}
	
	// args = { id, left, top, title, content }
	this.updateCard = function(args) {
		var c = findById(this.cardboard.cards, args.id);
		if (c)
		{
			c.left = args.left || c.left;
			c.top = args.top || c.top;
			c.title = args.title || c.title;
			c.content = args.content || c.content;
		}
		
		this.save();
	}
	
	// args = { left, top, title, content }
	this.addCard = function(args) {
		var newId = findMaxId(this.cardboard.cards) + 1;
		
		this.cardboard.cards.push({
			id: newId,
			top: args.top,
			left: args.left,
			title: args.title,
			content: args.content
		});
		
		this.save();
		return newId;
	}
	
	this.deleteCard = function(id) {
		var idx = findIndexById(this.cardboard.cards, id);
		if (idx >= 0) this.cardboard.cards.splice(idx, 1);
		this.save();
	}
	
	// args = { id, name, description }
	this.updateDeck = function(args) {
		var d = findById(this.cardboard.decks, args.id);
		if (d)
		{
			d.name = args.name || d.name;
			d.description = args.description || d.description;
		}
		
		this.save();
	}
	
	// args = { name, description }
	this.addDeck = function(args) {
		var newId = findMaxId(this.cardboard.decks) + 1;
		this.cardboard.decks.push({
			id: newId,
			name: args.name,
			description: args.description
		});
		
		this.save();
		return newId;
	}
	
	this.deleteDeck = function(id) {
		var idx = findIndexById(this.cardboard.decks, id);
		if (idx >= 0) this.cardboard.decks.splice(idx, 1);
		this.save();
	}
	
	/*
		cardboard = 
		{
			decks:
			[
				{
					id: 1,
					name: "test deck",
					description: "test deck description"
				},
				{
					id: 2,
					name: "test deck2",
					description: "test deck description2"
				},
			],
			cards:
			[
				{
					id: 1,
					deck_id: null,
					left: 10,
					top: 10,
					title: "card1",
					content: "card1-content"
				},
				{
					id: 2,
					deck_id: 2,
					left: 50,
					top: 10,
					title: "card2",
					content: "card2-content"
				},
				{
					id: 3,
					deck_id: 1,
					left: 40,
					top: 30,
					title: "card3",
					content: "card3-content"
				}
			];
		}
	*/
	
	this.cardboard = localStorageService.get('cardboard') || {};
	this.cardboard.cards = this.cardboard.cards || [];
	this.cardboard.decks = this.cardboard.decks || [];
}]);
