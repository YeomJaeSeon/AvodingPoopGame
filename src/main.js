"use strict";

const gameBtn = document.querySelector(".game__button");
const field = document.querySelector(".game__field");

let human = undefined;

let started = false;
let poopTimer = undefined;

//사람 이동함.~
window.addEventListener("keydown", (event) => {
  if (!started) return;
  // const humanPosition = human.getBoundingClientRect().left;
  console.log(human.style.left);
  if (event.key === "ArrowRight") {
    console.log("오른쪾이동");
  } else if (event.key === "ArrowLeft") {
    console.log("왼쪽이동");
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
  // console.log(human.style.left);
}

function rainPoop() {}
