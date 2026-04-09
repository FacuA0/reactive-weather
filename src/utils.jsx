import { defaultIcon } from "./icons";

function convertWeatherToHuman(code) {
    if (code == 0) return "Despejado";
    if (code == 1) return "Mayormente despejado";
    if (code == 2) return "Parcialmente nublado";
    if (code == 3) return "Nublado";
    if (code == 45) return "Niebla";
    if (code == 48) return "Escarcha";
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
    let variant = isDay ? "day" : "night";

    function getIconUrl(name) {
        return new URL(`./assets/icons/${name}.svg`, import.meta.url).href;
    }

    if (code == 0) return getIconUrl(`w-clear-${variant}`);
    if (code == 1) return getIconUrl(`w-mostly-clear-${variant}`);
    if (code == 2) return getIconUrl(`w-partly-cloudy-${variant}`);
    if (code == 3) return getIconUrl(`w-cloudy-${variant}`);
    if (code == 45) return getIconUrl(`w-fog-${variant}`);
    if (code == 48) return getIconUrl(`w-rime-${variant}`);
    if (code == 51) return getIconUrl(`w-drizzle-light-${variant}`);
    if (code == 53) return getIconUrl(`w-drizzle-${variant}`);
    if (code == 55) return getIconUrl(`w-drizzle-heavy-${variant}`);
    if (code == 56) return getIconUrl(`w-freezing-drizzle-${variant}`);
    if (code == 57) return getIconUrl(`w-freezing-drizzle-heavy-${variant}`);
    if (code == 61) return getIconUrl(`w-rain-light-${variant}`);
    if (code == 63) return getIconUrl(`w-rain-${variant}`);
    if (code == 65) return getIconUrl(`w-rain-heavy-${variant}`);
    if (code == 66) return getIconUrl(`w-frezing-rain-${variant}`);
    if (code == 67) return getIconUrl(`w-frezing-rain-heavy-${variant}`);
    if (code == 71) return getIconUrl(`w-snow-light-${variant}`);
    if (code == 73) return getIconUrl(`w-snow-${variant}`);
    if (code == 75) return getIconUrl(`w-snow-heavy-${variant}`);
    if (code == 77) return getIconUrl(`w-snow-grains-${variant}`);
    if (code == 80) return getIconUrl(`w-rain-showers-light-${variant}`);
    if (code == 81) return getIconUrl(`w-rain-showers-${variant}`);
    if (code == 82) return getIconUrl(`w-rain-showers-heavy-${variant}`);
    if (code == 85) return getIconUrl(`w-snow-showers-${variant}`);
    if (code == 86) return getIconUrl(`w-snow-showers-heavy-${variant}`);
    if (code == 95) return getIconUrl(`w-storm-${variant}`);
    if (code == 96) return getIconUrl(`w-storm-hail-${variant}`);
    if (code == 99) return getIconUrl(`w-storm-hail-heavy-${variant}`);
    return defaultIcon;
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

function calculateDayNightWeatherCodes(days, hours) {
    let maxCode = 0, maxCodeAllowed = 0;
    let i = 0;

    // Skip first night hours of first day
    while (!hours[i].is_day) {
        i++;
    }
    
    for (let dayI = 0; dayI < days.length; dayI++) {
        maxCode = 0;
        
        // Day hours
        for (; i < hours.length && hours[i].is_day; i++) {
            let code = hours[i].weather_code;
            if (code > maxCodeAllowed) {
                maxCode = maxCodeAllowed;
                maxCodeAllowed = code;
            }
            else {
                maxCode = Math.max(maxCode, code);
            }
        }
        
        days[dayI].weather_day_code = maxCode;
        maxCode = 0;
        maxCodeAllowed = 0;
        
        // Night hours
        for (; i < hours.length && !hours[i].is_day; i++) {
            let code = hours[i].weather_code;
            if (code > maxCodeAllowed) {
                maxCode = maxCodeAllowed;
                maxCodeAllowed = code;
            }
            else {
                maxCode = Math.max(maxCode, code);
            }
        }
        
        days[dayI].weather_night_code = maxCode;
    }
}

export {
    convertWeatherToHuman,
    convertWeatherToIcon,
    dateToHuman,
    deduplicateCityNames,
    calculateDayNightWeatherCodes
};