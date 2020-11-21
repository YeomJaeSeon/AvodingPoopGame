import Human from './human.js';
import Poop from './poop.js';

const STOP_REASON = Object.freeze({
  stop: 'stop',
  lose: 'lose',
});

export default class Game {
  constructor() {
    this.gameBtn = document.querySelector('.game__button');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.timer = undefined;
    this.score = 0;
    this.started = false;
    this.game = document.querySelector('.game');

    this.gameBtn.addEventListener('click', () => {
      if (!this.started) {
        this.startGame();
      } else {
        this.stopGame(STOP_REASON.stop);
      }
    });
    this.gameUser = new Human(() => this.started);

    this.gamePoop = new Poop(this.gameUser, this.game);

    this.gamePoop.onScoreListener(() => {
      this.score += 100;
      this.upDateScoreBoard();
    });
    this.gamePoop.onStopListener(() => {
      this.stopGame(STOP_REASON.lose);
    });
  }
  onStopListener(onStop) {
    this.onStop = onStop;
  }

  startGame() {
    this.started = true;
    this.init();
    this.changeGameBtn();
    this.startGameTimer();
  }
  //게임 사용자가 멈출경우, 게임이 져서 멈출경우 두경우 존재
  stopGame(reason) {
    this.started = false;
    this.hideGameBtn();
    this.gamePoop.stopPoop();
    this.stopGameTimer();
    switch (reason) {
      case STOP_REASON.stop:
        this.onStop && this.onStop(STOP_REASON.stop);
        // finishGameBanner.showPopupwithMessage('REPLAY??');
        break;
      case STOP_REASON.lose:
        this.onStop && this.onStop(STOP_REASON.lose);
        // finishGameBanner.showPopupwithMessage(`SCORE : ${score}`);
        break;
      default:
        throw new Error('NO EXIST');
    }
  }

  init() {
    this.score = 0;
    this.upDateScoreBoard();
    this.gameUser.humanPosition = 0;
    this.gameUser.addHuman();
    this.gamePoop.displayTotalPoop();
  }
  startGameTimer() {
    let remainTimes = 0;
    this.updateGameTimer(remainTimes);
    this.timer = setInterval(() => {
      this.updateGameTimer(++remainTimes);
    }, 1000);
  }
  stopGameTimer() {
    clearInterval(this.timer);
  }
  updateGameTimer(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }
  changeGameBtn() {
    const gameBtn = document.querySelector('.fas');
    gameBtn.classList.remove('fa-play');
    gameBtn.classList.add('fa-stop');
  }

  hideGameBtn() {
    this.gameBtn.style.visibility = 'hidden';
  }
  showGameBtn() {
    this.gameBtn.style.visibility = 'visible';
  }

  upDateScoreBoard() {
    this.gameScore.innerText = this.score;
  }
  removeElements() {
    const poops = document.querySelectorAll('.poop');
    poops.forEach((poop) => {
      poop.remove();
    });
    this.gameUser.human.remove();
  }
}
