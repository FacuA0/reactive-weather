import { convertWeatherToHuman, convertWeatherToIcon } from "../utils";

function Hour({ hour }) {
    //console.log("Hour", hour);

    let icon = convertWeatherToIcon(hour.weather_code);
    let iconDesc = convertWeatherToHuman(hour.weather_code);

    return (
        <div className="data-item"> 
            <p><b>{hour.time.substring(hour.time.indexOf("T") + 1)}</b></p>
            <img src={icon} width={56} alt={iconDesc} title={iconDesc}/>
            <p className="hour-temp">{hour.temperature_2m ?? "-"}°C</p>
            <div className="data-rain">
                <img src="src/assets/icons/default.svg" width={16} alt="Probabildad de lluvia"/>
                <p>{hour.precipitation_probability ?? "-"}%</p>
            </div>
        </div>
    );
}

export default Hour;