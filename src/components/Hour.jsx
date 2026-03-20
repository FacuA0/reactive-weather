import { convertWMOtoHuman } from "../utils";

function Hour({ hour }) {
    console.log(hour);

    return (
        <li>
            <p><b>{hour.time}</b></p>
            <p><b>Cielo:</b> {convertWMOtoHuman(hour.wmo_code) ?? "-"}</p>
            <p><b>Temperatura:</b> {hour.temperature_2m ?? "-"}°C</p>
            <p><b>Probabilidad:</b> {hour.precipitation_probability ?? "-"}%</p>
        </li>
    );
}

export default Hour;