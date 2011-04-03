/**
 * A game of Klondike Solitaire.
 */
function Solitaire() {
    var board = new Board();
    var totalDeck = new Deck(collapseType, 0, 0);
    totalDeck.initialize();
    totalDeck.shuffle();
    var pile;
    var discard = new Deck(collapseType, 1, 0);
    var endPiles = [];
    
    for (var i = 1; i <= 7; i++) {
        pile = new Deck(defaultType, i - 1, 1);
        totalDeck.deal(pile, i, true);
        totalDeck.peek().setFaceUp(true);
    }
    
    for (i = 0; i < 4; i++) {
        endPiles[i] = new Deck(collapseType, 4 + i, 0);
    }
}