function convertWeatherToHuman(code) {
    if (code == 0) return "Despejado";
    if (code == 1) return "Mayormente despejado";
    if (code == 2) return "Parcialmente nublado";
    if (code == 3) return "Nublado";
    if (code == 45) return "Niebla";
    if (code == 48) return "Depósito de escarcha";
    if (code == 51) return "Llovizna débil";
    if (code == 53) return "Llovizna";
    if (code == 55) return "Llovizna fuerte";
    if (code == 56) return "Llovizna congelada";
    if (code == 57) return "Llovizna congelada fuerte";
    if (code == 61) return "Lluvia débil";
    if (code == 63) return "Lluvia";
    if (code == 65) return "Lluvia fuerte";
    if (code == 66) return "Lluvia congelada";
    if (code == 67) return "Lluvia congelada fuerte";
    if (code == 71) return "Nevada débil";
    if (code == 73) return "Nevada";
    if (code == 75) return "Nevada fuerte";
    if (code == 77) return "Granos de nieve";
    if (code == 80) return "Chubascos débiles";
    if (code == 81) return "Chubascos";
    if (code == 82) return "Chubascos fuertes";
    if (code == 85) return "Chubascos de nieve";
    if (code == 86) return "Chubascos de nieve fuertes";
    if (code == 95) return "Tormenta débil o moderada";
    if (code == 96) return "Tormenta con granizo";
    if (code == 99) return "Tormenta con granizo fuerte";
    return `Otro (${code})`;
}

function convertWeatherToIcon(code, isDay = 1) {
    let base = "src/assets/icons/";
    let variant = isDay ? "day" : "night";

    if (code == 0) return base + `w-clear-${variant}.svg`;
    if (code == 1) return base + `w-mostly-clear-${variant}.svg`;
    if (code == 2) return base + `w-party-cloudy-${variant}.svg`;
    if (code == 3) return base + `w-cloudy-${variant}.svg`;
    if (code == 45) return base + "default.svg";
    if (code == 48) return base + "default.svg";
    if (code == 51) return base + "default.svg";
    if (code == 53) return base + "default.svg";
    if (code == 55) return base + "default.svg";
    if (code == 56) return base + "default.svg";
    if (code == 57) return base + "default.svg";
    if (code == 61) return base + "default.svg";
    if (code == 63) return base + "default.svg";
    if (code == 65) return base + "default.svg";
    if (code == 66) return base + "default.svg";
    if (code == 67) return base + "default.svg";
    if (code == 71) return base + "default.svg";
    if (code == 73) return base + "default.svg";
    if (code == 75) return base + "default.svg";
    if (code == 77) return base + "default.svg";
    if (code == 80) return base + "default.svg";
    if (code == 81) return base + "default.svg";
    if (code == 82) return base + "default.svg";
    if (code == 85) return base + "default.svg";
    if (code == 86) return base + "default.svg";
    if (code == 95) return base + "default.svg";
    if (code == 96) return base + "default.svg";
    if (code == 99) return base + "default.svg";
    return base + "default.svg";
}

function dateToHuman(date) {
    date = new Date(date);

    let weekDay = new Intl.DateTimeFormat(undefined, {
        weekday: "long"
    }).format(date);

    let day = new Intl.DateTimeFormat(undefined, {
        month: "short", 
        day: "numeric",
    }).format(date);

    return [weekDay, day];
}

function deduplicateCityNames(cities) {
    let dupNames = {};
    for (let {name, country} of cities) {
        let cityName = `${name}, ${country}`;
        dupNames[cityName] = cityName in dupNames;
    }

    for (let city of cities) {
        let name = `${city.name}, ${city.country}`;
        if (dupNames[name]) {
            name = `${city.name}, ${city.admin1 ?? city.admin2 ?? city.admin3 ?? city.admin4}, ${city.country}`;
        }

        city.cityName = name;
    }
}

export {
    convertWeatherToHuman,
    convertWeatherToIcon,
    dateToHuman,
    deduplicateCityNames
};