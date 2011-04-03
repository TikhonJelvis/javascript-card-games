function runTest() {
	var deck=new Deck(defaultType);
	deck.setX(1);
	deck.setY(1);
	gameBoard.addDeck(deck);
	deck.addTop(new Card(5,"s"));
	deck.addTop(new Card(6,"s"));
	var deck2=new Deck(defaultType);
	deck2.setX(2);
	deck2.setY(1);
	gameBoard.addDeck(deck2);
	deck2.addTop(new Card(1,"h"));
	deck2.addTop(new Card(2,"c"));
	deck2.addTop(new Card(3,"s"));
	deck2.addTop(new Card(1,"h"));
	deck2.addTop(new Card(2,"c"));
	deck2.addTop(new Card(3,"s"));
	deck2.addTop(new Card(1,"h"));
	deck2.addTop(new Card(2,"c"));
	deck2.addTop(new Card(3,"s"));
	deck2.addTop(new Card(1,"h"));
	deck2.addTop(new Card(2,"c"));
	deck2.addTop(new Card(3,"s"));
	var deck3=new Deck(collapsedType);
	deck3.setX(2);
	deck3.setY(2);
	gameBoard.addDeck(deck3);
	deck3.addTop(new Card(9,"h"));
}