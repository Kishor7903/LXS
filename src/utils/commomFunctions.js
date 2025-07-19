

export const getTimestamp = () => {
    let timestamp = new Date().toLocaleString("en-US", {
        weekday: "long",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    })
    return timestamp
}