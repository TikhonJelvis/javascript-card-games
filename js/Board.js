var __MY_ROOT = "#BoardRoot";
var __DECK_OPACITY = .9;
var __EXTENSION_TYPE = "gif";
var __IMAGES_DIRECTORY = "images/";
var __CARD_WIDTH = 73;
var __CARD_HEIGHT = 102;
var __DECK_HEIGHT = 204;
var __MAGICAL_UNIT_X = 150;
var __MAGICAL_UNIT_Y = 220;
var __HAND_WIDTH = 500;
function Board(game) {

	//PRIVATE INSTANCE VARIABLES
	//game=game||new Game();
	var root=$(__MY_ROOT);
	root.addClass("board");
	var decks = new Array();
	
	//PRIVATE FUNCTIONS
	
	function drawDeck(deck) {
		//observe events
		deck.observe(function() {
			for(var i = 0; i < decks.length; i++) {
				if(deck == decks[i][0]) {
					return reDrawDeck(decks[i]);
				}
			}
			return null;
		});
		//add ui
		var div = $("<div>");
		var isHand = isNaN(deck.getX());
		div.addClass(isHand ? "hand" : "deck");
		root.append(div);
		return reDrawDeck([deck, div]);
	}
	
	function getSuitName(card) {
		var suit=card.getSuit().toUpperCase();
		switch(suit) {
			case "H":
				suit="of hearts";
				break;
			case "D":
				suit="of diamonds";
				break;
			case "C":
				suit="of clubs";
				break;
			case "S":
				suit="of spades";
				break;
		}
		return suit;
	}
	
	function reDrawDeck(deckArr) {
		var deck = deckArr[0];
		var div = deckArr[1];
		div.empty();
		var isHand = isNaN(deck.getX());
		if(!isHand) {
			div.css("left", deck.getX()*__MAGICAL_UNIT_X);
			div.css("top", deck.getY()*__MAGICAL_UNIT_Y);
		}
		//the offset for hands is proportional to the size of the hand
		var minOverlapX = __CARD_WIDTH / 2;
		var maxOverlapX = ((__HAND_WIDTH - __CARD_WIDTH) / deck.getSize());
		var overlapX = (minOverlapX < maxOverlapX) ? minOverlapX : maxOverlapX;
		var offsetX = isHand ? overlapX : 0;
		//the offset for decks is proportional to the size of the deck
		var minOverlap = __CARD_HEIGHT / 5;
		var maxOverlap = ((__DECK_HEIGHT - __CARD_HEIGHT) / deck.getSize());
		var overlap = (minOverlap < maxOverlap) ? minOverlap : maxOverlap;
		var offsetY = isHand ? 0 : overlap;
		var cards = deck.getCards();
		for(var i = 0; i < cards.length; i++) {
			var holder = $("<div>");
			holder.addClass("card");
			holder.css("left", (offsetX * i)+"px");
			holder.css("top", (offsetY * i)+"px");
			var img = $("<img>");
			var card = cards[i];
			if(card.isFaceUp()) {
				img.attr("alt", card.getRankAsString()+" "+getSuitName(card));
				img.attr("title", card.getRankAsString()+" "+getSuitName(card));
			}
			img.attr("src", card.isFaceUp() ? (__IMAGES_DIRECTORY+card.getRank()+card.getSuit()+"."+__EXTENSION_TYPE) : (__IMAGES_DIRECTORY+"back."+__EXTENSION_TYPE));
			img.css("opacity", __DECK_OPACITY);
			holder.append(img);
			div.append(holder);
		}
		return div;
	}
	
	//PUBLIC FUNCTIONS
	
	this.addDeck = function (deck) {
		return decks.push([deck, drawDeck(deck)]);
	};
	
}
$(document).ready(function() {
	gameBoard = new Board();
});