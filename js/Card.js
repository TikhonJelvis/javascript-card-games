/**
* This class represents a card.
* A card has an immutable rank and suit
*/
function Card(rank, suit) {
    
        //PRIVATE FIELDS

        var isFaceUp = true;
    
	//PUBLIC FUNCTIONS
	
	/**
	* suit getter method
	* returns String suit
	*/
	this.getSuit = function () {
		return suit;
	};

        /**
         * Returns "r" if the card is red (hearts or diamonds) and "s"
         * otherwise.
         */
        this.getColor = function () {
                return (suit == "h" || suit == "d") ? "r" : "s";
        };

        /**
        * Returns whether the card is face up or not.
        */
        this.isFaceUp = function () {
                return isFaceUp;
        };

        /**
        * Sets whether the card is face up--true means it is.
        */
        this.setFaceUp = function (flag) {
            isFaceUp = flag;
        };
	
	/**
	* rank getter method
	* returns int rank
	*/
	this.getRank = function () {
		return rank;
	};
	
	/**
	* rank getter method
	* returns String rank
	*/
	this.getRankAsString = function () {
		switch(rank) {
			case 11:
				return "J";
			case 12:
				return "Q";
			case 13:
				return "K";
			case 1:
				return "A";
			default:
				return rank;
		}
	};
}