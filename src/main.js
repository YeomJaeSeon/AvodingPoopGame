'use strict';
import Popup from './popup.js';
import { STOP_REASON, Game } from './game.js';

const finishGameBanner = new Popup();
const game = new Game();
game.onStopListener((reason) => {
  switch (reason) {
    case STOP_REASON.stop:
      finishGameBanner.showPopupwithMessage('REPLAY??');
      break;
    case STOP_REASON.lose:
      finishGameBanner.showPopupwithMessage(`SCORE : ${game.score}`);
      break;
    default:
      throw new Error('no exist');
  }
});
finishGameBanner.onStopListener(() => {
  game.removeElements();
  game.startGame();
  game.showGameBtn();
});
