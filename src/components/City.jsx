import { useEffect, useRef, useState } from "react";
import { CircleFlag } from "react-circle-flags";

function City({ city, now }) {
    city = city || {};
    const [hour, setHour] = useState(null);
    const timeId = useRef(0);

    let countryCode = city.country_code.toLowerCase();

    function getHourString() {
        if (!now) return null; 

        // This doesn't observe timezone changes
        let hourNow = new Date(Date.now() + now.utcOffset * 1000);
        let hours = (hourNow.getUTCHours() + "").padStart(2, "0");
        let mins = (hourNow.getUTCMinutes() + "").padStart(2, "0");
        return `${hours}:${mins} ${now.timezone}`;
    }

    useEffect(() => {
        let nowDate = new Date();
        let nextMinute = (60 - nowDate.getSeconds()) * 1000 + (1000 - nowDate.getMilliseconds());

        setHour(getHourString());

        timeId.current = setTimeout(() => {
            setHour(getHourString());
            
            timeId.current = setInterval(() => {
                setHour(getHourString());
            }, 60000);
        }, nextMinute);

        return () => clearTimeout(timeId.current);
    }, [now]);

    return (
        <>
            <CircleFlag countryCode={countryCode} width="48" height="48"/>
            <div id="datos-ciudad">
                <p><b>{city.cityName || "Desconocido"}</b></p>
                <p>{hour || "Cargando..."}</p>
            </div>
        </>
    );
}

export default City;