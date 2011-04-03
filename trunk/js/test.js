function runTest() {
	var deck=new Deck();
	gameBoard.addDeck(deck);
	deck.addTop(new Card(5,"s"));
	deck.addTop(new Card(6,"s"));
	deck.addTop(new Card(7,"s"));
	deck.setX(1);
	gameBoard.update(deck);
}