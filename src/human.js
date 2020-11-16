'use strict';

export default class Human {
  constructor(isGameRunning) {
    this.isGameRunning = isGameRunning;
    this.human = undefined;
    this.humanPosition = 0; // 사람 현재 위치
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    window.addEventListener('keydown', (event) => {
      if (!isGameRunning()) return;
      if (event.key === 'ArrowRight') {
        if (this.human.getBoundingClientRect().right > this.fieldRect.right)
          return;
        this.humanPosition += 10;
        this.human.style.transform = `translateX(${this.humanPosition}px)`;
      } else if (event.key === 'ArrowLeft') {
        if (this.human.getBoundingClientRect().left < this.fieldRect.left)
          return;
        this.humanPosition -= 10;
        this.human.style.transform = `translateX(${this.humanPosition}px)`;
      }
    });
  }
  addHuman() {
    const img = document.createElement('img');
    img.setAttribute('src', 'imgs/human.png');
    img.setAttribute('class', 'human');
    img.style.position = 'absolute';
    img.style.bottom = '0px';
    this.field.appendChild(img);
    img.style.left = '225px';
    this.human = document.querySelector('.human');
  }
}
