// Keeps track of currently opened apps
// key = app.id, value = Set of window elements
const openAppsList = {
    openApps: new Map()
};

// Opens an app window
export function openApp(app){
    // Taskbar icon for this app
    const selectedTbIcon = document.getElementById(app.id);

    // If app is already open, toggle visibility instead of creating a new window
    if(openAppsList.openApps.has(app.id)){
        const existingWindow = document.body.querySelector(`#${app.id}Window`);
        if(existingWindow.classList.contains("invisible")){
            showWindow(existingWindow, selectedTbIcon);
        } else {
            // Minimize it
            minimizeWindow(existingWindow, selectedTbIcon);
        }
        return;
    }

    // Create main app window
    const appWindow = document.createElement("div");
    appWindow.id = `${app.id}Window`;
    appWindow.classList.add("visible");
    appWindow.classList.add("appWindow");
    document.body.appendChild(appWindow);
    appWindow.isMaximized = false;

    // Resize handle (bottom-right corner)
    const resizeHandle = document.createElement("div");
    resizeHandle.classList.add("resizeHandle");
    appWindow.appendChild(resizeHandle);

    // Register app as opened
    if(!openAppsList.openApps.has(app.id)){
        openAppsList.openApps.set(app.id, new Set());
    }
    openAppsList.openApps.get(app.id).add(appWindow);

    // Update taskbar icon state
    selectedTbIcon.classList.add("visibleWindowTaskbar");
    selectedTbIcon.classList.remove("invisibleWindowTaskbar");
    selectedTbIcon.classList.remove("closedWindowTaskbar");

    // Title bar
    const titleBar = document.createElement("div");
    titleBar.classList.add("titleBar");
    appWindow.appendChild(titleBar);

    // App title text
    const title = document.createElement("p");
    title.id = "title";
    title.textContent = app.name;
    titleBar.appendChild(title);

    // Container for title bar buttons
    const titleBarBtnContainer = document.createElement("div");
    titleBarBtnContainer.classList.add("titleBarBtnContainer");
    titleBar.appendChild(titleBarBtnContainer);

    // Minimize button
    const minimizeBtn = document.createElement("button");
    minimizeBtn.id = "minimizeBtn";
    minimizeBtn.classList.add("titleBarBtn");
    minimizeBtn.textContent = "-";
    titleBarBtnContainer.appendChild(minimizeBtn);
    minimizeBtn.addEventListener("click", () => {
        minimizeWindow(appWindow, selectedTbIcon);
    });

    // Maximize button
    const maximizeBtn = document.createElement("button");
    maximizeBtn.id = "maximizeBtn";
    maximizeBtn.classList.add("titleBarBtn");
    maximizeBtn.textContent = "□";
    titleBarBtnContainer.appendChild(maximizeBtn);
    maximizeBtn.addEventListener("click", () => {
        maximizeWindow(appWindow);
    });
    
    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.id = "closeBtn";
    closeBtn.classList.add("titleBarBtn");
    closeBtn.textContent = "×";
    titleBarBtnContainer.appendChild(closeBtn);

    closeBtn.addEventListener("click", () => {
        appWindow.remove();

        // Remove window from open apps list
        openAppsList.openApps.get(app.id).delete(appWindow);

        // If no more windows for this app, clean up
        if(openAppsList.openApps.get(app.id).size === 0){
            openAppsList.openApps.delete(app.id);
            selectedTbIcon.classList.add("closedWindowTaskbar");
            selectedTbIcon.classList.remove("visibleWindowTaskbar");
            selectedTbIcon.classList.remove("invisibleWindowTaskbar");
        }
    });

    // App iframe content
    const iframe = document.createElement("iframe");
    iframe.classList.add("iframe");
    iframe.src = app.file;
    appWindow.appendChild(iframe);

    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    // Enable dragging and resizing
    draggableWindow(appWindow, titleBar);
    resizeableWindow(appWindow, resizeHandle);
}
function minimizeWindow(appWindow, selectedTbIcon){
    appWindow.style.display = "none";
    selectedTbIcon.classList.add("invisibleWindowTaskbar");
    selectedTbIcon.classList.remove("visibleWindowTaskbar");
    appWindow.classList.remove("visible");
    appWindow.classList.add("invisible");
}
function maximizeWindow(appWindow){
    if(appWindow.isMaximized == false){
        // Save current position/size before maximizing
        appWindow.savedTop = appWindow.style.top;
        appWindow.savedLeft = appWindow.style.left;
        appWindow.savedHeight = appWindow.style.height;
        appWindow.savedWidth = appWindow.style.width;

        appWindow.style.width = "100vw";
        appWindow.style.height = "100vh";
        appWindow.style.top = "0";
        appWindow.style.left = "0";
        appWindow.isMaximized = true;
    }
    else{
        appWindow.style.top = appWindow.savedTop;
        appWindow.style.left = appWindow.savedLeft;
        appWindow.style.height = appWindow.savedHeight;
        appWindow.style.width = appWindow.savedWidth;
        appWindow.isMaximized = false;
    }
}
function showWindow(appWindow, selectedTbIcon){
    // Show the window
    appWindow.style.display = "flex";
    selectedTbIcon.classList.add("visibleWindowTaskbar");
    selectedTbIcon.classList.remove("invisibleWindowTaskbar");
    selectedTbIcon.classList.remove("closedWindowTaskbar");
    appWindow.classList.add("visible");
    appWindow.classList.remove("invisible");
}

// Handles dragging the window by the title bar
function draggableWindow(windowEl, handleEl){
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let shield = null;

    function detectTitleBarPress(e){
        // Ignore clicks on title bar buttons
        if(e.target.closest(".titleBarBtn")) return;

        // Only prevent default for drag actions, not button clicks
        if(e.touches) e.preventDefault();

        isDragging = true;

        // Calculate mouse offset inside window
        const rect = windowEl.getBoundingClientRect();
        if(e.touches && e.touches[0]){
            offsetX = e.touches[0].clientX - rect.left;
            offsetY = e.touches[0].clientY - rect.top;
        }
        else{
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
        }

        // Shield prevents iframe stealing mouse events
        shield = document.createElement("div");
        shield.className = "dragShield";
        document.body.appendChild(shield);

        document.body.style.userSelect = "none";
    }

    handleEl.addEventListener("mousedown", (e) => {
        detectTitleBarPress(e);
    });
    handleEl.addEventListener("touchstart", (e) => {
        detectTitleBarPress(e);
    }, { passive: false });

    function detectDrag(e){
        if(!isDragging) return;

        if(windowEl.isMaximized){
            windowEl.isMaximized = false;
            windowEl.style.width = windowEl.savedWidth;
            windowEl.style.height = windowEl.savedHeight;
            // Reset offsets after unmaximizing so window follows cursor from this point
            offsetX = 0;
            offsetY = 0;
        }

        let top;
        let left;
        if(e.touches && e.touches[0]){
            top = e.touches[0].clientY - offsetY;
            left = `${e.touches[0].clientX - offsetX}px`
        }
        else{
            top = e.clientY - offsetY;
            left = `${e.clientX - offsetX}px`
        }
        top = Math.max(top, 0) + "px";

        windowEl.style.top = top;
        windowEl.style.left = left;

        windowEl.top = top;
        windowEl.left = left;
    }

    document.addEventListener("mousemove", (e) => {
        detectDrag(e);
    });
    document.addEventListener("touchmove", (e) => {
        if(isDragging) e.preventDefault();
        detectDrag(e);
    }, { passive: false });

    function detectTitleBarRelease(e){
        if(!isDragging) return;

        isDragging = false;
        shield?.remove();
        shield = null;

        document.body.style.userSelect = "";
    }

    document.addEventListener("mouseup", (e) => {
        detectTitleBarRelease(e);
    });
    document.addEventListener("touchend", (e) => {
        detectTitleBarRelease(e);
    }, { passive: false });
}

// Handles resizing the window using the resize handle
function resizeableWindow(windowEl, handleEl){
    let isResizing = false;
    let startX, startY;
    let startWidth, startHeight;
    let shield;

    function detectResizeElPress(e){
        e.preventDefault();
        e.stopPropagation();

        isResizing = true;

        // Save starting mouse and window size
        const rect = windowEl.getBoundingClientRect();
        if(e.touches && e.touches[0]){
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
        else{
            startX = e.clientX;
            startY = e.clientY;
        }
        startWidth = rect.width;
        startHeight = rect.height;

        // Shield prevents iframe mouse capture
        shield = document.createElement("div");
        shield.className = "resizeShield";
        document.body.appendChild(shield);

        document.body.style.userSelect = "none";
    }

    handleEl.addEventListener("mousedown", (e) => {
        detectResizeElPress(e);
    });
    handleEl.addEventListener("touchstart", (e) => {
        detectResizeElPress(e);
    }, { passive: false });

    function detectResizing(e){
        if(!isResizing) return;

        let clientX = e.clientX;
        let clientY = e.clientY;
        
        if(e.touches && e.touches[0]){
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        let width = startWidth + (clientX - startX);
        width = Math.max(width, 200) + "px"

        let height = startHeight + (clientY - startY);
        height = Math.max(height, 175) + "px";

        // Enforce minimum size
        windowEl.style.width = width;
        windowEl.style.height = height;

        windowEl.height = height;
        windowEl.width = width;
    }

    document.addEventListener("mousemove", (e) => {
        detectResizing(e);
    });
    document.addEventListener("touchmove", (e) => {
        if(isDragging) e.preventDefault();
        detectResizing(e);
    }, { passive: false });

    function detectResizeElRelease(){
        if(!isResizing) return;

        isResizing = false;
        shield.remove();
        shield = null;

        document.body.style.userSelect = "";
    }

    document.addEventListener("mouseup", () => {
        detectResizeElRelease();
    });
    document.addEventListener("touchend", () => {
        detectResizeElRelease();
    });
}