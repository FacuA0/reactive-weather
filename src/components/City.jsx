function City({ city }) {
    city = city || {};

    return (
        <>
            <p><b>País:</b> {city.country || "Desconocido"}</p>
            <p><b>Estado/provincia:</b> {city.admin1 || "Desconocido"}</p>
            <p><b>Ciudad:</b> {city.name || "Desconocido"}</p>
            <p><b>Latitud:</b> {city.latitude || "Desconocido"}</p>
            <p><b>Longitud:</b> {city.longitude || "Desconocido"}</p>
        </>
    );
}

export default City;