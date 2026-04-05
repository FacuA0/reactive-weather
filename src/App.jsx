import { useRef, useState } from 'react';
import CitySearch from './components/CitySearch';
import Location from './components/Location';
import City from './components/City';
import Now from './components/Now';
import Day from './components/Day';
import Hour from './components/Hour';
import { 
    convertWeatherToIcon, 
    convertWeatherToHuman,
    calculateDayNightWeatherCodes 
} from './utils';
import './App.css';

function App() {
    const [city, setCity] = useState(null);
    const [now, setNow] = useState(null);
    const [hourly, setHourly] = useState([]);
    const [daily, setDaily] = useState([]);
    const body = useRef(document.querySelector("body"));

    async function setNewCity(city) {
        if (!city) {
            alert("No se encontró esta ciudad.");
            return;
        }

        setCity(city);

        const currentQuery = "current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,apparent_temperature,is_day";
        const hourlyQuery = "hourly=temperature_2m,weather_code,precipitation_probability,is_day";
        const dailyQuery = "daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_mean";
        const locationQuery = `latitude=${city.latitude}&longitude=${city.longitude}`;
        
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?${locationQuery}&${dailyQuery}&${hourlyQuery}&${currentQuery}&timezone=auto`);
        let data = await res.json();

        data.current.timezone = data.timezone_abbreviation;
        data.current.utcOffset = data.utc_offset_seconds;

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
        data.current.precipitationProbability = newDaily[0].precipitation_probability_mean;

        setNow(data.current);

        let newHourly = [];
        for (let i = 0; i < data.hourly.time.length; i++) {
            let obj = {};

            for (let prop in data.hourly) {
                obj[prop] = data.hourly[prop][i];
            }

            newHourly.push(obj);
        }

        calculateDayNightWeatherCodes(newDaily, newHourly);

        setDaily(newDaily);

        let timeNow = new Date().getTime();
        while (new Date(newHourly[1].time).getTime() < timeNow) {
            newHourly.shift();
        }

        newHourly.length = 24;

        setHourly(newHourly);
    }

    function listScrolled(evt) {
        let elem = evt.target;
        elem.classList.toggle("scroll-s", elem.scrollLeft > 0);
        elem.classList.toggle("scroll-e", elem.scrollLeft < elem.scrollWidth - elem.clientWidth);
    }

    let icon = "src/assets/icons/w-clear-day.svg", iconDesc = "Esperando...";
    let bodyClass = "";
    if (city && now) {
        icon = convertWeatherToIcon(now.weather_code, now.is_day);
        iconDesc = convertWeatherToHuman(now.weather_code, now.is_day);
        bodyClass = !now.is_day ? "night" : "";
    }

    const dayList = daily.map(day => (
        <Day key={"day-" + day.time} day={day}/>
    ));

    const hourList = hourly.map(hour => (
        <Hour key={"hour-" + hour.time} hour={hour}/>
    ));
    
    body.current.className = bodyClass;

    const searchPage = (
        <main className="search">
            <img id="logo" src="src/assets/icons/logo.svg"/>
            <p>Busca la ciudad que quieras, y obtén datos del clima en segundos.</p>
            <CitySearch setCity={setNewCity} />
            <Location/>
        </main>
    );

    const weatherPage = (
        <div className="weather">
            <header>
                <button id="btn-back" onClick={() => setCity(null)} title="Ir atrás">
                    <img src="src/assets/icons/back.svg" height="28"/>
                </button>
                <img id="logo" src="src/assets/icons/logo.svg" alt="Logo Reactive Weather" height="96"/>
                <div className="filler"></div>

                <City city={city} now={now} />
            </header>

            <div>
                <img id="sky-icon" src={icon} width="180" alt={iconDesc} title={iconDesc}/>

                <main>
                    <div id="data-current">
                        <Now now={now} />
                    </div>

                    <div id="data-hours">
                        <h2>Próximas 24 horas</h2>
                        <div className="data-items" onScroll={listScrolled}>
                            {hourList}
                        </div>
                    </div>

                    <div id="data-days">
                        <h2>Próximos 7 días</h2>
                        <div className="data-items" onScroll={listScrolled}>
                            {dayList}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );

    return !city ? searchPage : weatherPage;
}

export default App
