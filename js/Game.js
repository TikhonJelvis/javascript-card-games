/**
 * Represents a card game. This game can contain elements of a card game: decks,
 * hands, cards and so on. The game also accepts observers, which are given a
 * GameChangeEvent every time the game changes.
 */
function Game() {
    var elements = []; // Contains all of the game elements (decks, hands...)

    /**
     * Adds the given element to the game.
     */
    this.addElement = function (element) {
        elements.push(element);
    };

    /**
     * Returns whether the given element is in the game.
     */
    this.containsElement = function (element) {
        for (var i = 0; i < elements.length; i++) {
            if (elements[i] == element) {
                return true;
            }
        }

        return false;
    };

    /**
     * Returns an array of all of the elements in the game.
     */
    this.getElements = function () {
        return elements;
    };

}