import { useState } from 'react';
import CitySearch from './components/CitySearch';
import City from './components/City';
import Now from './components/Now';
import Day from './components/Day';
import Hour from './components/Hour';
import './App.css';

function App() {
    const [city, setCity] = useState({});
    const [now, setNow] = useState({});
    const [hourly, setHourly] = useState([]);
    const [daily, setDaily] = useState([]);

    async function setNewCity(city) {
        setCity(city);

        let res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_mean&hourly=temperature_2m,weather_code,precipitation_probability&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,apparent_temperature,precipitation_probability&timezone=auto`);
        let data = await res.json();

        setNow(data.current);

        let newDaily = [];
        for (let i = 0; i < data.daily.time.length; i++) {
            let obj = {};

            for (let prop in data.daily) {
                obj[prop] = data.daily[prop][i];
            }

            newDaily.push(obj);
        }

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

    const dayList = daily.map(day => (
        <Day key={"day-" + day.time} day={day}/>
    ));

    const hourList = hourly.map(hour => (
        <Hour key={"hour-" + hour.time} hour={hour}/>
    ));

    return (
        <>
            <h1>Clima reactivo</h1>
            <p>Busca la ciudad que quieras, y obtén datos del clima en segundos.</p>
            <CitySearch setCity={setNewCity} />

            <div id="datos-ciudad">
                <h2>Ciudad actual</h2>
                <City city={city} />
            </div>

            <div id="datos-actuales">
                <h2>Datos del clima</h2>
                <Now now={now} />
            </div>

            <div id="datos-hora">
                <h2>Datos por hora</h2>
                <ul>
                    {hourList}
                </ul>
            </div>

            <div id="datos-dia">
                <h2>Datos por día</h2>
                <ul>
                    {dayList}
                </ul>
            </div>
        </>
    )
}

export default App
