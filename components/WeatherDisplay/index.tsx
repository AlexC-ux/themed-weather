import { createRef, useContext, useEffect } from "react"
import styles from "./weatherdisplay.module.scss"
import { locationContext } from "@/contextes/LocationContext"

export interface IWeather {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    current_weather: ICurrentWeather
    hourly_units: IHourlyUnits
    hourly: IHourly
}

export interface ICurrentWeather {
    temperature: number
    windspeed: number
    winddirection: number
    weathercode: number
    time: string
}

export interface IHourlyUnits {
    time: string
    temperature_2m: string
}

export interface IHourly {
    time: string[]
    temperature_2m: number[]
}


export function WeatherDisplay() {
    const currentTempRef = createRef<HTMLDivElement>();

    const location = useContext(locationContext)

    useEffect(() => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.location.latitude}&longitude=${location.location.longitude}&hourly=temperature_2m&current_weather=true&forecast_days=2&timezone=Europe/Moscow`).then(data => {
            data.json().then((weather: IWeather) => {
                currentTempRef.current!.innerText = weather.current_weather.temperature.toString()
            })
        })
    }, [location.location])
    return <>
        <div className={styles.displayContainer}>
            <div
                className={styles.currentWeather}>
                <div>
                    <div className={styles.city}>
                        {location.location.name}
                    </div>
                    <div
                        className={styles.degr}
                        ref={currentTempRef}>

                    </div>
                </div>
            </div>
        </div>
    </>
}