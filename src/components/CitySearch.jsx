import { useState } from "react";

function CitySearch(props) {
    const [search, setSearch] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="input-city">Busca tu ciudad: </label>
            <input 
                id="input-city"
                type="search"
                list="city-names"
                value={search}
                onChange={e => setSearch(e.target.value)}/>
            <input type="submit"/>

            <datalist id="city-names">
                <option>Buenos Aires</option>
                <option>Bogotá, Colombia</option>
                <option>Bariloche, Argentina</option>
            </datalist>
        </form>
    );
}

export default CitySearch;