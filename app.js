alert("4")

const startBtn = document.getElementById("startBtn");
const statusDiv = document.getElementById("status");
// const valX = document.getElementById("valX");
// const valY = document.getElementById("valY");
// const valZ = document.getElementById("valZ");
const power = document.getElementById("power");
const maxPower = document.getElementById("maxPower");

const resetBtn = document.getElementById("resetBtn");

let maxValue = 0;

function onMotion(e) {
    const acc = e.accelerationIncludingGravity;
    if(!acc) return;

    const p = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
    power.textContent = p.toFixed(1);
    // valX.textContent = acc.x;
    // valY.textContent = acc.y;
    // valZ.textContent = acc.z;

    if (p > maxValue) {
        maxValue = p;
        maxPower.textContent = maxValue.toFixed(1);
    }

    if(p > 70) {
        document.body.classList.add("shaking");
    }else{
        document.body.classList.remove("shaking");
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
});