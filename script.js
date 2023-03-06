import diceGenerator from './diceGenerator.js';

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScores, activePlayer;

const init = function () {
  // 1. Reset values
  scores = [0, 0];
  currentScores = [0, 0];
  activePlayer = 0;

  // 2. Reset DOM values
  document.querySelectorAll('.score').forEach(el => (el.textContent = 0));
  document
    .querySelectorAll('.current-score')
    .forEach(el => (el.textContent = 0));
  document
    .querySelectorAll('.name')
    .forEach((el, i) => (el.textContent = `Player ${i + 1}`));

  // Setting the active player class to Player 1
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');

  // 3. Attach handler events
  btnRoll.addEventListener('click', rollDice);
  btnHold.addEventListener('click', holdCurrentScore);
};

const updateCurrentScoreDOM = function (activePlayer) {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScores[activePlayer];
};

const generateDiceDOM = function (number) {
  diceEl.src = diceGenerator(number);
};

const highlighActivePlayerDOM = function () {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const rollDice = function () {
  const number = Math.trunc(Math.random() * 6) + 1;
  if (number === 1) {
    // Update current score
    currentScores[activePlayer] = 0;
    updateCurrentScoreDOM(activePlayer);
    // Generate dice
    generateDiceDOM(number);
    // Switch players
    activePlayer = activePlayer === 0 ? 1 : 0;
    highlighActivePlayerDOM();
  } else {
    // Update current score
    currentScores[activePlayer] += number;
    updateCurrentScoreDOM(activePlayer);
    // Generate dice
    generateDiceDOM(number);
  }
};

const holdCurrentScore = function () {
  // Update score
  scores[activePlayer] += currentScores[activePlayer];
  currentScores[activePlayer] = 0;

  // Update DOM
  updateCurrentScoreDOM(activePlayer);
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // WINNER OR SWITCH PLAYERS
  if (scores[activePlayer] >= 20) {
    document.getElementById(`name--${activePlayer}`).textContent = 'WIN!!!';
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    //Detach handlers
    btnRoll.removeEventListener('click', rollDice);
    btnHold.removeEventListener('click', holdCurrentScore);
  } else {
    activePlayer = activePlayer === 0 ? 1 : 0;
    highlighActivePlayerDOM();
  }
};

btnNew.addEventListener('click', init);

init();
