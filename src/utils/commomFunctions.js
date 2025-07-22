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

export const numberToWords = (num) => {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
                   "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousands = ["", "Thousand", "Lakh", "Crore"];

    function convert_hundred(n) {
        let word = "";
        if (n > 99) {
            word += ones[Math.floor(n / 100)] + " Hundred ";
            n %= 100;
        }
        if (n > 19) {
            word += tens[Math.floor(n / 10)] + " ";
            n %= 10;
        } else if (n >= 10) {
            word += teens[n - 10] + " ";
            n = 0;
        }
        if (n > 0) word += ones[n] + " ";
        return word.trim();
    }

    function convert_whole(n) {
        if (n === 0) return "Zero";
        let res = "";
        const parts = [];

        parts.push(n % 1000); n = Math.floor(n / 1000); // Hundreds
        parts.push(n % 100);  n = Math.floor(n / 100);  // Thousands
        parts.push(n % 100);  n = Math.floor(n / 100);  // Lakhs
        parts.push(n);                                 // Crores

        for (let i = parts.length - 1; i >= 0; i--) {
            if (parts[i] !== 0) {
                res += convert_hundred(parts[i]) + " " + (thousands[i] ? thousands[i] + " " : "");
            }
        }

        return res.trim();
    }

    const parts = num.split(".");
    const whole = parseInt(parts[0], 10);
    const fraction = parseInt(parts[1], 10);

    let wholeWord = convert_whole(whole);
    let result = wholeWord;

    if (fraction > 0) {
        const paisaWord = convert_whole(fraction);
        result += " Rupees and " + paisaWord + " Paise";
    } else {
        result += " Rupees";
    }

    return result;
}


