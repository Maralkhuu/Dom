const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const stopButton = document.getElementById("stop-button");
const state = document.getElementById("state");
const displayHours = document.getElementById("hours");
const displayMinutes = document.getElementById("minutes");
const displaySeconds = document.getElementById("seconds");

let intervalId;
let startTime = 0;

const formatTime = (startTimer) => {
  const seconds = Math.floor(startTime % 60).toString().padStart(2, "0");
  const minutes = Math.floor((startTime % 3600) / 60).toString().padStart(2, "0");
  const hours = Math.floor(startTime / 3600).toString().padStart(2,"0");

  displayHours.textContent = hours;
  displayMinutes.textContent = minutes;
  displaySeconds.textContent = seconds;
};

const stopTimer = () => {
  clearInterval(intervalId);

  startButton.disabled = false;
  stopButton.disabled = true;
  state.textContent = "Paused";
  startButton.textContent = "Resume";
};

const resetTimer = () => {
  clearInterval(intervalId);

  startTime = 0;
  formatTime(startTime);

  startButton.disabled = false;
  resetButton.disabled = true;
  stopButton.disabled = true;
  state.textContent = "Paused";
  startButton.textContent = "Start";
};

const startTimer = () => {
  intervalId = setInterval(() => {
    startTime++;

    formatTime(startTime);
  }, 1000);

  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
  state.textContent = "Running";
};

resetButton.addEventListener("click", resetTimer);
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
