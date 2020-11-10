"use strict";

const POOPSIZE = 50;

const game = document.querySelector(".game");

const gameBtn = document.querySelector(".game__button");
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

let human = undefined;
// let poop = undefined;

let started = false;
let poopTimer = ["poop"]; // 모든똥에대한 타이머를가지고있는
//배열

let poopTotalTimer = undefined;

let humanPosition = 0; // 사람 현재 위치

//사람 이동구현
window.addEventListener("keydown", (event) => {
  if (!started) return;

  if (event.key === "ArrowRight") {
    if (human.getBoundingClientRect().right > fieldRect.right) return;
    humanPosition += 10;
    human.style.transform = `translateX(${humanPosition}px)`;
  } else if (event.key === "ArrowLeft") {
    if (human.getBoundingClientRect().left < fieldRect.left) return;
    humanPosition -= 10;
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
  stopPoop();
}

function init() {
  addHuman();
  displayTotalPoop();
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
  return document.querySelectorAll(".poop");
}

function movePoop(poop, time, poopTimer, i) {
  let poopPosition = 0;
  poopTimer[i] = setInterval(() => {
    if (poop[i].getBoundingClientRect().bottom > fieldRect.bottom + POOPSIZE) {
      clearInterval(poopTimer);
    }
    poopPosition += 20;
    poop[i].style.transform = `translateY(${poopPosition}px)`;
  }, time);
}

function stopPoop() {
  poopTimer.forEach((timer) => {
    clearInterval(timer);
  });
  clearInterval(poopTotalTimer);
}

//하나의 타이머와 하나의 똥에관한 함수
function displayOnePoop(poopTimer, poop, i) {
  movePoop(poop, getRandom(100, 1000), poopTimer, i);
}

function displayTotalPoop() {
  let i = 0;
  poopTotalTimer = setInterval(() => {
    displayOnePoop(poopTimer, addPoop(), i);
    //똥 timer배열자체와 똥 element배열자체와 식별자 i를전달
    poopTimer.push("poop");
    ++i;
  }, getRandom(100, 2000));
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
