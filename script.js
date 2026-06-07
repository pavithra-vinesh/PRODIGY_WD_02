console.log("Script Loaded");
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 1;
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const laplist = document.getElementById('laplist');

function formatTime(timeInMilliseconds) {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(timeInMilliseconds % 1000) / 10;
    const pad = (num, size = 2) => String(Math.floor(num)).padStart(size, '0');
    const msFormatted = String(Math.floor(milliseconds)).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${msFormatted}`;
}
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}
function start(){
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 100);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
}
function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
}
function reset() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCounter = 1;
    updateDisplay();
    laplist.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}
function addLap() {
    console.log("Lap button clicked");
    if (isRunning){
       const lapItem = document.createElement('li');
        
        const lapNumber = document.createElement('span');
        lapNumber.textContent = `Lap ${lapCounter++}`;
        
        const lapTime = document.createElement('span');
        lapTime.textContent = formatTime(elapsedTime);
        lapTime.style.color = '#ffffff';

        lapItem.appendChild(lapNumber);
        lapItem.appendChild(lapTime); 
        laplist.insertBefore(lapItem, laplist.firstChild);
    }
}
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
lapBtn.addEventListener('click', addLap);
resetBtn.addEventListener('click', reset);
pauseBtn.disabled = true;
lapBtn.disabled = true;