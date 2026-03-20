import { convertWMOtoHuman, dateToHuman } from "../utils";

function Day({ day }) {
    return (
        <li>
            <p><b>{dateToHuman(day.time)}</b></p>
            <p><b>Cielo:</b> {convertWMOtoHuman(day.wmo_code) ?? "-"}</p>
            <p><b>Temperatura máx:</b> {day.temperature_2m_max ?? "-"}°C</p>
            <p><b>Temperatura mín:</b> {day.temperature_2m_min ?? "-"}°C</p>
            <p><b>Probabilidad:</b> {day.precpitation_probability_mean ?? "-"}%</p>
        </li>
    );
}

export default Day;