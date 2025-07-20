export const getTimestamp = () => {
    const now = new Date();

    const weekday = now.toLocaleDateString("en-US", {
        weekday: "long"
    });

    let date = now.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
    let parts = date.split(', ');
    date = `${parts[0].split(' ')[1]} ${parts[0].split(' ')[0]}, ${parts[1]}`;

    const time = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return `${weekday}, ${date}, ${time}`
};
