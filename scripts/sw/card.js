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
 * CLASS:         Card
 * DESCRIPTION:   A simple playing card.
 * -------------------------------------------------------------------------- */
define([
], function(
	
) {
  return class Card {
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
		0x1f0b1 to 0x1a0be: Hearts
		0x1f0c1 to 0x1a0ce: Diamonds
		0x1f0d1 to 0x1a0de: Clubs
*/
		constructor( inSuit, inFace ) {
			const this._suit = inSuit;
			const this._face = inFace;
		}

		constructor( inCard ) {
			if ( incard instanceof Card ) {
				const this._suit = inCard._suit;
				const this._face = inCard._face;
			}
			else {
				throw 'Invalid input to copy constructor';
			}
		}

		get suit() {
			return this._suit;
		}

		get face() {
			return this._face;
		}
  };
});