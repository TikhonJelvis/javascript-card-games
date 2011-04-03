/**
 * A classic trick-based card game.
 */
function Hearts() {
    var board = new Board({rootId : "Hearts", handId : "HeartsHand"}),
        scores = [0, 0, 0, 0],
        currentTrick = [],
        currentCardNumber = 0,
        ledSuit,
        highestRank;

    var main = new Deck();
    main.initialize(true);
    main.shuffle();

    var hands = [];
    for (var i = 0; i < 4; i++) {
        hands[i] = new Deck(board.defaultType);
        hands[i].setActive(i == 0);
        main.deal(hands[i], 13);
        board.addDeck(hands[i]);
    }

    var plays = [],
        locs = [1, 4, 0, 2, 1, 0, 2, 2]; 
    for (i = 0; i < 4; i++) {
        plays[i] = new Deck(board.defaultType, locs.pop(), locs.pop(),
                            {draggable : false});
        plays[i].setFilter((function (play) {
            return function () {return play.getCards().length < 1;};
        })(plays[i]));
        board.addDeck(plays[i]);
        plays[i].observe((function (n) {
            return function (event) {
                if (currentCardNumber == 0) {
                    ledSuit = plays[n].peek().getSuit();
                    highestRank = plays[n].peek().getRank();
                    highestRank = highestRank == 1 ? 14 : highestRank;
                }

                currentTrick[n] = plays[n].peek().getSuit();
                currentCardNumber++;

                if (currentCardNumber == 4) {
                    endTrick();
                }
            };
        })(i));
    }

    /**
     * Ends the current trick, tallying up the scores and resetting everything
     * as needed.
     */
    function endTrick() {
        var score = 0,
            winner;

        for (var i = 0; i < 4; i++) {
            var suit = currentTrick[i].getSuit(),
                rank = currentTrick[i].getRank();
            rank = rank == 1 ? 14 : rank;

            if (suit == ledSuit && rank >= highestRank) {
                winner = i;
            }

            if (suit == "s" && rank == 12) {
                score += 13;
            } else if (suit == "h") {
                score += 1;
            }
        }

        scores[winner] += score;
        currentTrick = [];
        currentCardNumber = 0;
        highestRank = 0;
        ledSuit = null;

        for (var i = 0; i < 4; i++) {
            plays[i].remove(plays[i].peek());
        }
    }
}