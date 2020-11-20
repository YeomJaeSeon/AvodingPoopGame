'use strict';
import Popup from './popup.js';
import Human from './human.js';
import Poop from './poop.js';

const STOP_REASON = Object.freeze({
  stop: 'stop',
  lose: 'lose',
});

const game = document.querySelector('.game');

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let timer = undefined;

let score = 0;

const finishGameBanner = new Popup();
finishGameBanner.onStopListener(() => {
  removeElements();
  startGame();
  showGameBtn();
});

const gameUser = new Human(() => started);

const gamePoop = new Poop(gameUser, game);

gamePoop.onScoreListener(() => {
  score += 100;
  upDateScoreBoard();
});
gamePoop.onStopListener(() => {
  stopGame(STOP_REASON.lose);
});
gameBtn.addEventListener('click', () => {
  if (!started) {
    startGame();
  } else {
    stopGame(STOP_REASON.stop);
  }
});

function startGame() {
  started = true;
  init();
  changeGameBtn();
  startGameTimer();
}
//게임 사용자가 멈출경우, 게임이 져서 멈출경우 두경우 존재
function stopGame(reason) {
  started = false;
  hideGameBtn();
  gamePoop.stopPoop();
  stopGameTimer();
  switch (reason) {
    case STOP_REASON.stop:
      finishGameBanner.showPopupwithMessage('REPLAY??');
      break;
    case STOP_REASON.lose:
      finishGameBanner.showPopupwithMessage(`SCORE : ${score}`);
      break;
    default:
      throw new Error('NO EXIST');
  }
}
function removeElements() {
  const poops = document.querySelectorAll('.poop');
  poops.forEach((poop) => {
    poop.remove();
  });
  gameUser.human.remove();
}

function init() {
  score = 0;
  upDateScoreBoard();
  gameUser.humanPosition = 0;
  gameUser.addHuman();
  gamePoop.displayTotalPoop();
}
function startGameTimer() {
  let remainTimes = 0;
  updateGameTimer(remainTimes);
  timer = setInterval(() => {
    updateGameTimer(++remainTimes);
  }, 1000);
}
function stopGameTimer() {
  clearInterval(timer);
}
function updateGameTimer(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}
function changeGameBtn() {
  const gameBtn = document.querySelector('.fas');
  gameBtn.classList.remove('fa-play');
  gameBtn.classList.add('fa-stop');
}

function hideGameBtn() {
  gameBtn.style.visibility = 'hidden';
}
function showGameBtn() {
  gameBtn.style.visibility = 'visible';
}

function upDateScoreBoard() {
  gameScore.innerText = score;
}
