//import { useState } from 'react'
import CitySearch from './components/CitySearch';
import Now from './components/Now';
import Day from './components/Day';
import Hour from './components/Hour';
import './App.css';

function App() {
    return (
        <>
            <h1>Clima reactivo</h1>
            <p>Busca la ciudad que quieras, y obtén datos del clima en segundos.</p>
            <CitySearch />

            <div id="datos-actuales">
                <h2>Datos del clima</h2>
                <Now />
            </div>

            <div id="datos-hora">
                <h2>Datos por hora</h2>
                <ul>
                    <Hour hour="00:00"/>
                    <Hour hour="01:00"/>
                    <Hour hour="02:00"/>
                    <Hour hour="03:00"/>
                </ul>
            </div>

            <div id="datos-dia">
                <h2>Datos por día</h2>
                <ul>
                    <Day day="19 de marzo"/>
                    <Day day="20 de marzo"/>
                    <Day day="21 de marzo"/>
                    <Day day="22 de marzo"/>
                </ul>
            </div>
        </>
    )
}

export default App
