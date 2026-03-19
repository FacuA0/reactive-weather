function City({ city }) {
    return (
        <>
            <p><b>País:</b> {city?.country || "Argentina"}</p>
            <p><b>Estado/provincia:</b> {city?.admin1 || city?.country && "Desconocido" || "Buenos Aires"}</p>
            <p><b>Ciudad:</b> {city?.name || "Buenos Aires"}</p>
            <p><b>Latitud:</b> {city?.latitude || "Desconocido"}</p>
            <p><b>Longitud:</b> {city?.longitude || "Desconocido"}</p>
        </>
    );
}

export default City;