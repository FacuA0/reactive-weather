import { CircleFlag } from "react-circle-flags";

function City({ city, now }) {
    city = city || {};

    let countryCode = city.country_code.toLowerCase();
    let hourString = "Cargando...";

    if (now) {
        let hourNow = new Date(Date.now() + now.utcOffset * 1000);
        let hours = hourNow.getUTCHours() + "";
        let mins = hourNow.getUTCMinutes() + "";
        hours = hours.length == 1 ? "0" + hours : hours;
        mins = mins.length == 1 ? "0" + mins : mins;
        hourString = `${hours}:${mins} ${now.timezone}`;
    }

    return (
        <>
            <CircleFlag countryCode={countryCode} width="48" height="48"/>
            <div id="datos-ciudad">
                <p>{city.cityName || "Desconocido"}</p>
                <p>{hourString}</p>
            </div>
        </>
    );
}

export default City;