export function getTime(now = new Date()) {
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const meridiem = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    return `${hours}:${minutes}:${seconds} ${meridiem}`;
}

export function getDate(now = new Date()) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    return `${day} ${month} ${year}`;
}
