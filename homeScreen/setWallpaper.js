import { idbFuncs } from "../idbFuncs.js";

export async function setWallpaper(){
    const wallpaperObj = await idbFuncs.get("wallpaper", "wallpaper");
    console.log("wallpaperObj:", wallpaperObj); // check if it exists

    if (!wallpaperObj) {
        console.log("No wallpaper saved yet!");
        return;
    }

    const wallpaper = URL.createObjectURL(wallpaperObj.data);
    console.log("wallpaper URL:", wallpaper);

    let existingImg = document.getElementById("wallpaperImg");
    if(existingImg){
        existingImg.src = wallpaper;
    } else {
        const img = document.createElement("img");
        img.id = "wallpaperImg";
        img.src = wallpaper;
        img.style.position = "fixed";
        img.style.top = 0;
        img.style.left = 0;
        img.style.width = "100vw";
        img.style.height = "100vh";
        img.style.objectFit = "cover";
        img.style.zIndex = -1;
        document.body.appendChild(img);
    }
}
