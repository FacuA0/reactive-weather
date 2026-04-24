import { useRef, useState } from "react";
import { deduplicateCityNames } from "../utils";
import { searchIcon } from "../icons";
import { CircleFlag } from "react-circle-flags";

function CitySearch(props) {
    const [search, setSearch] = useState("");
    const [cities, setCities] = useState([]);
    const allCities = useRef({});
    const lookingUp = useRef({id: 0, sig: null});

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
        
        if (lookingUp.current.id != 0) {
            clearTimeout(lookingUp.current.id);
            lookingUp.current.id = 0;
        }

        if (newSearch.length > 1) {
            lookingUp.current.id = setTimeout(async () => {
                lookingUp.current.id = 0;

                let abort = new AbortController();
                lookingUp.current.sig = abort;
                setCities(await fetchCities(newSearch, abort.signal));
            }, 420);
        }
        else {
            lookingUp.current.sig?.abort();
            setCities([]);
        }
    }

    async function fetchCities(search, signal) {
        try {
            let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(search)}&language=es`, {signal});
            let newCities = await res.json();

            lookingUp.current.sig = null;

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
            if (err instanceof DOMException) {
                return [];
            }

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
            <span>{city.cityName}</span>
        </button>
    ));

    return (
        <div id="div-city-search">
            <form id="city-search" onSubmit={handleSubmit}>
                <div id="search-bar">
                    <button type="submit">
                        <img 
                            id="search-icon"
                            src={searchIcon}
                            alt="Buscar"
                            width="20"/>
                    </button>
                    <input 
                        id="input-city"
                        type="text"
                        placeholder="Busca tu ciudad..."
                        autoComplete="off"
                        value={search}
                        onChange={handleChange}/>
                </div>
                <div
                    id="search-suggestions"
                    className={cityList2.length == 0 ? "hidden" : ""}>
                    {cityList2}
                </div>
            </form>
        </div>
    );
}

export default CitySearch;