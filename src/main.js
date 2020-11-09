"use strict";

const POOPSIZE = 50;

const game = document.querySelector(".game");

const gameBtn = document.querySelector(".game__button");
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

let human = undefined;
let poop = undefined;

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
  changeGameBtn();
}
function stopGame() {
  started = false;
  hideGameBtn();
}

function init() {
  addHuman();
  rainPoop();
}
function changeGameBtn() {
  const gameBtn = document.querySelector(".fas");
  gameBtn.classList.remove("fa-play");
  gameBtn.classList.add("fa-stop");
}
function hideGameBtn() {
  gameBtn.style.visibility = "hidden";
}

function addHuman() {
  const img = document.createElement("img");
  img.setAttribute("src", "imgs/human.png");
  img.setAttribute("class", "human");
  img.style.position = "absolute";
  img.style.bottom = "0px";
  field.appendChild(img);
  img.style.left = "225px";
  human = document.querySelector(".human");
}

function addPoop() {
  const img = document.createElement("img");
  img.setAttribute("src", "imgs/poop.png");
  img.setAttribute("class", "poop");
  img.style.position = "absolute";
  img.style.left = `${getRandom(0, fieldRect.width - POOPSIZE)}px`;
  img.style.top = "0px";
  game.appendChild(img);
  poop = document.querySelector(".poop");
}

function rainPoop() {
  let poopPosition = 0;
  addPoop();
  poopTimer = setInterval(() => {
    if (poop.getBoundingClientRect().bottom > fieldRect.bottom + 20) {
      return;
    }
    console.log("똥비내려");
    poopPosition += 50;
    poop.style.transform = `translateY(${poopPosition}px)`;
  }, 1000);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
