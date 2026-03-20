import { convertWeathertoHuman } from "../utils";

function Hour({ hour }) {
    console.log("Hour");
    console.log(hour);

    return (
        <li>
            <p><b>{hour.time}</b></p>
            <p><b>Cielo:</b> {convertWeathertoHuman(hour.weather_code) ?? "-"}</p>
            <p><b>Temperatura:</b> {hour.temperature_2m ?? "-"}°C</p>
            <p><b>Probabilidad:</b> {hour.precipitation_probability ?? "-"}%</p>
        </li>
    );
}

export default Hour;