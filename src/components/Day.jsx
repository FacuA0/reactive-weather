import { convertWeatherToHuman, dateToHuman } from "../utils";

function Day({ day }) {
    console.log("Day", day);

    let maxMin = `${day.temperature_2m_max ?? "-"}°C/${day.temperature_2m_min ?? "-"}°C`;

    return (
        <div className="data-item">
            <p><b>{dateToHuman(day.time)}</b></p>
            <div className="day-icons">
                <img src="src/assets/icons/default.svg" width={48}/>
                <img src="src/assets/icons/default.svg" width={48}/>
            </div>
            <p>{maxMin}</p>
            <div className="data-rain">
                <img src="src/assets/icons/default.svg" width={16} alt="Probabildad de lluvia"/>
                <p>{day.precipitation_probability_mean ?? "-"}%</p>
            </div>
        </div>
    );
}

export default Day;