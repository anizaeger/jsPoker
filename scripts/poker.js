/*
Copyright (C) 2016, Anakin-Marc Zaeger

@source: pbx.nyfnet.net/keno/scripts/keno.js

@licstart
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
@licend

*/

function gplAlert() {
	var copyText = "";
	copyText += "Copyright (C) 2016, Anakin-Marc Zaeger\n"
	copyText += "\n"
	copyText += "This program is free software: you can redistribute it and/or modify\n"
	copyText += "it under the terms of the GNU General Public License as published by\n"
	copyText += "the Free Software Foundation, either version 3 of the License, or\n"
	copyText += "(at your option) any later version.\n"
	copyText += "\n"
	copyText += "This program is distributed in the hope that it will be useful,\n"
	copyText += "but WITHOUT ANY WARRANTY; without even the implied warranty of\n"
	copyText += "MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n"
	copyText += "GNU General Public License for more details.\n"
	copyText += "\n"
	copyText += "You should have received a copy of the GNU General Public License\n"
	copyText += "along with this program.  If not, see <http://www.gnu.org/licenses/>.\n"
	window.alert(copyText)
}

/*
	Game Initialization
*/

function init() {
	preloadSound();
	// Generate game data for backend
	makeArrays();

	// Generate HTML code for frontend
	printHandTable();
	printCreditTable();
	printPayTable();
	printCtrlTable();
	clearHand();
}

var deck = new Array();
var hand = new Array();

function makeArrays() {
	// Generate and initialize 52 card deck
	for ( suit = 0; suit < 4; suit++ ) {
		deck[ suit ] = new Array();
		for ( face = 0; face < 13; face++) {
			deck[ suit ][ face ] = ( suit * 13 ) + face;
		}
	}
	// Generate array to store dealt hand
	for ( row = 0; row < 5; row++ ) {
		hand[ row ] = new Array();
		for ( col = 0; col < 3; col++ ) {
			hand[ row ][col] = -1;
		}
	}
}

function printHandTable() {
	var tblHtml = '';
	tblHtml += '<tr>';
	tblHtml += '<td align="center" colspan=5 style="vertical-align:middle;height:45pt" id="winningHand"></td>';
	tblHtml += '</tr><tr>';
	for ( card = 0; card < 5; card++ ) {
		tblHtml += '<td>';
		tblHtml += '<div class="card" id="card' + card + '" style="font-size:192pt" onClick="holdCard('+card+')"></div>';
		tblHtml += '</td>';
	}
/*	tblHtml += '</tr><tr>';
	for ( card = 0; card < 5; card++ ) {
		tblHtml += '<td>';
		tblHtml += '<div class="debug" id="debug' + card + '">&nbsp;</div>';
		tblHtml += '</td>';
	}*/
	tblHtml += '</tr><tr>';
	for ( card = 0; card < 5; card++ ) {
		tblHtml += '<td align="center" style="vertical-align:top;" id="held' + card + '">'
		tblHtml += '<div class="held" id="held' + card + '">&nbsp;</div>';
		tblHtml += '</td>';
	}
	tblHtml += '</tr>';
	document.getElementById( "hand" ).innerHTML = tblHtml;
}

function printCreditTable() {
	var tblHtml = '';
	tblHtml += '<tr>';
	tblHtml += '<td align="right">';
	tblHtml += 'Coins In:<br />';
	tblHtml += 'Credits:<br />';
	tblHtml += '</td>';
	tblHtml += '<td style="text-align:left">';
	tblHtml += '<input type="number" id="betAmt" readonly style="width: 7em"/><br />';
	tblHtml += '<input type="number" id="credits" readonly style="width: 7em"/><br />';
	tblHtml += '</td>';
	tblHtml += '</tr>';
	tblHtml += '<tr>';
	tblHtml += '<td colspan=2 align="center">';
	tblHtml += '<div id="gameOver">Game Over</div>';
	tblHtml += '</td>';
	tblHtml += '</tr>';
	tblHtml += '<tr>';
	tblHtml += '<td align="right">';
	tblHtml += 'Win:<br />';
	tblHtml += 'Winner Paid:<br />';
	tblHtml += '</td>';
	tblHtml += '<td style="text-align:left">';
	tblHtml += '<input type="number" id="win" readonly style="width: 7em"/><br />';
	tblHtml += '<input type="number" id="paid" readonly style="width: 7em"/><br />';
	tblHtml += '</td>';
	tblHtml += '</tr>';
	tblHtml += '<tr>';
	tblHtml += '<td colspan="2" >';
	tblHtml += '<button onclick="insertCoin()">Insert Coin</button>';
	tblHtml += '</td>';
	tblHtml += '<td colspan="2" >';
	tblHtml += '<button onclick="insertBill()">Insert Bill</button>';
	tblHtml += '</td>';
	tblHtml += '</tr>';
	document.getElementById( "credit" ).innerHTML = tblHtml;
}



function printPayTable() {
	var tblHtml = '';
	for ( p = 0; p < paytable.length; p++) {
		tblHtml += '<tr>';
		tblHtml += '<td>';
		tblHtml += paytable[p][0];
		tblHtml += '</td>';
		tblHtml += '<td id="payAmt'+p+'">';
		tblHtml += paytable[p][1];
		tblHtml += '</td>';
		tblHtml += '</tr>';
	}
	
	document.getElementById( "pay" ).innerHTML = tblHtml;
}

function printCtrlTable() {
	var tblHtml = '';
	tblHtml += '<button onClick="betOne()">Bet One</button>';
	tblHtml += '<button onClick="betMax()">Bet Max</button>';
	tblHtml += '<button id="dealDraw" onClick="startGame()" disabled>Deal Cards</button>';
	document.getElementById( "ctrl" ).innerHTML = tblHtml;
}

function clearHand() {
	clearHeld();
	for ( c = 0; c < 5; c++ ) {
		for ( e = 0; e < 2; e++ ) {
			hand[c][e] = -1;
		}
		document.getElementById( "card" + c ).innerHTML="&#x1F0A0;";
		document.getElementById( "card" + c ).style.color="black";
//		document.getElementById( "debug" + c ).innerHTML="&nbsp;"
	}
	document.getElementById( "winningHand" ).innerHTML="&nbsp;";
}

function clearHeld() {
	for ( c = 0; c < 5; c++ ) {
		hand[c][2] = 0;
		document.getElementById("held"+c).innerHTML="&nbsp;";
		document.getElementById("held"+c).style.backgroundColor="white";
	}
}

/*
	Credit Manipulation Functions
*/

var credits = 0;
var betAmt = 0;
var betLimit = 5;
var lockBtn = 0;
var gameActive = 0;
var canHold = 0;
var cashingOut = 0;
function betOne() {
	if ( gameActive == 0 && lockBtn == 0 ) {
		if ( credits > 0 ) {
			clearHand();
			document.getElementById("gameOver").innerHTML="&nbsp;"
			credits--;
			betAmt++;
			noStart = 0;
			document.getElementById("dealDraw").disabled=false;
			document.getElementById("credits").value=credits;
			playSound(1);
			if ( betAmt >= betLimit ) {
				betAmt = betLimit;
			}
			for ( p = 0; p < paytable.length; p++ ) {
				payAmt = paytable[p][1] * betAmt;
				document.getElementById("payAmt" + p).innerHTML=payAmt;
			}
			document.getElementById("betAmt").value=betAmt;
			if ( betAmt == betLimit ) {
				gameActive = lockBtn;
				setTimeout( function() { startGame(); }, 500 );
			}
			return true;
		} else { return false; }
	} else { return false; }
}

function betMax() {
	if ( betAmt >= betLimit || credits <= 0 || gameActive == 1 || lockBtn == 1 ) { return; }
	if ( betOne() ) {
		setTimeout(function () {
			betMax();
		}, 125 )
	}
}

function insertCoin() {
	if ( cashingOut == 1 || lockBtn == 1 || gameActive == 1 ) {
		return;
	} else {
		lockBtn = 1;
		playSound(0);
		setTimeout(function () {
			lockBtn = 0;
			credits++;
			betOne();
		}, 750 )
	}
}

function insertBill() {
	if ( cashingOut == 1 || lockBtn == 1 || gameActive == 1 ) {
		return;
	} else {
		credits = credits + 100;
		document.getElementById("credits").value=credits;
		playSound(1);
	}
}

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

function shuffle() {
	var swap;
	var randSuit;
	var randFace;
	
	for ( row = 0; row < 4; row++ ) {
		for ( col = 0; col < 13; col++ ) {
			randSuit = Math.floor(Math.random() * 4);
			randFace = Math.floor(Math.random() * 13);
			swap = deck[ row ][ col ];
			deck[ row ][ col ] = deck[ randSuit ][ randFace ];
			deck[ randSuit ][ randFace ] = swap;
		}
	}
}

/*
	Hand Manipulation Functions
*/

var heldCards;
function startGame() {
	if ( gameActive == 1 || betAmt <= 0) {
		return;
	}
	gameActive = 1;
	document.getElementById("dealDraw").disabled=true;
	heldCards = 0;
	for ( x = 0; x < 100; x++ ) {
		shuffle();
	}
	dealHand();
}

var draw;
function dealHand() {
	var done;
	draw = 0;
	for ( c = 0; c < 5; c++ ) {
		cardsDealt = 0;
		done = 0;
		for ( s = 0; s < 4; s++ ) {
			for ( f = 0; f < 13; f++ ) {
				if ( deck[s][f] == c ) {
					hand[c][0] = s;
					hand[c][1] = f;
					hand[c][2] = 0;
					done = 1
				}
				if ( done == 1) { break; }
			}
			if ( done == 1) { break; }
		}
	}
	printCard();
	setTimeout(function() {
		document.getElementById("dealDraw").innerHTML="Draw Cards";
		document.getElementById("dealDraw").setAttribute('onclick','drawCards()');
		document.getElementById("dealDraw").disabled=false;
	}, 1000)
}

function printCard() {
	for ( c = 0; c < 5; c++ ) {
		var card = c;
		if ( hand[c][2] == 0 ) {
			var cardSuit = hand[c][0];
			var cardFace = hand[c][1];
			if ( cardSuit == 1 || cardSuit == 2 ) {
				document.getElementById("card" + c).style.color="red";
			} else {
				document.getElementById("card" + c).style.color="black";
			}
			if ( cardFace > 10 ) { cardFace++ }
			var cardFaceHex = 126976 + ( 16 * cardSuit + 160 ) + cardFace + 1;
			document.getElementById("card" + c).innerHTML='&#x' + cardFaceHex.toString(16) + ';';
//			document.getElementById("debug" + c).innerHTML='<br />' + cardFaceHex.toString(16) + ', '+cardSuit+', '+cardFace;
			playSound(3);
			hand[c][2] = 1;
			break;
		}
	}
	if ( card == 4 ) {
		for ( c = 0; c < 5; c++ ) { hand[c][2] = 0; }
		if ( draw == 0 ) {
			checkDeal();
			canHold = 1;
		} else {
			checkDraw();
		}
	} else {
		setTimeout(function() { printCard() },100)
	}
}

function holdCard(card) {
	if ( canHold == 0 ) { return; }
	playSound(3);
	if ( hand[card][2] == 1 ) {
		document.getElementById("held"+card).innerHTML="&nbsp;";
		document.getElementById("held"+card).style.backgroundColor="white";
		hand[card][2] = 0;
	} else {
		document.getElementById("held"+card).innerHTML="HELD";
		document.getElementById("held"+card).style.backgroundColor="cyan";
		hand[card][2] = 1;
	}
}

function drawCards() {	
	draw = 1;
	canHold = 0;
	var done;
	document.getElementById("dealDraw").disabled=true;
	var p = 5
	for ( c = 0; c < 5; c++ ) {
		if ( hand[c][2] == 0 ) {
			done = 0;
			for ( s = 0; s < 4; s++ ) {
				for ( f = 0; f < 13; f++ ) {
					if  ( deck[s][f] == p ) {
						hand[c][0] = s;
						hand[c][1] = f;
						p++;
						done = 1
					}
					if ( done == 1) { break; }
				}
				if ( done == 1) { break; }
			}
			document.getElementById( "card" + c ).innerHTML="&#x1F0A0;";
		}
	}
	setTimeout(function() {
		printCard();
	},200)
	noStart = 0;
}

/*
	Functions to verify winning hands
*/

var cardSuits = new Array(5);
var cardFaces = new Array(5);

/*
	-1:	CONTINUE
	0: ROYALFLUSH
	1: STRAIGHTFLUSH
	2: FOURKIND
	3: FULLHOUSE
	4: FLUSH
	5: STRAIGHT
	6: THREEKIND
	7: TWOPAIR
	8: JACKSBETTER
	9: LOSS
*/

var paytable = new Array();
paytable[0] = ["Royal Flush",250];
paytable[1] = ["Straight Flush",50];
paytable[2] = ["Four of a Kind",25];
paytable[3] = ["Full House",9];
paytable[4] = ["Flush",6];
paytable[5] = ["Straight",4];
paytable[6] = ["Three of a Kind",3];
paytable[7] = ["Two Pair",2];
paytable[8] = ["Jacks or Better",1];

function checkDeal(){
	gameStatus = checkHand();
	if ( gameStatus == 9 ) {
		return;
	} else if ( gameStatus >= 0 && gameStatus < 9 ) {
		if ( gameStatus >= 0 && gameStatus <= 2 ) {
			playSound(6);
		} else if ( gameStatus >= 3 && gameStatus <= 5 ) {
			playSound(5);
		} else {
			playSound(4);
		}
		winType = paytable[gameStatus][0];
		document.getElementById("winningHand").style.fontSize="12pt";
		document.getElementById("winningHand").innerHTML=winType;
	} else {
		alert('*** BUG: Invalid \'gameStatus\' value: '+gameStatus)
	}
}

function checkDraw(){
	gameStatus = checkHand();
	if ( gameStatus == 9 ) {
		endGame()
	} else if ( gameStatus >= 0 && gameStatus < 9 ) {
		doWin(gameStatus);
	} else {
		alert('*** BUG: Invalid \'gameStatus\' value: '+gameStatus)
	}
}

function doWin(winNum) {
	winType = paytable[winNum][0];
	winPay = paytable[winNum][1];
	winPay *= betAmt;
	document.getElementById("winningHand").style.fontSize="36pt";
	document.getElementById("winningHand").innerHTML=winType;
	document.getElementById("win").value=winPay;
	payWin(winPay,0,0)
}

function payWin(payout,i,paySound) {
	i++;
	credits++;
	playSound("paySound" + paySound);
	paySound++;
	if (paySound == paySounds ) { paySound = 0; }
	document.getElementById("paid").value=i;
	document.getElementById("credits").value=credits;
	setTimeout(function () {
		if ( i < payout ) {
			payWin(payout,i,paySound);
		} else {
			endGame();
		}
	}, 100);
}

function endGame() {
	lastBet = betAmt;
	betAmt = 0;
	gameActive = 0;
	lockBtn = 0;
	document.getElementById("gameOver").innerHTML="Game Over";
	document.getElementById("dealDraw").innerHTML="Deal Cards";
	document.getElementById("dealDraw").setAttribute('onclick','startGame()');
}

function checkHand() {
	var gameStatus=-1;	// CONTINUE
	cardSuits = new Array(0);
	cardFaces = new Array(0);
	for ( card = 0; card < 5; card++ ) {
		cardSuits[card] = hand[card][0];
		cardFaces[card] = hand[card][1];
	}
	
	if ( flushChk() ) {		// Test for FLUSH
		gameStatus = 4;		// Set
	}
	
	var straight = straightChk();
	
	if ( straight != 0 ) {		// STRAIGHT present
		if ( gameStatus == 4 ) {	// FLUSH test
			if ( straight == 2 ) {	// Ace-high straight
				gameStatus = 0;		// ROYALFLUSH
			} else {
				gameStatus = 1;		// STRAIGHTFLUSH
			}
		} else {
			gameStatus = 5;			// STRAIGHT
		}
	}

	if ( gameStatus == -1 ) {	// CONTINUE
		gameStatus = commCard();
	}
	return gameStatus
}

function flushChk() {
	var flush = true;
	var flushSuit = cardSuits[ 0 ];		// Set suit of first card in hand
	for ( c = 1; c < 5 ; c++ ) {		// Test each subsequent card
		if ( cardSuits[ c ] != flushSuit ) {	// If suits mismatch, no flush
			flush = false;
			break;
		}
	}
	return flush;
}

function straightChk() {
	
	/*
		straight Return Values:
			0: No straight
			1: Straight
			2: Ace-high Straight
	*/
	
	var straight = 0;
	var faceSort = new Array(5);
	var start;

	for ( c = 0; c < 5; c++ ){
		faceSort[ c ] = cardFaces[ c ];
	}
	
	// Sort card faces into ascending order
	for ( pass = 0; pass < 4; pass++ ) {
		var bubble = 0;
		for ( i = 0; i < 4; i++ ) {
			if ( faceSort[ i ] > faceSort[ i + 1 ] ) {
				var hold = faceSort[ i ];
				faceSort[ i ] = faceSort[ i + 1 ];
				faceSort[ i + 1 ] = hold;
				bubble = 1;
			}
		}
		if ( bubble == 0 ) { break; }
	}

	const firstCard = faceSort[ 0 ];	// First card in hand; required for ROYALFLUSH test
	const secondCard = faceSort[ 1 ];	// Second card in hand
	straight = 1;

	// Test second through last card for sequentiality
	for ( handTest = 2; handTest < 5; handTest++ ) {
		if ( faceSort[ handTest ] != secondCard + ( handTest - 1 ) ) {
			straight = 0;
			break;
		}
	}

	if ( straight == 1 ) {	// If last 4 cards form a straight, check firstCard
		if ( firstCard != secondCard - 1 ) {	// firstCard not 1 less than secondCard; possible ace-high straight
			if ( firstCard == 0 && secondCard == 9 ) {		// Is firstCard ACE?
				straight = 2;	// Ace-high straight
			} else {
				straight = 0;	// No straight
			}
		}
	}
	return straight;
}

function commCard() {

	var retVal = 9;	// Default to 9: LOSS
	var pairs = 0;	// Pair counter
	var jacksBetter = 0

	var faceCount = new Array(13);	// Array storing count of cards of each face value

	for ( initFaces = 0; initFaces < 13; ++initFaces ) {
		faceCount[ initFaces ] = 0;
	}

	// Count how many cards of each face value are in hand
	for ( handCard = 0; handCard < 5; handCard++ ) {
		faceCount[ cardFaces[ handCard ] ] += 1;
	}

	for ( x = 0; x < 13; x++ ) {
		if ( faceCount[ x ] == 4 ) {	// FOURKIND
			retVal = 2;
			break;
		} else if ( faceCount[ x ] == 3 ) {		// Three of a kind
			retVal = 6;
		} else if ( faceCount[ x ] == 2 ) {		// Count of pairs
			pairs++;
			if ( ( x == 0) || ( x > 9 ) ) {		// Jacks or better pair present
				jacksBetter = 1;
			}
		}
	}

	if ( ( retVal == 6 ) && ( pairs == 1 ) ) {	// Three of a kind and pair present: FULLHOUSE
		retVal = 3;
	} else if ( pairs == 2 ) {		// TWOPAIR
		retVal = 7;
	} else if ( ( jacksBetter == 1 ) && ( pairs == 1 ) ) {		// JACKSBETTER
		retVal = 8;
	}

	return retVal;
}


function printSuit(card){
	var cardSuit = hand[card][0];
	var cardSuitHex = 0x2660 + cardSuit;
	return cardSuitHex;
}

/*
	jQuery Functions
*/

$(window).keypress(function(e){
	var code = e.which || e.keyCode;
	switch ( code )
	{
	case 49:
		betOne();
		return false;
	case 50:
		startGame();
		return false;
	case 51:
		betMax();
		return false;
	case 52:
		insertCoin();
		return false;
	case 53:
		cashOut();
		return false;
	case 54:
		insertBill();
		return false;
	default:
		break;
	}
});

/*
	SoundJS Functions
*/

var sounds = ["insertCoin.wav","coinBong.wav","cashOut.wav","tick.wav","possWin0.wav","possWin1.wav","possWin2.wav","jackpot.mp3"];

var paySounds = 33;

function preloadSound() {
	for ( sIndex = 0; sIndex < sounds.length; sIndex++ ) {
		createjs.Sound.registerSound({id:sIndex, src:"sounds/" + sounds[sIndex] });
	};
	for ( pIndex = 0; pIndex < paySounds; pIndex++ ) {
		createjs.Sound.registerSound({id:"paySound" + pIndex, src:"sounds/payOut/paySound" + pIndex + ".wav"});
	};
}

function playSound(sIndex) {
	/*
		sIndex Values:
		0: insertCoin
		1: coinBong
		2: cashOut
		3: tick
		4: possWin0
		5: possWin1
		6: possWin2
		7: jackpot

	*/

	createjs.Sound.play(sIndex)
}