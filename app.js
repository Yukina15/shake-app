alert("1.4")

const startBtn = document.getElementById("startBtn");
const statusDiv = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const stepsDiv = document.getElementById("steps");
const rateDiv = document.getElementById("rate");
const barDiv = document.getElementById("bar");
const distanceDiv = document.getElementById("distance");
const message = document.getElementById("message");

const STEP_HIGH = 11.5;
const STEP_LOW = 10;
const MIN_INTERVAL = 250;
const GOAL = 6000;
const STRIDE = 0.40;

let steps = 0;
let smoothed = 9.8;
let stepping = false;
let lastStepTime = 0;


function onMotion(e) {
    const acc = e.accelerationIncludingGravity;
    if(!acc) return;

    const p = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);

    smoothed = smoothed * 0.8 + p * 0.2;
    
    const now = Date.now();
    if(!stepping && smoothed > STEP_HIGH && now - lastStepTime > MIN_INTERVAL) {
        steps = steps + 1;
        stepping = true;
        lastStepTime = now;
        updateDisplay();
    }
    if(stepping && smoothed < STEP_LOW) {
        stepping = false;
    }
}

function updateDisplay() {
    stepsDiv.textContent = steps;
    const rate = Math.round(steps / GOAL * 100);
    rateDiv.textContent = rate;
    barDiv.style.width = Math.min(rate,100) + "%";
    distanceDiv.textContent = Math.round(steps * STRIDE);

    if(rate < 30) {
        message.textContent = "もっと頑張りましょう！";
    }
    if(30 < rate && rate < 60) {
        message.textContent = "その調子！！";
    }
    if(60 < rate && rate <99) {
        message.textContent = "いい感じ！！";
    }
    if(100 == rate) {
        message.textContent = "完璧！！";
    };

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
    statusDiv.textContent = "計測中";
});

resetBtn.addEventListener("click", () => {
    steps = 0;
    message.textContent="";
    updateDisplay();
});

window.addEventListener("load", () => {
    document.getElementById("goal").textContent = GOAL;
    updateDisplay();
});