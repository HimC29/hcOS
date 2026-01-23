import { initTaskbar } from "./taskbar.js";
import { initStartMenu } from "./startMenu.js";
import { loadSettings } from "../setSettings.js";

import { apps } from "../apps/apps.js";

console.log("Logged in");

const desktop = document.getElementById("desktop");
const startBtn = document.getElementById("startBtn");
const clock = document.getElementById("clock");
const date = document.getElementById("date");
const appList = document.getElementById("appList");

loadSettings();

initTaskbar({
    clock: clock,
    date: date,
    taskbar: appList,
    desktop: desktop
}, apps);
initStartMenu(startBtn);

window.addEventListener("message", (e) => {
    if(e.origin !== window.location.origin) return;
    loadSettings();
});