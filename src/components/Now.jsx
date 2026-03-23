import { convertWeatherToHuman } from "../utils";

function Now({ now }) {
    console.log("Now", now);

    now = now || {};

    return (
        <>
            <h2>{convertWeatherToHuman(now.weather_code) ?? "-"}</h2>
            <div className="current-column">
                <p><b>Temperatura:</b> {now.temperature_2m ?? "-"}°C</p>
                <p><b>Sensación térmica:</b> {now.apparent_temperature ?? "-"}°C</p>
                <p><b>Máx/mín: </b> {now.apparent_temperature ?? "-"}°C</p>
            </div>
            <div className="current-column">
                <p><b>Probabilidad de lluvia:</b> {now.precipitation_probability ?? "-"}%</p>
                <p><b>Precipitaciones:</b> {now.precipitation ?? "-"}mm</p>
                <p><b>Humedad:</b> {now.relative_humidity_2m ?? "-"}%</p>
            </div>
        </>
    );
}

export default Now;