/**
* Hand is a class for holding an array of cards that represents a users hand
* It contains adder, getter, remover methods for the private array which represents the cards
*/
function Hand() {
	
	//PRIVATE INSTANCE VARIABLES
	
	/**
	* cards is represented as an array of cards
	*/
	var myCards = new Array();
	
	
	//PUBLIC FUNCTIONS
	
	/**
	* adder method for single cards
	* param Card card is the card to add
	* return int currentLength, the current number of cards in the hand
	*/
	this.addCard = function (card) {
		return myCards.push(card);
	};
	
	/**
	* adder method for an array of cards
	* parm Card[] cards is an array of cards to add
	* returns the current contents of the hand as an array
	*/
	this.addCards = function (cards) {
		return myCards = myCards.concat(cards);
	};
	
	/**
	* getter method for the cards
	* returns the current contents of the hand as an array
	*/
	this.getCards = function () {
		return cards;
	};
	
	/**
	* remover method for the cards
	* param Card card is the card to remove
	* returns the removed card or null if the card was not found
	*/
	this.removeCard = function (card) {
		for(var i=0; i < myCards.length; i++) {
			if(myCards[i] == card) {
				return myCards.splice(i,1)[0];
			}
		}
		return null;
	};
}