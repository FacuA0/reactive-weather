import { convertWMOtoHuman } from "../utils";

function Now({ now }) {
    console.log(now);

    return (
        <>
            <p><b>Cielo:</b> {convertWMOtoHuman(now.wmo_code) ?? "-"}</p>
            <p><b>Temperatura:</b> {now.temperature_2m ?? "-"}°C</p>
            <p><b>Sensación térmica:</b> {now.apparent_temperature ?? "-"}°C</p>
            <p><b>Probabilidad de lluvia:</b> {now.precipitation_probability ?? "-"}%</p>
            <p><b>Precipitaciones:</b> {now.precipitation ?? "-"}mm</p>
            <p><b>Humedad:</b> {now.relative_humidity_2m ?? "-"}%</p>
        </>
    );
}

export default Now;