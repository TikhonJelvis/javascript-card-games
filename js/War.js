/**
* A simple game of the childrens card game War
*/
function War() {
	var board = new Board({
		rootId : "War",
		magicalX : 106,
		deckHeight : 150,
		magicalY : 160
	});
	
	var interval=1000;
	var waiting=true;
	var setWaiting=function(bool) {
		waiting=bool;
	};
	
	var computerDeck = new Deck(board.defaultType, 1, 0);
	computerDeck.initialize(true);
    computerDeck.shuffle();
    computerDeck.setDraggable(false);
	board.addDeck(computerDeck);
	
	var computerPlayCard = new Deck(board.collapsedType, 1, 1);
    computerPlayCard.setDraggable(false);
	board.addDeck(computerPlayCard);
	
	var computerWarPile = new Deck(board.horizontalType, 2, 1);
	computerWarPile.setDraggable(false);
	board.addDeck(computerWarPile);
	
	var playerPlayCard = new Deck(board.collapsedType, 1, 2);
    playerPlayCard.setDraggable(false);
	board.addDeck(playerPlayCard);
	
	var playerWarPile = new Deck(board.horizontalType, 2, 2);
	playerWarPile.setDraggable(false);
	board.addDeck(playerWarPile);
	
	var playerDeck = new Deck(board.defaultType, 1, 3);
    playerDeck.setDraggable(false);
	computerDeck.deal(playerDeck,26,true);
	playerDeck.setAction(function() {
		if(waiting) {
			setWaiting(false);
			playerDeck.deal(playerPlayCard,1,false);
			computerDeck.deal(computerPlayCard,1,false);
			setTimeout(function(playerDeck,playerPlayCard,computerDeck,computerPlayCard,setWaiting,playerWarPile,computerWarPile,board) {
				var dealTo=false;
				if(playerPlayCard.peek().getRank()<computerPlayCard.peek().getRank()) {
					dealTo=computerDeck;
				} else if(playerPlayCard.peek().getRank()>computerPlayCard.peek().getRank()) {
					dealTo=playerDeck;
				}
				if(dealTo) {
					playerPlayCard.deal(dealTo,1,true,true,true);
					playerWarPile.deal(dealTo,playerWarPile.getSize(),true,true,true);
					computerPlayCard.deal(dealTo,1,true,true,true);
					computerWarPile.deal(dealTo,computerWarPile.getSize(),true,true,true);
				} else {
					playerPlayCard.deal(playerWarPile,1,false,true,true);
					computerPlayCard.deal(computerWarPile,1,false,true,true);
					playerDeck.deal(playerWarPile,3,false,true);
					computerDeck.deal(computerWarPile,3,false,true);
				}
				setWaiting(true);
			},interval,playerDeck,playerPlayCard,computerDeck,computerPlayCard,setWaiting,playerWarPile,computerWarPile,board);
		}
	});
	board.addDeck(playerDeck);
	
}
$(document).ready(function() {
	new War();
});