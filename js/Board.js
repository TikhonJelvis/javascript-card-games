function Board(options) {

	//PRIVATE INSTANCE VARIABLES
	options = options || {};
	var __MY_ROOT = options.rootId || "BoardRoot";
	var __HAND_HOLDER = options.handId || "HandRoot";
	var __DECK_OPACITY = options.cardOpacity || .9;
	var __EXTENSION_TYPE = options.extensionType || "gif";
	var __IMAGES_DIRECTORY = options.imagesDirectory || "images/";
	var __CARD_WIDTH = options.cardWidth || 73;
	var __CARD_HEIGHT = options.cardHeight || 102;
	var __DECK_HEIGHT = options.deckHeight || 204;
	var __MAGICAL_UNIT_X = options.magicalX || 150;
	var __MAGICAL_UNIT_Y = options.magicalY || 220;
	var __HAND_WIDTH = options.handWidth || 500;
	var __MULTI_DRAG = (options.multiDrag===false) ? false : true;
	var handHolder=$("#"+__HAND_HOLDER);
	handHolder.addClass("board");
	var root=$("#"+__MY_ROOT);
	root.addClass("board");
	var decks = new Array();
	var appendString = "cardHolder";
	var counter = 0;
	var cardHash = {};
	var maxX = 0;
	var maxY = 0;
	
	//PUBLIC TYPE PROPERTIES
	/**
	* creates a vertical offset deck for decks (relative to the deck size and the deckHeight option) and a horizontal one for hands
	*/
	this.defaultType = function(deck) {
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
		return [offsetX, offsetY];
	};
	/**
	* creates a deck with no offset so that all cards are stacked directly on top of each other
	*/
	this.collapsedType = function(deck) {
		return [0,0];
	};
	/**
	* creates a deck that has horizontal offset relative to the size of the deck and the handWidth option
	*/
	this.horizontalType = function(deck) {
		//the offset for hands is proportional to the size of the hand
		var minOverlapX = __CARD_WIDTH / 2;
		var maxOverlapX = ((__HAND_WIDTH - __CARD_WIDTH) / deck.getSize());
		var overlapX = (minOverlapX < maxOverlapX) ? minOverlapX : maxOverlapX;
		var offsetX = overlapX;
		var offsetY = 0;
		return [offsetX, offsetY];
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
		var isHand = isNaN(deck.getX());
		//add ui
		var div = $("<div>");
		div.droppable({ 
			accept : function(el) {
				var cards=getCards(el[0]);
				return deck.getFilter()(cards[cards.length-1],getDeck(el[0]),cards.length);
			},
			drop : function(event, ui) {
				var srcDeck=event.srcElement.parentElement;
				var cards=getCards(srcDeck);
				for(var i=cards.length-1;i>=0;i--) {
					try {
						console.log(cards[i]);
						getDeck(srcDeck).remove(cards[i]);
						deck.addTop(cards[i]);
					} catch(e) {
						continue;
					}
				}
				reDrawDeck([getDeck(srcDeck), div]);
				reDrawDeck([deck, $(event.target)]);
			}
		});
		div.addClass(isHand ? "hand" : "deck");
		if(isHand&&deck.isActive()) {
			handHolder.append(div);
		} else if(!isHand) {
			root.append(div);
		}
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
	
	function getCards(element) {
		var cards=[];
		if(__MULTI_DRAG) {
		var children=$(element).children(".card");
			if(children) {
				for(var i = 0; i < children.length; i++) {
					cards.push(getCard(children[i]));
				}
			}
		}
		cards.push(getCard(element));
		return cards;
	}
	
	function getDeck(element) {
		return cardHash[element.id][0];
	}
	
	function reDrawDeck(deckArr) {
		var deck = deckArr[0];
		var div = deckArr[1];
		div[0].onclick=deck.getAction();
		maxX = deck.getX() > maxX ? deck.getX() : maxX;
		maxY = deck.getY() > maxY ? deck.getY() : maxY;
		root.css("width",((maxX+1)*__MAGICAL_UNIT_X)+"px");
		root.css("height",((maxY+1)*__MAGICAL_UNIT_Y)+"px");
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
		var soFar=new Array();
		for(var i = cards.length - 1; i >= 0; i--) {
			var newDiv=(function (stack,i) {
				var card = cards[i];
				var holder = $("<div>");
				cardHash[appendString+counter]=[deck,card];
				holder.attr("id", appendString+(counter++));
				holder.css("z-index",i+deck.getzOffset());
				if(card.isFaceUp()&&deck.isDraggable()) {
					holder.draggable({ 
						revert : "invalid",
						start : function(event, ui) {
							holder.css("z-index",99+deck.getzOffset());
							if(__MULTI_DRAG) {
								for(var j = 0; j < stack.length; j++) {
									stack[j][1].detach();
									holder.append(stack[j][1]);
								}
							}
						},
						stop : function(event, ui) {
							var srcDeck=event.srcElement.parentElement;
							holder.css("z-index",i+deck.getzOffset());
							reDrawDeck([getDeck(srcDeck),div]);
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
				return holder;
			})(soFar.concat(),i);
			soFar.push([cards[i],newDiv]);
		}
		div.css("width",((cards.length)*offsetX)+__CARD_WIDTH);
		div.css("height",((cards.length)*offsetY)+__CARD_HEIGHT);
		return div;
	}
	
	//PUBLIC FUNCTIONS
	
	/**
	*  Adds a deck to the Board, this adds a div that contains the view of the deck and specifies event listeners to update the deck
	*/
	this.addDeck = function (deck) {
		return decks.push([deck, createDeck(deck)]);
	};
	
	/**
	*	returns an array of all decks attached to this board
	*/
	this.getDecks = function() {
		return decks;
	};
}