import { createRef, useContext, useEffect, useState } from "react"
import styles from "./weatherdisplay.module.scss"
import { locationContext } from "@/contextes/LocationContext"


export interface Root {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    current_weather: CurrentWeather
    hourly_units: HourlyUnits
    hourly: Hourly
    daily_units: DailyUnits
    daily: Daily
}

export interface CurrentWeather {
    temperature: number
    windspeed: number
    winddirection: number
    weathercode: number
    time: string
}

export interface HourlyUnits {
    time: string
    relativehumidity_2m: string
    temperature_2m: string
}

export interface Hourly {
    time: string[]
    relativehumidity_2m: number[]
    temperature_2m: number[]
}

export interface DailyUnits {
    time: string
    precipitation_sum: string
    sunrise: string
    sunset: string
    precipitation_probability_max: string
}

export interface Daily {
    time: string[]
    precipitation_sum: number[]
    sunrise: string[]
    sunset: string[]
    precipitation_probability_max: number[]
}



export function WeatherDisplay() {
    const [weather, setWeather] = useState<Root>()

    const location = useContext(locationContext)

    useEffect(() => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.location.latitude}&longitude=${location.location.longitude}&hourly=relativehumidity_2m,temperature_2m&current_weather=true&daily=precipitation_sum,sunrise,sunset,precipitation_probability_max&forecast_days=2&timezone=Europe/Moscow`).then(data => {
            data.json().then((weather: Root) => {
                setWeather(weather);
            })
        })
    }, [location.location])
    return <>
        <div className={styles.displayContainer}>
            <div className={styles.currentWeather}>
                <div>
                    <div
                        className={styles.degr}>
                        {weather?.current_weather.temperature}
                    </div>
                    <div className={styles.city}>
                        {location.location.name}
                    </div>
                    <div>
                        <div className={styles.params}>
                            <div className={styles.windSpeed}>
                                <span className="material-symbols-outlined">
                                    air
                                </span>{weather?.current_weather.windspeed}
                            </div>
                            <div className={styles.precipitation}>
                                <span className="material-symbols-outlined">
                                    umbrella
                                </span>{weather?.daily.precipitation_sum[0]}
                            </div>
                            <div className={styles.precipitationProbMax}>
                                <span className="material-symbols-outlined">
                                    rainy
                                </span>{weather?.daily.precipitation_probability_max[0]}
                            </div>
                            <div className={styles.humidity}>
                                <span className="material-symbols-outlined">
                                    airwave
                                </span>{weather?.hourly.relativehumidity_2m[new Date().getHours()]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.nextHourWeather}>
            </div>
        </div>
    </>
}