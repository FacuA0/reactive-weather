function Hour({ hour }) {
    return (
        <li>
            <p><b>{hour.time}</b></p>
            <p><b>Cielo:</b> {hour.wmo_code || "-"}</p>
            <p><b>Temperatura:</b> {hour.temperature_2m || "-"}°C</p>
            <p><b>Probabilidad:</b> {hour.precipitation_probability || "-"}%</p>
        </li>
    );
}

export default Hour;