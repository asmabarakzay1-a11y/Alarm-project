
const selectMenu = document.querySelectorAll("select");
const timeBox = document.querySelector(".time");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");

let alarmTime;
let alarmState = "noset";

// Audio
const Ringtone = new Audio(
  "freesound_community-bedside-clock-alarm-95792.mp3"
);

// Hours: 00 - 23
for (let i = 23; i >= 0; i--) {
  let value = i < 10 ? "0" + i : i;

  let option = `<option value="${value}">${value}</option>`;

  selectMenu[0].firstElementChild.insertAdjacentHTML(
    "afterend",
    option
  );
}

// Minutes: 00 - 59
for (let i = 59; i >= 0; i--) {
  let value = i < 10 ? "0" + i : i;

  let option = `<option value="${value}">${value}</option>`;

  selectMenu[1].firstElementChild.insertAdjacentHTML(
    "afterend",
    option
  );
}

// Digital Clock
setInterval(() => {
  let date = new Date();

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timeBox.innerHTML = `${h}:${m}:${s}`;

  // Check Alarm
  if (alarmTime === `${h}:${m}` && alarmState === "set") {
    Ringtone.loop = true;
    Ringtone.play();
  }

}, 1000);

// Set Alarm Button
setAlarmBtn.addEventListener("click", () => {

  if (alarmState === "noset") {

    let hour = selectMenu[0].value;
    let minute = selectMenu[1].value;

    // Check selected values
    if (hour === "Hour" || minute === "Minute") {
      alert("Specify The Alarm Time Correctly");
      return;
    }

    alarmTime = `${hour}:${minute}`;

    checkState("noset");

  } else {

    checkState("set");

  }

});

// Check Alarm State
function checkState(state) {

  if (state === "noset") {

    content.classList.add("disable");

    setAlarmBtn.innerText = "Clear Alarm";

    alarmState = "set";

  } else {

    content.classList.remove("disable");

    alarmTime = "";

    Ringtone.pause();
    Ringtone.currentTime = 0;

    setAlarmBtn.innerText = "Set Alarm";

    alarmState = "noset";

  }

}
