var __MY_ROOT = "#BoardRoot";
var __DECK_OPACITY = .9;
var __EXTENSION_TYPE = "gif";
var __IMAGES_DIRECTORY = "images/";
var __CARD_WIDTH = 50;
var __CARD_HEIGHT = 50;
var __DECK_HEIGHT = 100;
var __MAGICAL_UNIT_X = 150;
var __MAGICAL_UNIT_Y = 150;
var __HAND_WIDTH = 500;
function Board(game) {

	//PRIVATE INSTANCE VARIABLES
	//game=game||new Game();
	var root=$(__MY_ROOT);
	root.addClass("board");
	var decks = new Array();
	
	//PRIVATE FUNCTIONS
	
	function drawDeck(deck) {
		var div = $("<div>");
		div.addClass("deck");
		root.append(div);
		return reDrawDeck([deck, div]);
	}
	
	function reDrawDeck(deckArr) {
		var deck = deckArr[0];
		var div = deckArr[1];
		var isHand = isNaN(deck.getX());
		//the offset for hands is proportional to the size of the hand
		var offsetX = isHand ? ((__HAND_WIDTH - __CARD_WIDTH) / deck.getSize()) : 0;
		//the offset for decks is proportional to the size of the deck
		var offsetY = isHand ? 0 : ((__DECK_HEIGHT - __CARD_HEIGHT) / deck.getSize());
		var cards = deck.getCards();
		for(var i = 0; i < cards.length; i++) {
			var holder = $("<div>");
			holder.addClass("card");
			holder.css("top", (offsetY * i)+"px");
			holder.css("left", (offsetX * i)+"px");
			var img = $("<img>");
			var card = cards[i];
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
	
	this.update = function (deck) {
		for(var i = 0; i < decks.length; i++) {
			if(deck == decks[i][0]) {
				return reDrawDeck(decks[i]);
			}
		}
	};
}
$(document).ready(function() {
	gameBoard = new Board();
});