/**
 * Represents a deck of cards. You can add cards to the deck and take them away,
 * along with all the other things you would expect of a deck of cards. You can
 * pass in an array of cards for the deck to have initially.
 */
function Deck(cards) {
    cards = cards || [];// Stores all of the cards in the deck.

    /**
     * Shuffles the deck.
     */
    this.shuffle = function () {
        var newCards = [];

        while (cards.length > 0) {
            var index = Math.floor(Math.random() * cards.length);
            newCards.push(index);
            cards.splice(index, 1);
        }
    };

    /**
     * Adds the given card to the top of the deck.
     */
    this.addTop = function (card) {
        cards.push(card);
    };

    /**
     * Adds the given card to the bottom of the deck.
     */
    this.addBottom = function (card) {
        cards.unshift(card);
    };

    /**
     * Removes the top card of the deck and returns it; if the deck is empty,
     * returns undefined.
     */
    this.removeTop = function (card) {
        return cards.pop();
    };

    /**
     * Replaces all of the cards in the deck with the standard 52 cards.
     */
    this.initialize = function () {
        cards = [];

        for (var i = 1; i <= 13; i++) {
            cards.push(new Card(i, "s"));
            cards.push(new Card(i, "h"));
            cards.push(new Card(i, "d"));
            cards.push(new Card(i, "c"));
        }
    };
}