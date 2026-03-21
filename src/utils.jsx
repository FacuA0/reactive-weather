function convertWeatherToHuman(code) {
    if (code == 0) return "Despejado";
    if (code == 1) return "Parcialmente despejado";
    if (code == 2) return "Parcialmente nublado";
    if (code == 3) return "Nublado";
    if (code == 45) return "Niebla";
    if (code == 48) return "Depósito de escarcha";
    if (code == 51) return "Llovizna ligera";
    if (code == 53) return "Llovizna";
    if (code == 55) return "Llovizna fuerte";
    if (code == 56) return "Llovizna congelada";
    if (code == 57) return "Llovizna congelada fuerte";
    if (code == 61) return "Lluvia ligera";
    if (code == 63) return "Lluvia";
    if (code == 65) return "Lluvia fuerte";
    if (code == 66) return "Lluvia congelada";
    if (code == 67) return "Lluvia congelada fuerte";
    if (code == 71) return "Nevada ligera";
    if (code == 73) return "Nevada";
    if (code == 75) return "Nevada fuerte";
    if (code == 77) return "Granos de nieve";
    if (code == 80) return "Chubascos ligeros";
    if (code == 81) return "Chubascos";
    if (code == 82) return "Chubascos fuertes";
    if (code == 85) return "Chubascos de nieve";
    if (code == 86) return "Chubascos de nieve fuertes";
    if (code == 95) return "Tormenta ligera o moderada";
    if (code == 96) return "Tormenta con granizo";
    if (code == 99) return "Tormenta con granizo fuerte";
    return `Otro (${code})`;
}

function dateToHuman(date) {
    return new Intl.DateTimeFormat(undefined, {
        month: "long", 
        day: "numeric", 
        weekday: "long"
    }).format(new Date(date));
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
    dateToHuman,
    deduplicateCityNames
};