function Board(options) {

	//PRIVATE INSTANCE VARIABLES
	options = options || {};
	var __MY_ROOT = options.rootId || "#BoardRoot";
	var __DECK_OPACITY = options.cardOpacity || .9;
	var __EXTENSION_TYPE = options.extensionType || "gif";
	var __IMAGES_DIRECTORY = options.imagesDirectory || "images/";
	var __CARD_WIDTH = options.cardWidth || 73;
	var __CARD_HEIGHT = options.cardHeight || 102;
	var __DECK_HEIGHT = options.deckHeight || 204;
	var __MAGICAL_UNIT_X = options.magicalX || 150;
	var __MAGICAL_UNIT_Y = options.magicalY || 220;
	var __HAND_WIDTH = options.handWidth || 500;
	var root=$("#"+__MY_ROOT);
	root.addClass("board");
	var decks = new Array();
	var appendString = "cardHolder";
	var counter = 0;
	var cardHash = {};
	
	//PUBLIC TYPE PROPERTIES
	
	this.defaultType=function(deck) {
		var isHand = isNaN(deck.getX());
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
		return [offsetX,offsetY];
	};
	this.collapsedType=function(deck) {
		return [0,0];
	};
	
	//PRIVATE FUNCTIONS
	
	function createDeck(deck) {
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
		div.droppable({ 
			accept : function(el) {
				return deck.getFilter()(getCard(el[0]));
			},
			drop : function(event, ui) {
				var srcDeck=event.srcElement.parentElement;
				var card=getCard(srcDeck);
				getDeck(srcDeck).remove(card);
				deck.addTop(card);
				reDrawDeck([getDeck(srcDeck), div]);
				reDrawDeck([deck, $(event.target)]);
			}
		});
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
	
	function getOffsetByType(deck) {
		return deck.getType()(deck);
	}
	
	function getCard(element) {
		return cardHash[element.id][1];
	}
	
	function getDeck(element) {
		return cardHash[element.id][0];
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
		var offsets=getOffsetByType(deck);
		var offsetX=offsets[0];
		var offsetY=offsets[1];
		var cards = deck.getCards();
		for(var i = 0; i < cards.length; i++) {
			(function () {
				var card = cards[i];
				var holder = $("<div>");
				cardHash[appendString+counter]=[deck,card];
				holder.attr("id", appendString+(counter++));
				if(card.isFaceUp()) {
					holder.draggable({ 
						revert : "invalid",
						start : function(event, ui) {
							holder.css("z-index","500");
						},
						stop : function(event, ui) {
							holder.css("z-index","0");
						}
					});
				}
				holder.addClass("card");
				holder.css("left", (offsetX * i)+"px");
				holder.css("top", (offsetY * i)+"px");
				holder.css("position", "absolute");
				var img = $("<img>");
				if(card.isFaceUp()) {
					img.attr("alt", card.getRankAsString()+" "+getSuitName(card));
					img.attr("title", card.getRankAsString()+" "+getSuitName(card));
				}
				img.attr("src", card.isFaceUp() ? (__IMAGES_DIRECTORY+card.getRank()+card.getSuit()+"."+__EXTENSION_TYPE) : (__IMAGES_DIRECTORY+"back."+__EXTENSION_TYPE));
				img.css("opacity", __DECK_OPACITY);
				holder.append(img);
				div.append(holder);
			})();
		}
		div.css("width",((cards.length-1)*offsetX)+__CARD_WIDTH);
		div.css("height",((cards.length-1)*offsetY)+__CARD_HEIGHT);
		return div;
	}
	
	//PUBLIC FUNCTIONS
	
	this.addDeck = function (deck) {
		return decks.push([deck, createDeck(deck)]);
	};
	
	this.getDecks = function() {
		return decks;
	};
}