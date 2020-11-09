"use strict";

const gameBtn = document.querySelector(".game__button");
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

let human = undefined;

let started = false;
let poopTimer = undefined;

let humanPosition = 0; // 사람 현재 위치

//사람 이동구현
window.addEventListener("keydown", (event) => {
  if (!started) return;

  if (event.key === "ArrowRight") {
    if (human.getBoundingClientRect().right > fieldRect.right) return;
    humanPosition += 20;
    human.style.transform = `translateX(${humanPosition}px)`;
  } else if (event.key === "ArrowLeft") {
    if (human.getBoundingClientRect().left < fieldRect.left) return;
    humanPosition -= 20;
    human.style.transform = `translateX(${humanPosition}px)`;
  }
});

gameBtn.addEventListener("click", () => {
  if (!started) {
    startGame();
  } else {
    stopGame();
  }
});

function startGame() {
  started = true;
  init();
}
function stopGame() {
  started = false;
}

function init() {
  addHuman();
}

function addHuman() {
  const img = document.createElement("img");
  img.setAttribute("src", "imgs/human.png");
  img.setAttribute("class", "human");
  img.style.position = "absolute";
  img.style.bottom = "0px";
  field.appendChild(img);
  human = document.querySelector(".human");
}

function rainPoop() {}
