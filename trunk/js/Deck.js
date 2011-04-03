/**
 * Represents a deck of cards. You can add cards to the deck and take them away,
 * along with all the other things you would expect of a deck of cards. You can
 * pass in an array of cards for the deck to have initially.
 */
function Deck(cards) {
    cards = cards || [];// Stores all of the cards in the deck.
    var x, y;// The position of this deck on the playing board.
    var filter = function (card) {
        return true;
    };// Limits which cards can be added to the top of the deck.

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
     * Returns the number of cards in the deck.
     */
    this.getSize = function () {
        return cards.length;
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

    /**
     * Returns the x position of this deck in magical card units. If there is no
     * position, returns undefined.
     */
    this.getX = function () {
        return x;
    };

    /**
     * Returns the y position of this deck in magical card units. If there is no
     * position, returns undefined.
     */
    this.getY = function () {
        return y;
    };

    /**
     * Sets the x position of this deck in magical card units.
     */
    this.setX = function (newX) {
        x = newX;
    };

    /**
     * Sets the y position of this deck in magical card units.
     */
    this.setY = function (newY) {
        y = newY;
    };

    /**
     * Sets the filter to a new function. The filter function should take a card
     * and return true if the given card can be added to the top and false
     * otherwise.
     */
    this.setFilter = function (newFilter) {
        filter = newFilter;
    };
}
