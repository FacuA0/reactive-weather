import { useState } from "react";
import { deduplicateCityNames } from "../utils";

function CitySearch(props) {
    const [search, setSearch] = useState("");
    const [allCities, setAllCities] = useState({});
    const [cities, setCities] = useState([]);
    const [lookingUp, setLookingUp] = useState(0);

    async function handleSubmit(e) {
        e.preventDefault();

        console.log("Search", search);

        if (search != "") {
            let city = allCities[search];
            console.log("City 1", city);
            if (!city) {
                city = (await fetchCities(search))[0];
                console.log("City 2", city);
            }
    
            props.setCity(city);
        }
    }

    async function handleChange(e) {
        let newSearch = e.target.value;
        setSearch(newSearch);
        console.log("New search", search);
        
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

            let cities = newCities.results ?? [];
            deduplicateCityNames(cities);

            let newAllCities = {...allCities};
            for (let city of cities) {
                newAllCities[city.cityName] = city;
            }
            setAllCities(newAllCities);

            return cities;
        }
        catch (err) {
            console.error(err);
            return [{
                id: 0,
                name: "Error (vea consola)"
            }];
        }
    }

    const cityList = cities.map(city => (
        <option key={"city-opt-" + city.id}>{city.cityName}</option>
    ));

    return (
        <form onSubmit={handleSubmit}>
            <div id="search-bar">
                <button type="submit">
                    <img 
                        id="search-icon"
                        src="src/assets/icons/default.svg"
                        alt="Buscar"
                        width="24"/>
                </button>
                <input 
                    id="input-city"
                    type="text"
                    list="city-names"
                    size="45"
                    placeholder="Busca tu ciudad..."
                    value={search}
                    onChange={handleChange}/>
                {/*<input type="submit" value="Buscar"/>*/}
            </div>

            <datalist id="city-names">
                {cityList}
            </datalist>
        </form>
    );
}

export default CitySearch;