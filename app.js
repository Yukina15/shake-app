const startBtn = document.getElementById(startBtn);
const statusDiv = document.getElementById("status");
const valX = document.getElementById("valX");
const valY = document.getElementById("valY");
const valZ = document.getElementById("valZ");

function onMotion(e) {
    const acc = e.accelerationIncludingGravity;
    if(!acc) return;
    valX.textContent = acc.x;
    valY.textContent = acc.y;
    valZ.textContent = acc.z;
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