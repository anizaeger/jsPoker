/** ***************************************************************************
 *                                                                            *
 * @source: https://github.com/anizaeger/jsBells                              *
 *                                                                            *
 * The following is the entire license notice for the                         *
 * JavaScript code in this page.                                              *
 *                                                                            *
 * Copyright (C) 2018 Anakin-Marc Zaeger                                      *
 *                                                                            *
 *                                                                            *
 * The JavaScript code in this page is free software: you can                 *
 * redistribute it and/or modify it under the terms of the GNU                *
 * General Public License (GNU GPL) as published by the Free Software         *
 * Foundation, either version 3 of the License, or (at your option)           *
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;          *
 * without even the implied warranty of MERCHANTABILITY or FITNESS            *
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.               *
 *                                                                            *
 * As additional permission under GNU GPL version 3 section 7, you            *
 * may distribute non-source (e.g., minimized or compacted) forms of          *
 * that code without the copy of the GNU GPL normally required by             *
 * section 4, provided you include this license notice and a URL              *
 * through which recipients can access the Corresponding Source.              *
 *                                                                            *
 *                                                                            *
 * @licend The above is the entire license notice                             *
 * for the JavaScript code in this page.                                      *
 *                                                                            *
 ******************************************************************************/
/** ------------------------------------------------------------------------- *
 * CLASS:         CardDeck
 * DESCRIPTION:   Generate, shuffle, and manage a deck of cards.
 * -------------------------------------------------------------------------- */
define([
	'card'
], function(
	Card
) {
  return class CardDeck {
/*
	Deck Manipulation Functions
*/

/*
	Suit numbers:
		0: Spades
		1: Hearts
		2: Diamonds
		3: Clubs

	Playing card character codes:

	Suits:
		0x2660: Spades
		0x2661: Hearts
		0x2662: Diamonds
		0x2663: Clubs

	Playing Cards (Ace to King):
		0x1f0a1 to 0x1a0ae: Spades
		0x1f0b1 to 0x1a0ae: Hearts
		0x1f0c1 to 0x1a0ae: Diamonds
		0x1f0d1 to 0x1a0ae: Clubs
*/
		constructor() {
			const SUITS = 4;
			const FACES = 13;
			const CARDS = SUITS * FACES;

			var this.deck;
			var this.discardPile;
			this.discardPile = [];
			this.newDeck();
		}

		newDeck() {
			this.deck = [];
			this.discard = [];
			for ( let suit = 0; suit < SUITS; suit++ ) {
				for ( let face = 0; face < FACES; face++ ) {
					this.deck.push( new Card( suit, face ));
				}
			}
		}

		shuffle() {
			var randIdx;
			var randCard;

			for ( let step = 0; step < CARDS; step++ ) {
					randIdx = Math.floor(Math.random() * CARDS);
					if ( step % 2 = 1 ) {
						randCard = this.deck.shift();
					}
					else {
						randCard = this.deck.pop();
					}
					this.deck.splice( randIdx, 0, randCard );
			}
		}

		draw() {
			if ( this.deck.length < 1 ) {
				throw 'No cards left in deck';
			}
			return this.deck.pop();
		}

		discard( inCard ) {
			if ( inCard instanceof Card ) {
				this.discard.push( inCard );
			}
			else {
				throw 'Unable to discard invalid card.';
			}
		}

		set card( inCard ) {
			this.discard( inCard );
		}

		get card() {
			return draw();
		}
  };
});