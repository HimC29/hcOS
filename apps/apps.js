export const apps =

/*
=========== FORMAT ===========
    {
        id: "notepad", (make it a lowercase version of the name without any spaces)
        name: "Notepad", (just the name of your app)
        file: "../apps/notepad", (the link to your app)
        icon: "📝" (icon for your app (can be emoji or link to an image inside folders of apps))
    }
*/

[
    {
        id: "settings",
        name: "Settings",
        file: "../apps/settings",
        icon: `../apps/settings/icon.svg`
    },
    {
        id: "hcterminal",
        name: "hc!Terminal",
        file: "../apps/terminal",
        icon: "../apps/terminal/icon.svg"
    },
    {
        id: "calculator",
        name: "Calculator",
        file: "../apps/calculator",
        icon: "../apps/calculator/icon.svg"
    },
    {
        id: "hcbrowser",
        name: "hc!Browser",
        file: "../apps/hcbrowser",
        icon: "🪐"
    }
]