import { convertWeatherToHuman } from "../utils";

function Hour({ hour }) {
    //console.log("Hour", hour);

    return (
        <div className="data-item"> 
            <p><b>{hour.time.substring(hour.time.indexOf("T") + 1)}</b></p>
            <img src="src/assets/icons/w-mostly-clear-day.svg" width={56} alt="Probabildad de lluvia"/>
            <p className="hour-temp">{hour.temperature_2m ?? "-"}°C</p>
            <div className="data-rain">
                <img src="src/assets/icons/default.svg" width={16} alt="Probabildad de lluvia"/>
                <p>{hour.precipitation_probability ?? "-"}%</p>
            </div>
        </div>
    );
}

export default Hour;