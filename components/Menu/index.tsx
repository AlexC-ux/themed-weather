'use-client'
import { MdOutlineSettings } from "react-icons/md"
import { CitySearch } from "../CitySearch"
import styles from "./menu.module.scss"
import { createRef, useEffect, useState } from "react"


type cssParamType = 'searchResultBg' | 'serachBackground' | 'currentWeatherCardBg' | 'currentWeatherCityColor'
    | 'currentWeatherTempColor' | 'currentWeatherCardShadow' | 'currentDateTextColor' |
    'currentWeatherSunriseColor' | 'currentWeatherSunsetColor' | 'currentAppearentWeatherTempTextColor' |
    'currentWeatherWindTextColor' | 'currentWeatherWindBgColor' | 'WeatherCodeIconColor' | 'currentWeatherPrecipitationBgColor'
    | 'currentWeatherPrecipitationTextColor' | 'currentWeatherPrecipitationProbMaxBgColor' |
    'currentWeatherHumidityBgColor' | 'currentWeatherHumidityTextColor' | 'currentWeatherCelsiumColor' |
    'BGCOLOR' | 'currentWeatherPrecipitationProbMaxTextColor'

export function Menu() {

    const [menuShown, setMenuShow] = useState(false);

    const [iconClasses, setIconClasses] = useState(`${styles.menuIcon}`);

    function updateParam(props: { paramName: cssParamType, value: string }) {
        document.documentElement.style.setProperty(`--${props.paramName}`, props.value)
        window.localStorage.setItem(`cutom-color-param_${props.paramName}_`, props.value)
    }

    function showMenu() {
        if (!menuShown) {
            setMenuShow(!menuShown)
            document.documentElement.style.overflow = "hidden"
            setIconClasses(`${styles.menuIcon} ${styles.menuOpened}`)
        } else {
            setMenuShow(!menuShown)
            setIconClasses(`${styles.menuIcon}`)
            document.documentElement.style.overflow = "scroll"
        }
    }


    function UpdateParamField(props: { text: string, paramName: cssParamType }) {
        const inputRef = createRef<HTMLInputElement>();

        useEffect(() => {
            const propValue = getComputedStyle(document.documentElement).getPropertyValue(`--${props.paramName}`).trim();
            const customPropValue = window.localStorage.getItem(`cutom-color-param_${props.paramName}_`);

            if (customPropValue == null) {
                console.log({ propValue })
                if (propValue.startsWith("#")) {
                    inputRef.current!.setAttribute("value", propValue)
                } else if (propValue.startsWith("rgb")) {
                    const vals = /rgb\((\d{1,3})[, ]+(\d{1,3})[, ]+(\d{1,3})\)/gm.exec(propValue)!
                    console.log({ vals })
                    const hexValue = rgbToHex(Number(vals[1]), Number(vals[2]), Number(vals[3]))
                    console.log({ r: vals[1], g: vals[2], b: vals[3] })
                    inputRef.current!.setAttribute("value", hexValue)
                } else {
                    console.log("no rule")
                }
            } else {
                console.log({ customPropValue });
                inputRef.current!.setAttribute('value', customPropValue);
                updateParam({ paramName: props.paramName, value: customPropValue })
            }
        })



        function rgbToHex(red: number, green: number, blue: number) {
            function ColorToHex(color: number) {
                var hexadecimal = color.toString(16);
                console.log({ color, hexadecimal })
                return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
            }
            return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
        }


        return <div className={`${styles.menuItem}`}>
            <div className={`${styles.menuItemText}`}>
                {props.text}
            </div>
            <div>
                <input
                    type="color"
                    ref={inputRef}
                    onChange={(windInput) => { updateParam({ paramName: props.paramName, value: windInput.currentTarget.value }) }} />
            </div>
        </div>
    }


    return <div className={`${styles.menuRow}`}>
        <div className={`${styles.search}`}>
            <CitySearch />
        </div>
        <div className={`${styles.menuButton} ${iconClasses}`}
            onClick={showMenu}>
            <MdOutlineSettings />
        </div>
        <div
            className={`${styles.menuContainer}`}
            style={{
                display: !!menuShown ? "block" : "none"
            }}>
            <div className={styles.menuItems}>
                <div className={styles.funcButtons}>
                    <div className={styles.funcBtn}
                        onClick={() => { window.localStorage.clear(); document.location.reload() }}>
                        Сброс настроек
                    </div>
                </div>
                <UpdateParamField text="Фон скорости ветра" paramName='currentWeatherWindBgColor' />
                <UpdateParamField text="Цвет скорости ветра" paramName='currentWeatherWindTextColor' />

                <UpdateParamField text="Фон количества осадков" paramName="currentWeatherPrecipitationBgColor" />
                <UpdateParamField text="Цвет количества осадков" paramName="currentWeatherPrecipitationTextColor" />


                <UpdateParamField text="Фон вероятности осадков" paramName="currentWeatherPrecipitationProbMaxBgColor" />
                <UpdateParamField text="Цвет вероятности осадков" paramName="currentWeatherPrecipitationProbMaxTextColor" />

                <UpdateParamField text="Фон влажности" paramName="currentWeatherHumidityBgColor" />
                <UpdateParamField text="Цвет влажности" paramName="currentWeatherHumidityTextColor" />


                <UpdateParamField text="Цвет температуры" paramName="currentWeatherTempColor" />
                <UpdateParamField text="Цвет градусов цельсия" paramName="currentWeatherCelsiumColor" />

                <UpdateParamField text="Цвет даты" paramName="currentDateTextColor" />

                <UpdateParamField text="Цвет ощущаемой температуры" paramName="currentAppearentWeatherTempTextColor" />

                <UpdateParamField text="Цвет города" paramName="currentWeatherCityColor" />

                <UpdateParamField text="Цвет рассвета" paramName="currentWeatherSunriseColor" />

                <UpdateParamField text="Цвет заката" paramName="currentWeatherSunsetColor" />

                <UpdateParamField text="Цвет иконки погоды" paramName="WeatherCodeIconColor" />

                <UpdateParamField text="Фон карточки погоды" paramName="currentWeatherCardBg" />
            </div>
        </div>
    </div>
}


