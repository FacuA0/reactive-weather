import { convertWeathertoHuman, dateToHuman } from "../utils";

function Day({ day }) {
    console.log("Day");
    console.log(day);

    return (
        <li>
            <p><b>{dateToHuman(day.time)}</b></p>
            <p><b>Cielo:</b> {convertWeathertoHuman(day.weather_code) ?? "-"}</p>
            <p><b>Temperatura máx:</b> {day.temperature_2m_max ?? "-"}°C</p>
            <p><b>Temperatura mín:</b> {day.temperature_2m_min ?? "-"}°C</p>
            <p><b>Probabilidad:</b> {day.precipitation_probability_mean ?? "-"}%</p>
        </li>
    );
}

export default Day;