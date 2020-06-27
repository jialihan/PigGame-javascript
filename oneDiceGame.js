/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,
	roundScore,
	activePlayer,
	gamePlaying,
	preDice,
	winScore = 10;

document.querySelector('.dice2').style.display = 'none';

init();

// change value to element
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// read value from element
// var x = document.querySelector('#score-0').textContent;

//
document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		// 1. random number
		var dice = Math.floor(Math.random() * 6) + 1; // range: 1 <= dice <= 6

		// 2. display the immage result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		// 3. update round score if the rolled number was not 1
		if (dice === 1) {
			// clean up and next play
			transitToNextPlayer();
		} else {
			// conintue to play
			// add score
			roundScore += dice;
			document.getElementById('current-' + activePlayer).textContent = roundScore;
			// preDice = dice;
		}
	}
});

// Hold button event
document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// Add Current score to GLOBAL score
		scores[activePlayer] += roundScore;

		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// Check if player win the game
		if (scores[activePlayer] >= winScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			// clean up when Winner
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// clean up  and shift to next player
			transitToNextPlayer();
		}
	}
});

function transitToNextPlayer() {
	// DRY rule
	roundScore = 0;
	document.getElementById('current-' + activePlayer).textContent = roundScore;
	// change active player theme
	// document.querySelector('.player-' + (1 - activePlayer) + '-panel').classList.remove('active');
	// document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
	activePlayer = 1 - activePlayer;
	preDice = null;
}

// Hold button event
document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-new').addEventListener('click', init());

function init() {
	gamePlaying = true;
	// reset scores
	scores = [ 0, 0 ];
	activePlayer = 0;
	roundScore = 0;
	// change the css of element
	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

document.getElementById('win-score').addEventListener('change', function(e) {
	winScore = e.target.value;
});
