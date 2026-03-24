import { convertWeatherToHuman, dateToHuman } from "../utils";

function Day({ day }) {
    console.log("Day", day);

    let maxMin = `${day.temperature_2m_max ?? "-"}°C / ${day.temperature_2m_min ?? "-"}°C`;
    let date = dateToHuman(day.time);

    return (
        <div className="data-item">
            <p><b>{date[0]}<br/>{date[1]}</b></p>
            <div className="day-icons">
                <img src="src/assets/icons/w-clear-day.svg" width={56}/>
                <img src="src/assets/icons/w-clear-day.svg" width={56}/>
            </div>
            <p className="day-temp">{maxMin}</p>
            <div className="data-rain">
                <img src="src/assets/icons/default.svg" width={16} alt="Probabildad de lluvia"/>
                <p>{day.precipitation_probability_mean ?? "-"}%</p>
            </div>
        </div>
    );
}

export default Day;