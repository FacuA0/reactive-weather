function convertWeathertoHuman(code) {
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
    if (code == 65) return "LLuvia fuerte";
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
    return code;
}

function dateToHuman(date) {
    return new Intl.DateTimeFormat("es-AR", {month: "long", day: "numeric"}).format(new Date(date));
}

export {
    convertWeathertoHuman,
    dateToHuman
};