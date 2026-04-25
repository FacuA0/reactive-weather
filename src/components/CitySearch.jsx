import { useEffect, useRef, useState } from "react";
import { deduplicateCityNames } from "../utils";
import { searchIcon } from "../icons";
import { CircleFlag } from "react-circle-flags";

function CitySearch(props) {
    const [search, setSearch] = useState("");
    const [cities, setCities] = useState([]);
    const [focus, setFocus] = useState(-1);
    const [searched, setSearched] = useState(false);
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
            if (focus > -1) {
                await goToCity(cities[focus].cityName);
            }
            else {
                await goToCity(search);
            }
        }
    }

    async function handleChange(e) {
        let newSearch = e.target.value;
        setSearch(newSearch);
        setFocus(-1);
        
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
                setFocus(-1);
                setSearched(true);
            }, 420);
        }
        else {
            lookingUp.current.sig?.abort();
            setCities([]);
            setSearched(false);
            setFocus(-1);
        }
    }

    function handleKeyDown(e) {
        if (e.key == "ArrowDown" || e.key == "Down") {
            e.preventDefault();
            setFocus(Math.min(focus + 1, cities.length - 1));
        }
        if (e.key == "ArrowUp" || e.key == "Up") {
            e.preventDefault();
            if (focus > -1)
                setFocus(Math.max(focus - 1, 0));
        }
    }

    function handleBlur(e) {
        setFocus(-1);
    }

    async function fetchCities(search, signal) {
        try {
            let query = `name=${encodeURIComponent(search)}&language=es`;
            let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${query}`, {signal});
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

    useEffect(() => {
        if (focus > -1) {
            let button = document.querySelector("#search-suggestions button.focused");
            let pos = button.getBoundingClientRect();
            if (pos.top < 0) {
                button.scrollIntoView(true);
            }
            else if (pos.bottom > innerHeight) {
                button.scrollIntoView(false);
            }
        }
    }, [focus]);

    let cityList2 = cities.map((city, index) => (
        <button 
            key={"city-" + city.id} 
            tabIndex="-1" 
            className={index == focus ? "focused" : ""}
            onClick={() => goToCity(city.cityName)}>
            <CircleFlag countryCode={city.country_code.toLowerCase()} height="24" width="24"/>
            <span>{city.cityName}</span>
        </button>
    ));

    if (searched && cities.length == 0) {
        cityList2 = (
            <button disabled 
                style={{
                    textAlign: "center",
                    margin: "8px auto 16px"
                }}>No hay resultados para esta búsqueda.</button>
        );
    }

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
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}/>
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