import { convertWeatherToHuman, convertWeatherToIcon, dateToHuman } from "../utils";

function Day({ day }) {
    //console.log("Day", day);

    let maxMin = `${day.temperature_2m_max ?? "-"}°C / ${day.temperature_2m_min ?? "-"}°C`;
    let date = dateToHuman(day.time);
    let dayIcon = convertWeatherToIcon(day.weather_day_code, true);
    let dayDesc = convertWeatherToHuman(day.weather_day_code);
    let nightIcon = convertWeatherToIcon(day.weather_night_code, false);
    let nightDesc = convertWeatherToHuman(day.weather_night_code);

    return (
        <div className="data-item">
            <p><b>{date[0]}<br/>{date[1]}</b></p>
            <div className="day-icons">
                <img src={dayIcon} alt={dayDesc} title={dayDesc} width={56}/>
                <img src={nightIcon} alt={nightDesc} title={nightDesc} width={56}/>
            </div>
            <p className="day-temp">{maxMin}</p>
            <div className="data-rain">
                <img src="src/assets/icons/w-rain-day.svg" width={16} alt="Probabildad de lluvia"/>
                <p>{day.precipitation_probability_mean ?? "-"}%</p>
            </div>
        </div>
    );
}

export default Day;