/**
* This class represents a card.
* A card has an immutable rank and suit
*/
function Card(rank, suit) {

	//PUBLIC FUNCTIONS
	
	/**
	* suit getter method
	* returns String suit
	*/
	this.getSuit = function () {
		return suit;
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
			case 14:
				return "A";
			default:
				return rank;
		}
	};
}