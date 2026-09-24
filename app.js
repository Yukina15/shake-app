alert("3.32")

const startBtn = document.getElementById("startBtn");
const statusDiv = document.getElementById("status");
// const valX = document.getElementById("valX");
// const valY = document.getElementById("valY");
// const valZ = document.getElementById("valZ");
const power = document.getElementById("power");
const maxPower = document.getElementById("maxPower");

const resetBtn = document.getElementById("resetBtn");

const countDiv = document.getElementById("count");
const THRESHOLD = 25;
const COOL_TIME = 300;

const message = document.getElementById("message");

const timerDiv = document.getElementById("timer");
const messageDiv = document.getElementById("message");
const bestDiv = document.getElementById("best");
const GAME_TIME = 10;

let playing = false;
let timeId = null;
let endTime = 0;




let maxValue = 0;

let count = 0;
let lastTime = 0;

function onMotion(e) {
    if (!playing) return;
    const acc = e.accelerationIncludingGravity;
    if(!acc) return;

    const p = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
    const now = Date.now();

    if (p > THRESHOLD && now - lastTime > COOL_TIME) {
        count = count + 1;
        countDiv.textContent = count;
        lastTime = now;
    };
}

function startGame() {
    count = 0;
    countDiv.textContent = 0;
    messageDiv.textContent = "";
    playing = true;
    endTime = Date.now() + GAME_TIME * 1000;
    statusDiv.textContent = "シェイク！！";
    timeId = setInterval(updateTimer,100);
}

function updateTimer() {
    const rest = (endTime - Date.now()) / 1000;
    if (rest <= 0) {
        timerDiv.textContent = "0.0";
        endGame();
        return;
    }
    timerDiv.textContent = rest.toFixed(1);
}

function endGame() {
    playing = false;
    clearInterval(timeId);
    statusDiv.textContent = "終了！！";

    const best = Number(localStorage.getItem("shakeBest")) || 0;
    if (count > best) {
        localStorage.setItem("shakeBest", count);
        bestDiv.textContent = count;
        messageDiv.textContent = "新記録！おめでとう！";
    }else{
        messageDiv.textContent = "記録は" + best + "回です";
    }
}

startBtn.addEventListener("click",async () => {
    if(typeof DeviceMotionEvent.requestPermission === "function") {
        const res = await DeviceMotionEvent.requestPermission();
        if(res !== "granted") {
            statusDiv.textContent = "センサーが許可されませんでした";
            return;
        }
    }
    window.addEventListener("devicemotion" ,onMotion);
    startGame();
});

window.addEventListener("load",async () => {
    bestDiv.textContent = Number(localStorage.getItem("shakeBest")) || 0;
    timerDiv.textContent = GAME_TIME.toFixed(1);
});