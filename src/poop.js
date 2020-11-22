const POOPSIZE = 40;

export default class Poop {
  constructor(gameUser, game) {
    this.gameUser = gameUser;
    this.game = game;
    this.poopTimer = ['poop']; // 모든똥에대한 타이머를가지고있는 배열
    this.poopTotalTimer = undefined;
  }

  onScoreListener(onScore) {
    this.onScore = onScore;
  }
  onStopListener(onStop) {
    this.onStop = onStop;
  }

  addPoop = () => {
    const img = document.createElement('img');
    img.setAttribute('src', 'imgs/poop.png');
    img.setAttribute('class', 'poop');
    img.style.position = 'absolute';
    img.style.left = `${getRandom(
      0,
      this.gameUser.fieldRect.width - POOPSIZE
    )}px`;
    img.style.top = '0px';
    this.game.appendChild(img);
    return document.querySelectorAll('.poop');
  };

  movePoop(poop, poopTimer, i) {
    let poopPosition = 0;
    let times = 0; // 최초만 실행하기위해서
    poopTimer[i] = setInterval(() => {
      if (
        poop[i].getBoundingClientRect().bottom >
        this.gameUser.fieldRect.bottom + 30
      ) {
        if (times !== 0) return;
        clearInterval(poopTimer);
        this.onScore && this.onScore();
        ++times;
      }
      poopPosition += 5;
      poop[i].style.transform = `translateY(${poopPosition}px)`;

      // 똥과 사람이 부딪힘 -> 게임질경우
      if (
        poop[i].getBoundingClientRect().bottom - 13 >=
          this.gameUser.human.getBoundingClientRect().top &&
        this.gameUser.fieldRect.bottom >
          poop[i].getBoundingClientRect().bottom &&
        poop[i].getBoundingClientRect().right - 35 >
          this.gameUser.human.getBoundingClientRect().left &&
        poop[i].getBoundingClientRect().left + 35 <
          this.gameUser.human.getBoundingClientRect().right
      ) {
        this.onStop && this.onStop();
      }
    }, getRandom(10, 200));
  }

  stopPoop() {
    this.poopTimer.forEach((timer) => {
      clearInterval(timer);
    });
    clearInterval(this.poopTotalTimer);
  }
  displayOnePoop(poopTimer, poop, i) {
    this.movePoop(poop, poopTimer, i);
  }

  displayTotalPoop() {
    let i = 0;
    this.poopTotalTimer = setInterval(() => {
      this.displayOnePoop(this.poopTimer, this.addPoop(), i);
      //똥 timer배열자체와 똥 element배열자체와 식별자 i를전달
      this.poopTimer.push('poop');
      ++i;
    }, getRandom(300, 1000));
  }
  removeElements() {
    const poops = document.querySelectorAll('.poop');
    poops.forEach((poop) => {
      poop.remove();
    });
    this.gameUser.human.remove();
  }
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
