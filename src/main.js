'use strict';

const STOP_REASON = Object.freeze({
  stop: 'stop',
  lose: 'lose',
});

const POOPSIZE = 40;
const HUMANSIZE = 60;

const game = document.querySelector('.game');

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const popup = document.querySelector('.popup');
const popupMessage = document.querySelector('.popup__message');
const popupBtn = document.querySelector('.popup__refresh');

let human = undefined;
// let poop = undefined;

let started = false;
let timer = undefined;
let poopTimer = ['poop']; // 모든똥에대한 타이머를가지고있는 배열
let poopTotalTimer = undefined;

let humanPosition = 0; // 사람 현재 위치
let score = 0;

popupBtn.addEventListener('click', () => {
  removeElements();
  startGame();
  hidePopUp();
  showGameBtn();
});

//사람 이동구현
window.addEventListener('keydown', (event) => {
  if (!started) return;

  if (event.key === 'ArrowRight') {
    if (human.getBoundingClientRect().right > fieldRect.right) return;
    humanPosition += 10;
    human.style.transform = `translateX(${humanPosition}px)`;
  } else if (event.key === 'ArrowLeft') {
    if (human.getBoundingClientRect().left < fieldRect.left) return;
    humanPosition -= 10;
    human.style.transform = `translateX(${humanPosition}px)`;
  }
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
  stopPoop();
  stopGameTimer();
  switch (reason) {
    case STOP_REASON.stop:
      showPopupwithMessage('REPLAY??');
      break;
    case STOP_REASON.lose:
      showPopupwithMessage(`SCORE : ${score}`);
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
  human.remove();
}
function showPopupwithMessage(Msg) {
  popup.style.visibility = 'visible';
  popupMessage.innerText = Msg;
}
function hidePopUp() {
  popup.style.visibility = 'hidden';
}

function init() {
  score = 0;
  upDateScoreBoard();
  humanPosition = 0;
  addHuman();
  displayTotalPoop();
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

function addHuman() {
  const img = document.createElement('img');
  img.setAttribute('src', 'imgs/human.png');
  img.setAttribute('class', 'human');
  img.style.position = 'absolute';
  img.style.bottom = '0px';
  field.appendChild(img);
  img.style.left = '225px';
  human = document.querySelector('.human');
}

function addPoop() {
  const img = document.createElement('img');
  img.setAttribute('src', 'imgs/poop.png');
  img.setAttribute('class', 'poop');
  img.style.position = 'absolute';
  img.style.left = `${getRandom(0, fieldRect.width - POOPSIZE)}px`;
  img.style.top = '0px';
  game.appendChild(img);
  return document.querySelectorAll('.poop');
}
function upDateScoreBoard() {
  gameScore.innerText = score;
}

function movePoop(poop, poopTimer, i) {
  let poopPosition = 0;
  let times = 0; // 최초만 실행하기위해서
  poopTimer[i] = setInterval(() => {
    if (poop[i].getBoundingClientRect().bottom > fieldRect.bottom + 20) {
      if (times !== 0) return;
      clearInterval(poopTimer);
      score += 100;
      upDateScoreBoard();
      ++times;
    }
    poopPosition += 10;
    poop[i].style.transform = `translateY(${poopPosition}px)`;

    // 똥과 사람이 부딪힘 -> 게임질경우
    if (
      poop[i].getBoundingClientRect().bottom - 13 >=
        human.getBoundingClientRect().top &&
      fieldRect.bottom > poop[i].getBoundingClientRect().bottom &&
      poop[i].getBoundingClientRect().right - 35 >
        human.getBoundingClientRect().left &&
      poop[i].getBoundingClientRect().left + 35 <
        human.getBoundingClientRect().right
    ) {
      stopGame(STOP_REASON.lose);
    }
  }, getRandom(50, 300));
}

function stopPoop() {
  poopTimer.forEach((timer) => {
    clearInterval(timer);
  });
  clearInterval(poopTotalTimer);
}

//하나의 타이머와 하나의 똥에관한 함수
function displayOnePoop(poopTimer, poop, i) {
  movePoop(poop, poopTimer, i);
}

function displayTotalPoop() {
  let i = 0;
  poopTotalTimer = setInterval(() => {
    displayOnePoop(poopTimer, addPoop(), i);
    //똥 timer배열자체와 똥 element배열자체와 식별자 i를전달
    poopTimer.push('poop');
    ++i;
  }, getRandom(300, 1000));
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
