const targetButton = document.getElementById("target");
const message = document.getElementById("message");
const hint = document.getElementById("hint");
const last = document.getElementById("last");
const best = document.getElementById("best");
const symbol = document.getElementById("symbol");

let state = "ready";
let startTime = 0;
let timer = null;
let bestTime = null;

const delay = () => {
  return Math.floor(Math.random() * 3000) + 2000;
};

const startGame = () => {
  state = "waiting";

  targetButton.style.backgroundColor = "red";
  message.textContent = "Wait for green";
  hint.textContent = "Get ready";
  symbol.textContent = "...";
  symbol.style.fontSize = "48px";

  timer = setTimeout(stateFunction, delay());
};

const stateFunction = () => {
  state = "go";

  targetButton.style.backgroundColor = "green";
  message.textContent = "CLICK NOW";
  hint.textContent = "Click as fast as you can";

  startTime = performance.now();
};

const resetGame = () => {
  state = "ready";

  targetButton.style.backgroundColor = "#27272A";
  message.textContent = "Too early";
  hint.textContent = "Click to try again";
  symbol.textContent = "↻";
  symbol.style.fontSize = "48px";
};

const finishGame = () => {
  clearTimeout(timer);
  const reactionTime = Math.round(performance.now() - startTime);

  state = "result";

  last.textContent = `${reactionTime}`;
  message.textContent = `${reactionTime} ms`;
  symbol.textContent = "✓";
  symbol.style.fontSize = "48px";
  hint.textContent = "Click to try again";

  targetButton.style.backgroundColor = "#27272A";
  if (bestTime === null || reactionTime < bestTime) {
    bestTime = reactionTime;
    best.textContent = `${bestTime}`;
  }
};

targetButton.addEventListener("click", () => {
  if (state === "ready" || state === "result") {
    startGame();
  } else if (state === "waiting") {
    resetGame();
  } else if (state === "go") {
    finishGame();
  }
});
