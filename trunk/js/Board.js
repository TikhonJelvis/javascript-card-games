var __MY_ROOT = "#BoardRoot";
var __DECK_OPACITY = .9;
var __EXTENSION_TYPE = "gif";
var __IMAGES_DIRECTORY = "images/";
var __CARD_WIDTH = 50;
var __CARD_HEIGHT = 50;
var __DECK_HEIGHT = 200;
function Board(game) {

	//PRIVATE INSTANCE VARIABLES
	game=game||new Game();
	var root=$(__MY_ROOT);
	var decks = new Array();
	
	//PRIVATE FUNCTIONS
	
	function drawDeck(deck) {
		return reDrawDeck([deck, $("<div>")]);
	}
	
	function reDrawDeck(deckArr) {
		var deck = deckArr[0];
		var div = deckArr[1];
		var isHand = isNaN(deck.getX());
		var offsetX = isHand ? __CARD_WIDTH : 0;
		
		for(int i = 0; i < deck.getSize(); i++) {
			var holder = $("<div>");
			holder.setAttribute("class", "cardInDeck");
			holder.style.setProperty("top", offset * i);
			var img = $("<img>");
			var card=deck[i];
			img.setAttribute("src", card.isFaceUp() ? (__IMAGES_DIRECTORY+card.getRankAsString()+card.getSuit()+__EXTENSION_TYPE) : (__IMAGES_DIRECTORY+"back."+__EXTENSION_TYPE));
			img.style.setProperty("opacity", __DECK_OPACITY);
			holder.appendChilde(img);
			div.appendChild(holder);
		}
		return div;
	}
	
	//PUBLIC FUNCTIONS
	
	this.addPile = function(pile) {
		var i=piles.push([pile,drawDeck(pile)]);
		return i;
	};
	
	this.addHand = function(hand) {
		var i=hands.push([hand,drawHand(hand)]);
		return i;
	};
	
	this.addDeck = function(deck) {
		var i=decks.push([deck,drawDeck(deck)]);
		return i;
	};
	
}