import { useRef, useState } from "react";
import { deduplicateCityNames } from "../utils";
import { CircleFlag } from "react-circle-flags";

function CitySearch(props) {
    const [search, setSearch] = useState("");
    const [cities, setCities] = useState([]);
    const allCities = useRef({});
    const lookingUp = useRef(0);

    async function goToCity(cityName) {
        let city = allCities.current[cityName];
        if (!city) {
            city = (await fetchCities(cityName))[0];
        }

        props.setCity(city);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (search != "") {
            await goToCity(search);
        }
    }

    async function handleChange(e) {
        let newSearch = e.target.value;
        setSearch(newSearch);
        
        if (lookingUp.current != 0) {
            clearTimeout(lookingUp.current);
            lookingUp.current = 0;
        }

        if (newSearch.length > 1) {
            lookingUp.current = setTimeout(async () => {
                lookingUp.current = 0;
                setCities(await fetchCities(newSearch));
            }, 500);
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

            for (let city of cities) {
                allCities.current[city.cityName] = city;
            }

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
   
    const cityList2 = cities.map(city => (
        <button key={"city-" + city.id} onClick={() => goToCity(city.cityName)}>
            <CircleFlag countryCode={city.country_code.toLowerCase()} height="24" width="24"/>
            {city.cityName}
        </button>
    ));

    return (
        <form id="city-search" onSubmit={handleSubmit}>
            <div id="search-bar">
                <button type="submit">
                    <img 
                        id="search-icon"
                        src="src/assets/icons/search.svg"
                        alt="Buscar"
                        width="20"/>
                </button>
                <input 
                    id="input-city"
                    type="text"
                    size="45"
                    placeholder="Busca tu ciudad..."
                    value={search}
                    onChange={handleChange}/>
            </div>
            <div
                id="search-suggestions"
                className={cityList2.length == 0 ? "hidden" : ""}>
                {cityList2}
            </div>
        </form>
    );
}

export default CitySearch;