"use strict";

const gameBtn = document.querySelector(".game__button");
const field = document.querySelector(".game__field");

let started = false;
let poopTimer = undefined;

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
  img.style.position = "absolute";
  img.style.bottom = "0px";
  field.appendChild(img);
}

function rainPoop() {}
