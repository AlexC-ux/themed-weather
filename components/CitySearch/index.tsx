import { createRef, useContext, useEffect, useState } from "react";
import { ChangeEvent } from "react";
import styles from "./CitySeacrh.module.scss";
import { locationContext } from "@/contextes/LocationContext";

interface ICityData {
    admin1: string
    admin1_id: number
    country: string
    country_code: string
    country_id: string
    elevation: number
    feature_code: string
    id: number
    latitude: number
    longitude: number
    name: string
    population?: number
    timezone: string
}

export function CitySearch() {

    const [dataListCities, setDataListCities] = useState<ICityData[]>([])

    const location = useContext(locationContext)

    const searchInputRef = createRef<HTMLInputElement>();
    const [resultsVisible, setResultVisibile] = useState(false)


    function getCity(changeEvent: ChangeEvent<HTMLInputElement>) {
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(changeEvent.target.value)}&language=ru&count=50&format=json`).then(resp => {
            resp.json().then((data: { generationtime_ms: number, results: ICityData[] }) => {
                setDataListCities(data.results);
            })
        });

    }

    useEffect(() => {
        if (dataListCities?.length > 0) {
            setResultVisibile(true);
        } else {
            setResultVisibile(false);
        }
    }, [dataListCities])

    return (
        <div className={styles.searchContainer}>
            <input
                ref={searchInputRef}
                type="text"
                name="city"
                list="cities"
                onChange={getCity}
                placeholder="Введите город"
                onClick={(input) => {
                    if (dataListCities?.length > 0) {
                        setResultVisibile(true)
                    }
                }}
            />
            <div
                className={styles.serchResultsContainer}
                style={{ display: !!resultsVisible ? "block" : "none" }}>
                {
                    dataListCities?.map((city, index) => {
                        return (
                            <div
                                key={`city_${city.id}`}
                                className={styles.serchResult}
                                onClick={() => {
                                    location.setLocation({ latitude: city.latitude, longitude: city.longitude, name: city.name });
                                    setResultVisibile(false)
                                    searchInputRef.current!.value = city.name;
                                    window.localStorage.setItem("last_city", `${city.longitude}_${city.latitude}_${city.name}`)
                                }}>
                                <div className={styles.cityName}>
                                    {city.name}
                                </div>
                                <div className={styles.countryInfo}>
                                    {city.country} {!!city.population ? `, ${city.population} чел.` : ""}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}