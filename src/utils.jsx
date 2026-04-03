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
    let base = "src/assets/icons/";
    let variant = isDay ? "day" : "night";

    if (code == 0) return base + `w-clear-${variant}.svg`;
    if (code == 1) return base + `w-mostly-clear-${variant}.svg`;
    if (code == 2) return base + `w-partly-cloudy-${variant}.svg`;
    if (code == 3) return base + `w-cloudy-${variant}.svg`;
    if (code == 45) return base + `w-fog-${variant}.svg`;
    if (code == 48) return base + `w-rime-${variant}.svg`;
    if (code == 51) return base + `w-drizzle-light-${variant}.svg`;
    if (code == 53) return base + `w-drizzle-${variant}.svg`;
    if (code == 55) return base + `w-drizzle-heavy-${variant}.svg`;
    if (code == 56) return base + `w-freezing-drizzle-${variant}.svg`;
    if (code == 57) return base + `w-freezing-drizzle-heavy-${variant}.svg`;
    if (code == 61) return base + `w-rain-light-${variant}.svg`;
    if (code == 63) return base + `w-rain-${variant}.svg`;
    if (code == 65) return base + `w-rain-heavy-${variant}.svg`;
    if (code == 66) return base + `w-frezing-rain-${variant}.svg`;
    if (code == 67) return base + `w-frezing-rain-heavy-${variant}.svg`;
    if (code == 71) return base + `w-snow-light-${variant}.svg`;
    if (code == 73) return base + `w-snow-${variant}.svg`;
    if (code == 75) return base + `w-snow-heavy-${variant}.svg`;
    if (code == 77) return base + `w-snow-grains-${variant}.svg`;
    if (code == 80) return base + `w-rain-showers-light-${variant}.svg`;
    if (code == 81) return base + `w-rain-showers-${variant}.svg`;
    if (code == 82) return base + `w-rain-showers-heavy-${variant}.svg`;
    if (code == 85) return base + `w-snow-showers-${variant}.svg`;
    if (code == 86) return base + `w-snow-showers-heavy-${variant}.svg`;
    if (code == 95) return base + `w-storm-${variant}.svg`;
    if (code == 96) return base + `w-storm-hail-${variant}.svg`;
    if (code == 99) return base + `w-storm-hail-heavy-${variant}.svg`;
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