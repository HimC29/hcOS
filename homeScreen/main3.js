import { initTaskbar } from "./taskbar.js";
import { initStartMenu } from "./startMenu.js";
import { loadSettings } from "../settings.js";
import { setWallpaper } from "./setWallpaper.js";
import { idbFuncs } from "../idbFuncs.js";

import { apps } from "../apps/apps.js";

console.log("Logged in");

const startBtn = document.getElementById("startBtn");
const clock = document.getElementById("clock");
const date = document.getElementById("date");
const appList = document.getElementById("appList");

// Initialize IndexedDB and load wallpaper
await idbFuncs.openDB("myOSDB", 2, [
    { name: "wallpaper", keyPath: "id" }
]);
await setWallpaper();

loadSettings();

initTaskbar({
    clock: clock,
    date: date,
    taskbar: appList
}, apps);
initStartMenu(startBtn);

window.addEventListener("message", (e) => {
    if(e.origin !== window.location.origin) return;
    if(e.data.type === "wallpaperUpdate") {
        setWallpaper();
    } else {
        loadSettings();
    }
});
window.addEventListener("indexedDBupdate", () => {
    setWallpaper();
});