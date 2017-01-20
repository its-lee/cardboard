angular.module('cardboard').service('cardboardService', ['localStorageService', function (localStorageService) {
	
	// private:
	this.save = function() {
		localStorageService.set("cardboard", this.cardboard);
	}
	// public:
	
	/*
		args = {
			id,
			left,
			top,
			title,
			content
		}
		cb = function(err, null)
	*/
	this.updateCard = function(args, cb = function() {}) {
		var c = _.find(this.cardboard.cards, function(c) { return c.id === args.id; } )
		if (c)
		{
			c.left = args.left || c.left;
			c.top = args.top || c.top;
			c.title = args.title || c.title;
			c.content = args.content || c.content;
		}
		
		this.save();
		return cb(null);
	}
	
	/*
		args = {
			left,
			top,
			title,
			content
		}
		cb = function(err, id)
	*/
	this.addCard = function(args, cb = function() {}) {
		var newId = 
			_.isEmpty(this.cardboard.cards) 
			? 
			0 
			: 
			(_.max(this.cardboard.cards, function(c) { return c.id; }) + 1);
		
		this.cardboard.cards.push({
			id: newId,
			top: args.top,
			left: args.left,
			title: args.title,
			content: args.content
		}
		);
		
		this.save();
		return cb(null, newId);
	}
	
	/*
		cb = function(err, null)
	*/
	this.deleteCard = function(id, cb = function() {}) {
		
		var idx = _.findIndex(this.cardboard.cards, function(c) { return c.id === id; });
		if (idx >= 0)
			this.cardboard.cards.splice(idx, 1);
		
		this.save();
		return cb(null);
	}
	
	/*
		cardboard = 
		{
			cards:
			[
				{
					id: 1,
					left: 10,
					top: 10,
					title: "card1",
					content: "card1-content"
				},
				{
					id: 2,
					left: 50,
					top: 10,
					title: "card2",
					content: "card2-content"
				},
				{
					id: 3,
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
}]);
