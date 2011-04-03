/**
* This class represents a card.
* A card has an immutable rank and suit as well as a variable relative positon (x,y)
*/
function Card(rank, suit) {

	//PRIVATE INSTANCE VARIABLES
	
	/**
	* (x,y) relative position of this card
	*/
	var relativePosition = [0, 0];
	
	
	
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
	
	/**
	* relative x position getter method
	* returns int xPos
	*/
	this.getX = function () {
		return relativePosition[0];
	};
	
	/**
	* relative y position getter method
	* returns int yPos
	*/
	this.getY = function () {
		return relativePosition[1];
	};
	
	/**
	* relative x position setter method
	* param int xPos
	* return int xPos
	*/
	this.setX = function (x) {
		return relativePosition[0] = x;
	};
	
	/**
	* relative y position setter method
	* param int yPos
	* return int yPos
	*/
	this.setY = function (y) {
		return relativePosition[1] = y;
	};
}