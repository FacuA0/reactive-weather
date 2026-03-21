import { useState } from "react";

function CitySearch(props) {
    const [search, setSearch] = useState("");
    const [cities, setCities] = useState([]);
    const [lookingUp, setLookingUp] = useState(0);

    async function handleSubmit(e) {
        e.preventDefault();

        let city = cities.find(city => search === `${city.name}, ${city.country}` || search === `${city.name}, ${city.admin1}, ${city.country}`);
        if (!city) {
            city = (await fetchCities(search))[0];
        }

        props.setCity(city);
    }

    async function handleChange(e) {
        let newSearch = e.target.value;
        setSearch(newSearch);
        
        if (newSearch.length > 1) {
            if (lookingUp != 0) clearTimeout(lookingUp);

            setLookingUp(setTimeout(async () => {
                setLookingUp(0);
                setCities(await fetchCities(newSearch));
            }, 500));
        }
        else {
            setCities([]);
        }
    }

    async function fetchCities(search) {
        try {
            let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(search)}&language=es`);
            let newCities = await res.json();

            if (!res.ok) {
                console.error("Error", newCities.reason);
                return [{
                    name: "Error (vea consola)"
                }];
            }
            else return newCities.results ?? [];
        }
        catch (err) {
            console.error(err);
            return [{
                id: 0,
                name: "Error (vea consola)"
            }];
        }
    }

    let dupNames = {};
    for (let {name, country} of cities) {
        let cityName = `${name}, ${country}`;
        dupNames[cityName] = cityName in dupNames;
    }

    const cityList = cities.map(city => {
        let name = `${city.name}, ${city.country}`;
        if (dupNames[name]) {
            name = `${city.name}, ${city.admin1}, ${city.country}`;
        }

        return <option key={"city-opt-" + city.id}>{name}</option>;
    });

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="input-city">Busca tu ciudad: </label>
            <input 
                id="input-city"
                type="text"
                list="city-names"
                size="40"
                value={search}
                onChange={handleChange}/>
            <input type="submit"/>

            <datalist id="city-names">
                {cityList}
            </datalist>
        </form>
    );
}

export default CitySearch;