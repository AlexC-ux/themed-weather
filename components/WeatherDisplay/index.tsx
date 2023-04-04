import { createRef, useContext, useEffect, useState } from "react"
import styles from "./weatherdisplay.module.scss"
import { locationContext } from "@/contextes/LocationContext"
import { WiSunrise, WiSunset, WiStrongWind, WiUmbrella, WiRain, WiDaySunny, WiDayCloudy, WiFog, WiRainMix, WiSleet, WiRainWind, WiSnowWind, WiSnow, WiShowers, WiStormShowers, WiThunderstorm } from "react-icons/wi";
import { MdCalendarMonth,MdOutlineWaterDrop } from "react-icons/md";


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
    windspeed_10m: string
    relativehumidity_2m: string
    temperature_2m: string
    apparent_temperature: string
}

export interface Hourly {
    time: string[]
    windspeed_10m: number[]
    relativehumidity_2m: number[]
    temperature_2m: number[]
    apparent_temperature: number[]
}

export interface DailyUnits {
    time: string
    temperature_2m_max: string
    temperature_2m_min: string
    weathercode: string
    precipitation_sum: string
    sunrise: string
    sunset: string
    precipitation_probability_max: string
}

export interface Daily {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weathercode: number[]
    precipitation_sum: number[]
    sunrise: string[]
    sunset: string[]
    precipitation_probability_max: number[]
}




export function WeatherDisplay() {

    const [weather, setWeather] = useState<Root>()

    const location = useContext(locationContext)

    const nowDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(nowDate.getDate() + 1)

    useEffect(() => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.location.latitude}&longitude=${location.location.longitude}&hourly=windspeed_10m,relativehumidity_2m,temperature_2m,apparent_temperature&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,sunrise,sunset,precipitation_probability_max&forecast_days=2&timezone=Europe/Moscow`).then(data => {
            data.json().then((weather: Root) => {
                setWeather(weather);
            })
        })
    }, [location.location])

    function getWeatherIcon(weatherCode: number): JSX.Element {
        switch (weatherCode) {
            case 0:
                return <WiDaySunny />;
            case 1:
                return <WiDayCloudy />;
            case 2:
                return <WiDayCloudy />;
            case 3:
                return <WiDayCloudy />;
            case 45:
                return <WiFog />;
            case 48:
                return <WiFog />;
            case 51:
                return <WiSleet />;
            case 53:
                return <WiRainMix />;
            case 55:
                return <WiRainWind />;
            case 56:
                return <WiSleet />;
            case 57:
                return <WiRainMix />;
            case 61:
                return <WiSleet />;
            case 63:
                return <WiRainMix />;
            case 65:
                return <WiRainWind />;
            case 71:
                return <WiSnowWind />;
            case 73:
                return <WiSnow />;
            case 75:
                return <WiSnow />;
            case 77:
                return <WiSnow />;
            case 80:
                return <WiShowers />;
            case 81:
                return <WiShowers />;
            case 82:
                return <WiStormShowers />;
            case 85:
                return <WiSnow />;
            case 1:
                return <WiSnowWind />;
            default:
                return <WiThunderstorm />;
        }
    }
    return <>
        <div className={styles.displayContainer}>
            <div className={styles.currentWeather}>
                <div>
                    <div className={`${styles.mainContent}`}>
                        <div
                            className={styles.degr}>
                            {weather?.current_weather.temperature}
                        </div>
                        <div className={styles.apparent_temp}>
                            Ощущается как {weather?.hourly.apparent_temperature[new Date().getHours()]}
                        </div>
                        <div className={styles.city}>
                            {location.location.name}
                        </div>
                    </div>
                    <div>
                        <div className={styles.params}>

                            <div className={`${styles.weatherParam} ${styles.leftCenter} ${styles.sunrise}`}>
                                <WiSunrise />
                                {!!weather ? new Date(weather?.daily.sunrise[0]).toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) : ""}
                            </div>

                            <div className={`${styles.weatherParam} ${styles.rightCenter} ${styles.sunset}`}>
                                <WiSunset />
                                {!!weather ? new Date(weather?.daily.sunset[0]).toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) : ""}
                            </div>

                            {/*Текущая дата*/}
                            <div className={`${styles.weatherParam} ${styles.topCenter} ${styles.date}`}>
                                {new Date().toLocaleDateString("ru", { day: "2-digit", month: "2-digit" })}
                                <MdCalendarMonth className={`${styles.centeredIcon}`} />
                            </div>

                            {/*Погода*/}
                            <div className={`${styles.weatherParam} ${styles.bottomCenter} ${styles.weatherCode}`}>
                                {getWeatherIcon(weather?.daily.weathercode[0] || 0)}
                            </div>



                            {/*Углы карточки*/}
                            <div className={`${styles.windSpeed} ${styles.weatherParam} ${styles.topLeft}`}>
                                <WiStrongWind />
                                {weather?.current_weather.windspeed}
                            </div>
                            <div className={`${styles.precipitation} ${styles.weatherParam} ${styles.topRight}`}>
                                <WiUmbrella />
                                {weather?.daily.precipitation_sum[0]}
                            </div>
                            <div className={`${styles.precipitationProbMax} ${styles.weatherParam} ${styles.bottomLeft}`}>
                                <WiRain />
                                {weather?.daily.precipitation_probability_max[0]}
                            </div>
                            <div className={`${styles.humidity} ${styles.weatherParam} ${styles.bottomRight}`}>
                                <MdOutlineWaterDrop className={styles.flexIcon}/>
                                {weather?.hourly.relativehumidity_2m[new Date().getHours()]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.nextDayWeather}>
                <div className={`${styles.mainContent}`}>
                    <div
                        className={styles.degr}>
                        {!!weather ? (weather?.daily.temperature_2m_max[1] + weather?.daily.temperature_2m_min[1]) / 2 : ""}
                    </div>
                    <div className={styles.apparent_temp}>
                        Ощущается как {weather?.hourly.apparent_temperature[tomorrowDate.getHours() + 24]}
                    </div>
                    <div className={styles.city}>
                        {location.location.name}
                    </div>
                </div>
                <div>
                    <div className={styles.params}>

                        <div className={`${styles.weatherParam} ${styles.leftCenter} ${styles.sunrise}`}>
                            <WiSunrise />
                            {!!weather ? new Date(weather?.daily.sunrise[1]).toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) : ""}
                        </div>

                        <div className={`${styles.weatherParam} ${styles.rightCenter} ${styles.sunset}`}>
                            <WiSunset />
                            {!!weather ? new Date(weather?.daily.sunset[1]).toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) : ""}
                        </div>

                        {/*Текущая дата*/}
                        <div className={`${styles.weatherParam} ${styles.topCenter} ${styles.date}`}>
                            {tomorrowDate.toLocaleDateString("ru", { day: "2-digit", month: "2-digit" })}
                            <MdCalendarMonth className={`${styles.centeredIcon}`} />
                        </div>

                        {/*Погода*/}
                        <div className={`${styles.weatherParam} ${styles.bottomCenter} ${styles.weatherCode}`}>
                            {getWeatherIcon(weather?.daily.weathercode[1] || 0)}
                        </div>


                        {/*Углы карточки*/}
                        <div className={`${styles.windSpeed} ${styles.weatherParam} ${styles.topLeft}`}>
                            <WiStrongWind />
                            {weather?.hourly.windspeed_10m[36]}
                        </div>
                        <div className={`${styles.precipitation} ${styles.weatherParam} ${styles.topRight}`}>
                            <WiUmbrella />
                            {weather?.daily.precipitation_sum[1]}
                        </div>
                        <div className={`${styles.precipitationProbMax} ${styles.weatherParam} ${styles.bottomLeft}`}>
                            <WiRain />
                            {weather?.daily.precipitation_probability_max[1]}
                        </div>
                        <div className={`${styles.humidity} ${styles.weatherParam} ${styles.bottomRight}`}>
                            <MdOutlineWaterDrop className={styles.flexIcon} />
                            {weather?.hourly.relativehumidity_2m[tomorrowDate.getHours() + 24]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}