import { useState } from "react";

function Location(props) {
    const [error, setError] = useState(null);
    const [locating, setLocating] = useState(false);

    function getLocation() {
        function success(pos) {
            alert(`Coordenadas: Lat: ${pos.coords.latitude}, Lon: ${pos.coords.longitude}`);
            setLocating(false);
        }
        function error(err) {
            console.error(err);
            alert(`Hubo un error: ${err}`);
            setLocating(false);
            setError(err);
        }

        navigator.geolocation.getCurrentPosition(success, error);
        setLocating(true);
        setError(null);
    }

    return (
        <div id="location-box">
            <p>{!error ? "...o usa tu ubicación actual (requiere permisos)" : "Hubo un error: " + error}</p>
            <button onClick={getLocation} disabled={locating}>
                <img id="logo" width="24" src="src/assets/icons/back.svg"/>
                {!locating ? "Usar ubicación" : "Ubicando..."}
            </button>
        </div>
    );
}

export default Location;