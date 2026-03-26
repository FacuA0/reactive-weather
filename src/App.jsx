import { useState } from 'react';
import CitySearch from './components/CitySearch';
import City from './components/City';
import Now from './components/Now';
import Day from './components/Day';
import Hour from './components/Hour';
import { convertWeatherToIcon, convertWeatherToHuman } from './utils';
import './App.css';

function App() {
    const [city, setCity] = useState(null);
    const [now, setNow] = useState(null);
    const [hourly, setHourly] = useState([]);
    const [daily, setDaily] = useState([]);

    async function setNewCity(city) {
        if (!city) {
            alert("No se encontró esta ciudad.");
            return;
        }

        setCity(city);

        const currentQuery = "current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,apparent_temperature,precipitation_probability,is_day";
        const hourlyQuery = "hourly=temperature_2m,weather_code,precipitation_probability,is_day";
        const dailyQuery = "daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_mean";
        const locationQuery = `latitude=${city.latitude}&longitude=${city.longitude}`;
        
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?${locationQuery}&${dailyQuery}&${hourlyQuery}&${currentQuery}&timezone=auto`);
        let data = await res.json();

        data.current.timezone = data.timezone_abbreviation;
        data.current.utcOffset = data.utc_offset_seconds;

        setNow(data.current);

        let newDaily = [];
        for (let i = 0; i < data.daily.time.length; i++) {
            let obj = {};

            for (let prop in data.daily) {
                obj[prop] = data.daily[prop][i];
            }

            newDaily.push(obj);
        }

        data.current.temperatureMax = newDaily[0].temperature_2m_max;
        data.current.temperatureMin = newDaily[0].temperature_2m_min;

        setDaily(newDaily);

        let newHourly = [];
        for (let i = 0; i < data.hourly.time.length; i++) {
            let obj = {};

            for (let prop in data.hourly) {
                obj[prop] = data.hourly[prop][i];
            }

            newHourly.push(obj);
        }

        let timeNow = new Date().getTime();
        while (new Date(newHourly[1].time).getTime() < timeNow) {
            newHourly.shift();
        }

        newHourly.length = 12;

        setHourly(newHourly);
    }

    let icon = "src/assets/icons/w-clear-day.svg", iconDesc = "Esperando...";
    if (now) {
        icon = convertWeatherToIcon(now.weather_code, now.is_day);
        iconDesc = convertWeatherToHuman(now.weather_code, now.is_day);
    }

    const dayList = daily.map(day => (
        <Day key={"day-" + day.time} day={day}/>
    ));

    const hourList = hourly.map(hour => (
        <Hour key={"hour-" + hour.time} hour={hour}/>
    ));

    const searchPage = (
        <main className="search">
            <img id="logo" src="src/assets/icons/logo.svg"/>
            <p>Busca la ciudad que quieras, y obtén datos del clima en segundos.</p>
            <CitySearch setCity={setNewCity} />
        </main>
    );

    const weatherPage = (
        <div className="weather">
            <header>
                <button onClick={() => setCity(null)}>Volver</button>
                <img id="logo" src="src/assets/icons/logo.svg" height="96"/>
                <div className="filler"></div>

                <City city={city} now={now} />
            </header>

            <img id="sky-icon" src={icon} alt={iconDesc} title={iconDesc}/>

            <main>
                <div id="data-current">
                    <Now now={now} />
                </div>

                <div id="data-hours">
                    <h2>Datos por hora</h2>
                    <div className="data-items">
                        {hourList}
                    </div>
                </div>

                <div id="data-days">
                    <h2>Datos por día</h2>
                    <div className="data-items">
                        {dayList}
                    </div>
                </div>
            </main>
        </div>
    );

    return !city ? searchPage : weatherPage;
}

export default App
