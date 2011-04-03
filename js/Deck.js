/**
 * Represents a deck of cards. You can add cards to the deck and take them away,
 * along with all the other things you would expect of a deck of cards. The deck
 * takes a type as an argument.
 */
function Deck(type) {
    var x, y;// The position of this deck on the playing board.
    var filter = function (card) {
        return true;
    };// Limits which cards can be added to the top of the deck.
    var cards = [];

    var observers = [];// The observers observing this deck!

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

        this.fire({
            type : "shuffle",
            card : null
        });
    };

    /**
     * Flips the top card of the deck. If the top card is face up, turns it face
     * down; otherwise, turns it face up.
     */
    this.flipTopCard = function () {
        var card = this.peek();
        card.setFaceUp(!card.isFaceUp());

        this.fire({
            type : "flip",
            card : card
        });
    };

    /**
     * Returns the number of cards in the deck.
     */
    this.getSize = function () {
        return cards.length;
    };

    /**
     * Adds the given card to the top of the deck. Returns true if the card was
     * added and false otherwise.
     */
    this.addTop = function (card) {
        if (filter(card)) {
            cards.push(card);

            this.fire({
                type : "add",
                card : card
            });

            return true;
        } else {
            return false;
        } 
    };

    /**
     * Adds the given card to the bottom of the deck.
     */
    this.addBottom = function (card) {
        if (filter(card)) {
            cards.unshift(card);

            this.fire({
                type : "add",
                card : card
            });

            return true;
        } else {
            return false;
        } 
    };

    /**
     * Removes the top card of the deck and returns it; if the deck is empty,
     * returns undefined.
     */
    this.removeTop = function () {
        var card = cards.pop();

        this.fire({
            type : "remove",
            card : card
        });
        
        return card;
    };

    /**
     * Returns the top card of the deck without changing anything.
     */
    this.peek = function () {
        return cards[cards.length - 1];
    };

    /**
     * Returns all of the cards currently in the deck.
     */
    this.getCards = function () {
        return cards;
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

        this.fire({
            type : "reset",
            card : null
        });
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

        this.fire({
           type : "moved"
        });
    };

    /**
     * Sets the y position of this deck in magical card units.
     */
    this.setY = function (newY) {
        y = newY;

        this.fire({
            type : "moved"
        });
    };

    /**
     * Sets the filter to a new function. The filter function should take a card
     * and return true if the given card can be added to the top and false
     * otherwise.
     */
    this.setFilter = function (newFilter) {
        filter = newFilter;
    };

    /**
     * Returns what type of deck this is. The type is information for the UI
     * regarding how to treat the deck; it does not affect gameplay.
     */
    this.getType = function () {
        return type;
    };

    /**
     * Sets what type of deck this is. The type is information for the UI
     * regarding how to treat the deck; it does not affect gameplay.
     */
    this.setType = function (newType) {
        type = newType;
    };

    /**
     * Fires the given event by passing it to every observer. The event should
     * have a type like "remove" or "add" and the card that changed. If more
     * than one card changed, it should have an array of cards.
     */
    this.fire = function (event) {
        for (var i = 0; i < observers.length; i++) {
            try {
                observers[i](event);
            } catch (e) {
                // Remove the offending observer from the observers list:
                observers.splice(i, 1);
            }
        }
    };

    /**
     * Adds an observer to the game. The observer should be a function accepting
     * an event that will be called every time there is a change to the game.
     */
    this.observe = function (observer) {
        observers.push(observer);
    };

    /**
     * Removes an occurence of the specified observer from the observers list.
     * If the given observer is in the list twice, only the first instance is
     * removed. If the given observer is not in the list, nothing happens.
     */
    this.removeObserver = function (observer) {
        for (var i = 0; i < observers.length; i++) {
            if (observers[i] == observer) {
                observers.splice(i, 1);
                return;
            }
        }
    };
}
