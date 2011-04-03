/**
 * A game of Klondike Solitaire.
 */
function Solitaire() {
    var board = new Board({
        rootId : "Klondike",
        magicalX : 106
    });

    var totalDeck = new Deck(board.collapsedType, 0, 0);
    totalDeck.initialize();
    totalDeck.shuffle();
    board.addDeck(totalDeck);

    var pile;
    var discard = new Deck(board.collapsedType, 1, 0);
    board.addDeck(discard);
    var endPiles = [];
    
    for (var i = 1; i <= 7; i++) {
        pile = new Deck(board.defaultType, i - 1, 1);
        totalDeck.deal(pile, i, true);

        var topCard = pile.peek();
        topCard.setFaceUp(true);
        pile.setFilter(function (card) {
            if (topCard) {
                return (card.getColor() != topCard.getColor()) &&
                    (topCard.getSuit() - card.getSuit()) == 1;
            } else {
                return card.getRank() == 13;
            }
        });
        board.addDeck(pile);
    }
    
    for (i = 0; i < 4; i++) {
        endPiles[i] = new Deck(board.collapsedType, 3 + i, 0);
        board.addDeck(endPiles[i]);
    }
}