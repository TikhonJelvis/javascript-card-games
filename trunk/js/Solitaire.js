/**
 * A game of Klondike Solitaire.
 */
function Solitaire() {
    var board = new Board("Klondike");

    var totalDeck = new Deck(collapseType, 0, 0);
    totalDeck.initialize();
    totalDeck.shuffle();
    board.addDeck(totalDeck);

    var pile;
    var discard = new Deck(collapseType, 1, 0);
    board.addDeck(discard);
    var endPiles = [];
    
    for (var i = 1; i <= 7; i++) {
        pile = new Deck(defaultType, i - 1, 1);
        totalDeck.deal(pile, i, true);
        totalDeck.peek().setFaceUp(true);
        board.addDeck(pile);
    }
    
    for (i = 0; i < 4; i++) {
        endPiles[i] = new Deck(collapseType, 4 + i, 0);
        board.addDeck(endPiles[i]);
    }
}