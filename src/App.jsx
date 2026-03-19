import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <h1>Clima reactivo</h1>
      <p>Busca la ciudad que quieras, y obtén datos del clima.</p>
      <form>
        <label>Busca tu ciudad: </label>
        <input type="text"/>
      </form>

      <div id="datos-actuales">
        <h2>Datos del clima</h2>
        <p><b>Cielo:</b> Soleado</p>
        <p><b>Temperatura:</b> 0°C</p>
        <p><b>- Máxima:</b> 0°C</p>
        <p><b>- Mínima:</b> 0°C</p>
        <p><b>Probabilidad de lluvia:</b> 0%</p>
        <p><b>Humedad:</b> 0%</p>
      </div>

      <div id="datos-hora">
        <h2>Datos por hora</h2>
        <ul>
          <li>
            <p><b>00:00</b></p>
            <p><b>Temperatura:</b> 0°C</p>
            <p><b>Probabilidad:</b> 0°C</p>
          </li>
          <li>
            <p><b>01:00</b></p>
            <p><b>Temperatura:</b> 0°C</p>
            <p><b>Probabilidad:</b> 0°C</p>
          </li>
          <li>
            <p><b>02:00</b></p>
            <p><b>Temperatura:</b> 0°C</p>
            <p><b>Probabilidad:</b> 0°C</p>
          </li>
          <li>
            <p><b>03:00</b></p>
            <p><b>Temperatura:</b> 0°C</p>
            <p><b>Probabilidad:</b> 0°C</p>
          </li>
        </ul>
      </div>

      <div id="datos-dia">
        <h2>Datos por día</h2>
        <ul>
          <li>
            <p><b>19 de marzo</b></p>
            <p><b>Cielo:</b> Soleado</p>
            <p><b>Temperatura máx:</b> 0°C</p>
            <p><b>Temperatura mín:</b> 0°C</p>
            <p><b>Probabilidad:</b> 0°C</p>
          </li>
          <li>
            <p><b>20 de marzo</b></p>
            <p><b>Cielo:</b> Soleado</p>
            <p><b>Temperatura máx:</b> 0°C</p>
            <p><b>Temperatura mín:</b> 0°C</p>
            <p><b>Probabilidad:</b> 0°C</p>
          </li>
          <li>
            <p><b>21 de marzo</b></p>
            <p><b>Cielo:</b> Soleado</p>
            <p><b>Temperatura máx:</b> 0°C</p>
            <p><b>Temperatura mín:</b> 0°C</p>
            <p><b>Probabilidad:</b> 0°C</p>
          </li>
          <li>
            <p><b>22 de marzo</b></p>
            <p><b>Cielo:</b> Soleado</p>
            <p><b>Temperatura máx:</b> 0°C</p>
            <p><b>Temperatura mín:</b> 0°C</p>
            <p><b>Probabilidad:</b> 0°C</p>
          </li>
        </ul>
      </div>
    </>
  )
}

export default App
