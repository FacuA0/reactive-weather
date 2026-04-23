import { useRef, useState } from "react";
import { locationIcon } from "../icons";

function Location(props) {
    const [error, setError] = useState(null);
    const [locating, setLocating] = useState(0);

    function getLocation() {
        async function success(pos) {
            setLocating(false);

            let latitude = pos.coords.latitude;
            let longitude = pos.coords.longitude;
            let language = navigator.language.slice(0, 2);
            
            setLocating(2);

            try {
                let query = `lat=${latitude}&lng=${longitude}&lang=${language}`;
                let cityRequest = await fetch(`https://getcities-rw.facua0.deno.net/v1/getCityByLatLng?${query}`);
                let cityJson = (await cityRequest.json()).geonames[0];
    
                let city = {
                    cityName: `${cityJson.name}, ${cityJson.countryName}`,
                    country_code: cityJson.countryCode,
                    latitude,
                    longitude
                };
    
                console.log(city);
    
                props.setCity(city);
            }
            catch (err) {
                console.error(err);
                setLocating(0);
                setError(err);
            }
        }

        function error(err) {
            console.error(err);
            setLocating(0);
            setError(err);
        }

        navigator.geolocation.getCurrentPosition(success, error);

        setLocating(1);
        setError(null);
    }

    let locatingText = "Usar ubicación", locationError;
    if (locating == 1)
        locatingText = "Ubicando...";
    if (locating == 2)
        locatingText = "Buscando ciudad...";

    if (error?.code == 1)
        locationError = "Permiso denegado.";
    if (error?.code == 2)
        locationError = "Ubicación no disponible.";

    return (
        <div id="location-box">
            <p>...o usa tu ubicación actual (requiere permisos)</p>
            <p id="location-error" style={{display: error ? "block" : "none"}}>{locationError}</p>
            <button onClick={getLocation} disabled={locating}>
                <img id="location-icon" width="24" src={locationIcon}/>
                {locatingText}
            </button>
        </div>
    );
}

export default Location;