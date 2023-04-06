'use-client'
import { MdOutlineSettings } from "react-icons/md"
import { CitySearch } from "../CitySearch"
import styles from "./menu.module.scss"
import { createRef, useEffect, useState } from "react"
import { ColorPicker } from "../ColorPocker"
import { SetGirlPreset, setBrigdeOverRiverPreset, setCatShopPresets } from "@/presets"


type cssParamType = 'searchResultBg' | 'serachBackground' | 'currentWeatherCardBg' | 'currentWeatherCityColor'
    | 'currentWeatherTempColor' | 'currentWeatherCardShadow' | 'currentDateTextColor' |
    'currentWeatherSunriseColor' | 'currentWeatherSunsetColor' | 'currentAppearentWeatherTempTextColor' |
    'currentWeatherWindTextColor' | 'currentWeatherWindBgColor' | 'WeatherCodeIconColor' | 'currentWeatherPrecipitationBgColor'
    | 'currentWeatherPrecipitationTextColor' | 'currentWeatherPrecipitationProbMaxBgColor' |
    'currentWeatherHumidityBgColor' | 'currentWeatherHumidityTextColor' | 'currentWeatherCelsiumColor' |
    'BGCOLOR' | 'currentWeatherPrecipitationProbMaxTextColor' | 'hourlyCardBg' | 'hourlyDateText' | 'hourlyTempText' |
    'hourlyAppearentTempText' | 'hourlyHumidityText' | 'hourlyWeathercode'|'hourlyScrollColor'|'hourlyScrollThumbColor'

export function Menu() {

    const [menuShown, setMenuShow] = useState(false);

    const [iconClasses, setIconClasses] = useState(`${styles.menuIcon}`);

    function showMenu() {
        if (!menuShown) {
            setMenuShow(!menuShown)
            document.body.style.overflowY="hidden"
            setIconClasses(`${styles.menuIcon} ${styles.menuOpened}`)
        } else {
            setMenuShow(!menuShown)
            document.body.style.overflowY="scroll";
            setIconClasses(`${styles.menuIcon}`)
        }
    }


    function UpdateParamField(props: { text: string, paramName: cssParamType,pickerParams?:{color?:boolean,gradient?:boolean,image?:boolean} }) {


        const picker = ColorPicker(props.paramName, props.pickerParams)

        useEffect(() => {
            const propValue: string = getComputedStyle(document.documentElement).getPropertyValue(`--${props.paramName}`).trim();
            const customPropValue: string | null = window.localStorage.getItem(`cutom-color-param_${props.paramName}_`);

            if (customPropValue == null) {
                picker.setValue(propValue)
            } else {
                picker.setValue(customPropValue);
            }
        })


        return <div className={`${styles.menuItem}`}>
            <div className={`${styles.menuItemText}`}>
                {props.text}
            </div>
            <div>
                {picker.element}
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
                display: !!menuShown ? "block" : "none",
            }}>
            <div className={styles.menuItems}>
                <div className={styles.funcButtons}>
                    <div className={styles.funcBtn}
                        onClick={() => { window.localStorage.clear(); document.location.reload(); }}>
                        Сброс настроек
                    </div>
                </div>

                <div className={styles.settingsCategory}>Настройки карточки</div>
                <UpdateParamField text="Фон скорости ветра" paramName='currentWeatherWindBgColor'/>
                <UpdateParamField text="Цвет скорости ветра" paramName='currentWeatherWindTextColor'  pickerParams={{gradient:false, image:false}}/>

                <UpdateParamField text="Фон количества осадков" paramName="currentWeatherPrecipitationBgColor" />
                <UpdateParamField text="Цвет количества осадков" paramName="currentWeatherPrecipitationTextColor"  pickerParams={{gradient:false, image:false}}/>


                <UpdateParamField text="Фон вероятности осадков" paramName="currentWeatherPrecipitationProbMaxBgColor" />
                <UpdateParamField text="Цвет вероятности осадков" paramName="currentWeatherPrecipitationProbMaxTextColor"  pickerParams={{gradient:false, image:false}}/>

                <UpdateParamField text="Фон влажности" paramName="currentWeatherHumidityBgColor" />
                <UpdateParamField text="Цвет влажности" paramName="currentWeatherHumidityTextColor"  pickerParams={{gradient:false, image:false}}/>


                <UpdateParamField text="Цвет температуры" paramName="currentWeatherTempColor"  pickerParams={{gradient:false, image:false}}/>
                <UpdateParamField text="Цвет градусов цельсия" paramName="currentWeatherCelsiumColor"  pickerParams={{gradient:false, image:false}}/>

                <UpdateParamField text="Цвет даты" paramName="currentDateTextColor"  pickerParams={{gradient:false, image:false}}/>

                <UpdateParamField text="Цвет ощущаемой температуры" paramName="currentAppearentWeatherTempTextColor" pickerParams={{gradient:false, image:false}} />

                <UpdateParamField text="Цвет города" paramName="currentWeatherCityColor"  pickerParams={{gradient:false, image:false}}/>

                <UpdateParamField text="Цвет рассвета" paramName="currentWeatherSunriseColor"  pickerParams={{gradient:false, image:false}}/>

                <UpdateParamField text="Цвет заката" paramName="currentWeatherSunsetColor"  pickerParams={{gradient:false, image:false}}/>

                <UpdateParamField text="Цвет иконки погоды" paramName="WeatherCodeIconColor"  pickerParams={{gradient:false, image:false}}/>

                <UpdateParamField text="Фон карточки погоды" paramName="currentWeatherCardBg" />

                <div className={styles.settingsCategory}>Настройки почасовых данных</div>
                <UpdateParamField text="Фон почасовой погоды" paramName='hourlyCardBg' />
                <UpdateParamField text="Цвет почасовой температуры" paramName='hourlyTempText' pickerParams={{gradient:false, image:false}} />
                <UpdateParamField text="Цвет почасовой влажности" paramName='hourlyHumidityText'  pickerParams={{gradient:false, image:false}}/>
                <UpdateParamField text="Цвет почасовой иконки" paramName='hourlyWeathercode'  pickerParams={{gradient:false, image:false}}/>
                <UpdateParamField text="Цвет почасовой ощущаемой температуры" paramName='hourlyAppearentTempText'  pickerParams={{gradient:false, image:false}}/>
                <UpdateParamField text="Цвет почасовой даты" paramName='hourlyDateText'  pickerParams={{gradient:false, image:false}}/>

                <div className={styles.settingsCategory}>Другие настройки</div>
                <UpdateParamField text="Фон" paramName='BGCOLOR' />
                <UpdateParamField text="Прокрутка почасовой погоды" paramName='hourlyScrollColor'  pickerParams={{gradient:false, image:false}}/>
                <UpdateParamField text="Ползунок прокрутки почасовой погоды" paramName='hourlyScrollThumbColor'  pickerParams={{gradient:false, image:false}}/>

                <div className={styles.settingsCategory}>Заготовленные пресеты</div>
                <div className={styles.funcButtons}
                    style={{ height: 'auto' }}>
                    <div
                        style={{
                            background: "#fe73f2",
                        }}
                        className={styles.funcBtn}
                        onClick={SetGirlPreset}>
                        гёрл пресет
                    </div>

                    <div
                        style={{
                            background: "#82a0e5",
                        }}
                        className={styles.funcBtn}
                        onClick={setCatShopPresets}>
                        кошачья лавка
                    </div>

                    <div
                        style={{
                            background: "#82a0e5",
                        }}
                        className={styles.funcBtn}
                        onClick={setBrigdeOverRiverPreset}>
                        мостик у берега
                    </div>
                </div>
            </div>
        </div>
    </div>
}


