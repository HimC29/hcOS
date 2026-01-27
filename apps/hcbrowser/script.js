const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(searchForm);
    let userInput = formData.get("searchbar");

    if(isValidUrl(userInput)){
        window.open(userInput);
    }
    else{
        window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`);
    }

});

function isValidUrl(url) {
    try {
        const u = new URL(url);
        if (!["http:", "https:"].includes(u.protocol)) return false;

        const host = u.hostname;
        // must contain a dot, e.g., google.com
        if (!host.includes(".")) return false;

        // optional: simple TLD check
        const tld = host.split(".").pop();
        if (tld.length < 2 || tld.length > 6) return false;

        return true;
    } catch {
        return false;
    }
}