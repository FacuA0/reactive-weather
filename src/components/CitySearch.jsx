import { useEffect, useRef, useState } from "react";
import { deduplicateCityNames } from "../utils";
import { searchIcon, defaultIcon } from "../icons";
import { CircleFlag } from "react-circle-flags";

function CitySearch(props) {
    const [search, setSearch] = useState("");
    const [cities, setCities] = useState([]);
    const [focus, setFocus] = useState(-2);
    const [searchStep, setSearchStep] = useState(0);
    const allCities = useRef({});
    const lookingUp = useRef({id: 0, sig: null});

    async function goToCity(cityName) {
        let city = allCities.current[cityName];
        if (!city) {
            city = (await fetchCities(cityName))[0];
        }
        
        let visited = JSON.parse(localStorage.getItem("visitedCities") ?? "[]");
        if (!visited.includes(city)) {
            visited.push(city);
            localStorage.setItem("visited", JSON.stringify(visited));
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
                setSearchStep(1);
                
                setCities(await fetchCities(newSearch, abort.signal));
                
                setFocus(-1);
                setSearchStep(2);
            }, 420);
        }
        else {
            lookingUp.current.sig?.abort();
            setCities([]);
            setSearchStep(0);
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
    
    function handleFocus(e) {
        setFocus(-1);
    }

    function handleBlur(e) {
        setFocus(-2);
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
    
    const visited = JSON.parse(localStorage.getItem("visitedCities") ?? "[]");
    const visitedShow = visited.filter(c => cities.length == 0 || cities.includes(c));
    visitedShow.length = Math.min(visitedShow.length, 5);
    
    let cityList = [];
    cityList.push(...visitedShow.map((city, index) => (
        <button 
            key={"city-" + city.id}
            tabIndex="-1"
            className={index == focus ? "focused" : ""}
            onClick={() => goToCity(city.cityName)}>
            
            <CircleFlag
                countryCode={city.country_code.toLowerCase()}
                height="24"
                width="24"
                aria-hidden/>
            <span>{city.cityName}</span>
            <img src={defaultIcon} height="24"/>
        </button>
    )));
    
    console.log(cityList);
    
    if (cityList.length > 0) {
        cityList.push(<hr key="list-sep"/>);
    }

    console.log(cityList);
    cityList.push(...cities
        .filter(city => !visitedShow.includes(city))
        .map((city, index) => (
            <button 
                key={"city-" + city.id} 
                tabIndex="-1" 
                className={index == focus ? "focused" : ""}
                onClick={() => goToCity(city.cityName)}>
                
                <CircleFlag
                    countryCode={city.country_code.toLowerCase()}
                    height="24"
                    width="24"
                    aria-hidden/>
                <span>{city.cityName}</span>
            </button>
        ))
    );
    
    console.log(cityList);

    if (searchStep == 2 && cities.length == 0) {
        cityList = [(
            <button className="no-results" disabled>
                No hay resultados para esta búsqueda.
            </button>
        )];
    }
    
    const formClasses = [];
    if (focus == -2 || searchStep != 1)
        formClasses.push("loading-hidden");
    if (focus == -2 || cityList.length == 0)
        formClasses.push("list-hidden");
        
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
    
    return (
        <div id="div-city-search">
            <form id="city-search"
                className={formClasses.join(" ")}
                onSubmit={handleSubmit}
                onFocus={handleFocus}
                onBlur={handleBlur}>
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
                        onKeyDown={handleKeyDown}/>
                </div>
                <div id="city-progress">
                    <div id="city-progress-bar"></div>
                </div>
                <div id="search-suggestions">
                    {cityList}
                </div>
            </form>
        </div>
    );
}

export default CitySearch;