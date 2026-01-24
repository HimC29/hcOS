let startBtn;
export let startMenuOpen = false;

export function initStartMenu(buttonEl){
    startBtn = buttonEl;
    startBtn.addEventListener("click", startMenu);
}

function closeStartMenu(){
    const menu = document.getElementById("startMenu");
        menu.style.opacity = "0";

        setTimeout(() => {
            menu.remove();
            startMenuOpen = false;
            console.log("Close start menu");
        }, 100); // must match CSS transition time
}

function startMenu(){
    // If menu already open close it
    if (startMenuOpen) {
        closeStartMenu();
        return;
    }
    // If not open
    // Create menu
    const startMenu = document.createElement("div");
    startMenu.id = "startMenu";
    document.body.appendChild(startMenu);
    startMenuOpen = true;

    createPowerOptions(startMenu);

    requestAnimationFrame(() => {
        startMenu.style.opacity = "1";
    });

    console.log("Open start menu");

    function handleOutsideClick(e){
        if(startMenu && e.target != startBtn && !startMenu.contains(e.target)){
            closeStartMenu();
        }
    }

    document.addEventListener("click", handleOutsideClick)
}

function createPowerOptions(startMenu){
    // Create div to hold power option buttons
    const btnContainers = document.createElement("div");
    btnContainers.id = "startMenuBtnContainers";
    startMenu.appendChild(btnContainers);

    // Shutdown btn
    const shutdownBtn = document.createElement("button");
    shutdownBtn.id = "shutdown";
    shutdownBtn.textContent = "Shut Down";
    btnContainers.appendChild(shutdownBtn);

    function shutdownSequence(){
        document.body.innerHTML = "";

        const icon = document.createElement("div");
        icon.id = "hcOSicon";
        icon.textContent = "hc!";
        document.body.appendChild(icon);

        const message = document.createElement("p");
        message.textContent = "Shutting down";
        message.className = "shutdownText";
        document.body.appendChild(message);

        setTimeout(() => {
            const sleepBg = document.createElement("div");
            sleepBg.id = "sleepBg";
            document.body.appendChild(sleepBg);
        }, 1000);
    }

    shutdownBtn.addEventListener("click", () => {
        closeStartMenu();
        showConfirmModal({
            title: "Confirm shutdown",
            confirmText: "Shutdown",
            onConfirm: shutdownSequence
        });
    });

    // Restart btn
    const restartBtn = document.createElement("button");
    restartBtn.id = "restart";
    restartBtn.textContent = "Restart";
    btnContainers.appendChild(restartBtn);

    function restartSequence() {
        document.body.innerHTML = "";

        const icon = document.createElement("div");
        icon.id = "hcOSicon";
        icon.textContent = "hc!";
        document.body.appendChild(icon);

        const message = document.createElement("p");
        message.textContent = "Restarting...";
        message.className = "shutdownText";
        document.body.appendChild(message);

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    restartBtn.addEventListener("click", () => {
        closeStartMenu();
        showConfirmModal({
            title: "Confirm restart",
            confirmText: "Restart",
            onConfirm: restartSequence
        });
    });

    // Sleep btn
    const sleepBtn = document.createElement("button");
    sleepBtn.id = "sleep";
    sleepBtn.textContent = "Sleep";
    btnContainers.appendChild(sleepBtn);
    sleepBtn.addEventListener("click", () => {
        const sleepBg = document.createElement("div");
        sleepBg.id = "sleepBg";
        document.body.appendChild(sleepBg);
        
        sleepBg.addEventListener("click", () => {
            sleepBg.remove();
        });
    });

    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logout";
    logoutBtn.textContent = "Logout";
    btnContainers.appendChild(logoutBtn);
    logoutBtn.addEventListener("click", () => {
        window.location.href = "../lockScreen";
    });
}

function showConfirmModal({
    title,
    confirmText,
    onConfirm
}) {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    
    overlay.innerHTML = `
        <h1>${title}</h1>
        <div class="confirmBtns">
            <button class="cancel">Cancel</button>
            <button class="confirm">${confirmText}</button>
        </div>
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => overlay.style.opacity = 1);

    overlay.querySelector(".cancel").onclick = () => {
        overlay.style.opacity = 0;
        setTimeout(() => overlay.remove(), 500);
    };

    overlay.querySelector(".confirm").onclick = () => {
        overlay.remove();
        onConfirm();
    }
}