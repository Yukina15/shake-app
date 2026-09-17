alert("3.31")

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

let maxValue = 0;

let count = 0;
let lastTime = 0;

function onMotion(e) {
    const acc = e.accelerationIncludingGravity;
    if(!acc) return;

    const p = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
    power.textContent = p.toFixed(1);
    // valX.textContent = acc.x;
    // valY.textContent = acc.y;
    // valZ.textContent = acc.z;

    // power.style.fontSize = (20 + p) + "px";

    const now = Date.now();

    if (p > THRESHOLD && now - lastTime > COOL_TIME) {
        count = count + 1;
        countDiv.textContent = count;
        lastTime = now;
    }

    if (p > maxValue) {
        maxValue = p;
        maxPower.textContent = maxValue.toFixed(1);
    }

    if(count ++) {
        document.body.classList.add("shaking");
    }else{
        document.body.classList.remove("shaking");
    }

    if (count % 10 === 0 && count > 0) {
        message.textContent = "この調子！！";
    }else{
        message.textContent = "頑張って！！";
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
    statusDiv.textContent = "計測中";
});

resetBtn.addEventListener("click",async () => {
    maxValue = 0;

    count = 0;
    countDiv.textContent = count;

});