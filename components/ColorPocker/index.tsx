import { ChangeEvent, RefObject, createRef, useEffect, useState } from "react"
import styles from "./colorpicker.module.scss"

import { MdOutlineHideSource as HideIcon } from "react-icons/md";

export function ColorPicker(paramName: string, pickerParams?: { color?: boolean, gradient?: boolean, image?: boolean }) {
    const inputRef = createRef<HTMLInputElement>();

    const [inputValue, setInputValue] = useState("");

    const [sectionsShown, setSectionsShown] = useState(false);

    const [colorShown, setColorShown] = useState(false)
    const [gradShown, setGradShown] = useState(false)
    const [imgShown, setImgShown] = useState(false)

    const colorSoloRef = createRef<HTMLInputElement>();
    const colorSoloAlfaRef = createRef<HTMLInputElement>();

    const gradVal1Ref = createRef<HTMLInputElement>();
    const gradVal2Ref = createRef<HTMLInputElement>();
    const gradVal1AlfaRef = createRef<HTMLInputElement>();
    const gradVal2AlfaRef = createRef<HTMLInputElement>();
    const gradValDegrRef = createRef<HTMLInputElement>();

    function getValueByType(type: 'color' | 'grad1' | 'grad2') {

        if (inputValue != "") {
            if (inputValue.startsWith("rgb")) {

                const numbers = [...inputValue.matchAll(/\d+/gm)]!;
                return rgbToHex(Number(numbers[0]), Number(numbers[0]), Number(numbers[0]))


                function rgbToHex(red: number, green: number, blue: number) {
                    function ColorToHex(color: number) {
                        var hexadecimal = color.toString(16);
                        return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
                    }
                    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
                }
            }
            const matches: any[] = [...inputValue.matchAll(/(#\w*\d*)/g)]!;

            let matchColor = undefined;
            let matchColor2 = undefined;
            if (Array.isArray(matches[0])) {
                matchColor = matches[0][0].substring(0, 7)
                if (matches.length > 1) {
                    matchColor2 = matches[1][0].substring(0, 7)
                }
            }

            console.log(matches)
            console.log(paramName)
            console.log(inputValue)
            console.log({ matchColor, matchColor2 })
            switch (type) {
                case 'color':
                    return matchColor
                case 'grad1':
                    return matchColor
                case 'grad2':
                    return matchColor2 || matchColor
            }
        }
    }

    function UpdateParam() {
        if (inputValue != "") {
            document.documentElement.style.setProperty(`--${paramName}`, inputValue)
            window.localStorage.setItem(`cutom-color-param_${paramName}_`, inputValue)
        }
    }

    useEffect(() => { UpdateParam() }, [inputValue])

    return {
        ref: inputRef,
        setValue: setInputValue,
        element: <div className={styles.pickerBtn}>
            <div className={styles.pickerBtn}
                onClick={() => { setSectionsShown(!sectionsShown) }}
                style={{ background: getValueByType('color') }}>
            </div>
            <div className={styles.pickerContainer}
                style={{
                    display: sectionsShown ? "flex" : "none"
                }}>
                <div className={styles.pickerHideBtn}
                    onClick={() => { setSectionsShown(false); }}>
                    <HideIcon />
                </div>
                <div className={styles.pickerSection}
                    style={!pickerParams?.color==false ? { display: "none" } : {}}
                    onClick={() => { setColorShown(!colorShown); setSectionsShown(false); }}>
                    Цвет
                </div>
                <div className={styles.pickerSection}
                    style={!pickerParams?.gradient==false ? { display: "none" } : {}}
                    onClick={() => { setGradShown(!gradShown); setSectionsShown(false); }}>
                    Градиент
                </div>
                <div className={styles.pickerSection}
                    style={!pickerParams?.image==false ? { display: "none" } : {}}
                    onClick={() => { setImgShown(!imgShown); setSectionsShown(false); }}>
                    Ссылка на изображение
                </div>
            </div>




            <div className={styles.pickerContainer}
                style={{
                    display: colorShown ? "flex" : "none"
                }}>
                <div className={styles.pickerHideBtn}
                    onClick={() => { setColorShown(false) }}>
                    <HideIcon />
                </div>
                <div className={`${styles.pickerContent}`}>
                    <input
                        value={getValueByType("color")}
                        className={styles.pickerColorSelector}
                        type="color"
                        ref={colorSoloRef}
                        onChange={(colorEv) => {
                            const alfa = getAlfaFromString(colorSoloAlfaRef.current!.value)
                            setInputValue(`${colorEv.currentTarget.value}${alfa}`)
                        }} />
                    <input
                        ref={colorSoloAlfaRef}
                        className={styles.pickerColorAlfaSelector}
                        type="number"
                        placeholder="Alfa (0-255)"
                        onChange={(colorAlfaEv) => {
                            const alfa = getAlfaFromString(colorAlfaEv.currentTarget.value)
                            setInputValue(`${colorSoloRef.current!.value}${alfa}`)
                        }} />
                </div>

            </div>
            <div className={styles.pickerContainer}
                style={{
                    display: gradShown ? "flex" : "none"
                }}>
                <div className={styles.pickerHideBtn}
                    onClick={() => { setGradShown(false) }}>
                    <HideIcon />
                </div>
                <div className={`${styles.pickerContent}`}>
                    <div className={styles.inputRow}>
                        <input
                            ref={gradVal1Ref}
                            className={styles.pickerColorSelector}
                            type="color"
                            value={getValueByType('grad1')}
                            onChange={(colorEv) => {
                                const alfa = getAlfaFromString(gradVal1AlfaRef.current!.value)
                                const alfa2 = getAlfaFromString(gradVal2AlfaRef.current!.value)
                                setInputValue(`linear-gradient(${gradValDegrRef.current!.value.length > 0 ? `${gradValDegrRef.current!.value}deg, ` : "0deg, "}${colorEv.currentTarget.value}${alfa}, ${gradVal2Ref.current!.value}${alfa2})`)
                            }} />
                        <input
                            ref={gradVal1AlfaRef}
                            className={styles.pickerColorAlfaSelector}
                            type="number"
                            placeholder="Alfa (0-255)"
                            onChange={(colorAlfaEv) => {
                                const alfa = getAlfaFromString(colorAlfaEv.currentTarget.value)
                                const alfa2 = getAlfaFromString(gradVal2AlfaRef.current!.value)
                                setInputValue(`linear-gradient(${gradValDegrRef.current!.value.length > 0 ? `${gradValDegrRef.current!.value}deg, ` : "0deg, "}${gradVal1Ref.current!.value}${alfa}, ${gradVal2Ref.current!.value}${alfa2})`)
                            }} />
                    </div>
                    <div className={styles.inputRow}>
                        <input
                            ref={gradVal2Ref}
                            className={styles.pickerColorSelector}
                            type="color"
                            value={getValueByType('grad2')}
                            onChange={(colorEv) => {
                                const alfa = getAlfaFromString(gradVal2AlfaRef.current!.value)
                                const alfa1 = getAlfaFromString(gradVal1AlfaRef.current!.value)
                                setInputValue(`linear-gradient(${gradValDegrRef.current!.value.length > 0 ? `${gradValDegrRef.current!.value}deg, ` : "0deg, "}${gradVal1Ref.current!.value}${alfa1}, ${colorEv.currentTarget.value}${alfa})`)
                            }} />
                        <input
                            ref={gradVal2AlfaRef}
                            className={styles.pickerColorAlfaSelector}
                            type="number"
                            placeholder="Alfa (0-255)"
                            onChange={(colorAlfaEv) => {
                                const alfa = getAlfaFromString(colorAlfaEv.currentTarget.value)
                                const alfa1 = getAlfaFromString(gradVal1AlfaRef.current!.value)
                                setInputValue(`linear-gradient(${gradValDegrRef.current!.value.length > 0 ? `${gradValDegrRef.current!.value}deg, ` : "0deg, "}${gradVal1Ref.current!.value}${alfa1}, ${gradVal2Ref.current!.value}${alfa})`)
                            }}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <input
                            ref={gradValDegrRef}
                            className={styles.pickerColorAlfaSelector}
                            type="number"
                            placeholder="Поворот (180)"
                            onChange={(gradEv) => {
                                const alfa1 = getAlfaFromString(gradVal1AlfaRef.current!.value)
                                const alfa2 = getAlfaFromString(gradVal2AlfaRef.current!.value)
                                setInputValue(`linear-gradient(${gradEv.currentTarget.value.length > 0 ? `${gradValDegrRef.current!.value}deg, ` : "0deg, "}${gradVal1Ref.current!.value}${alfa1}, ${gradVal2Ref.current!.value}${alfa2})`)
                            }} />
                    </div>
                </div>
            </div>
            <div className={styles.pickerContainer}
                style={{
                    display: imgShown ? "flex" : "none"
                }}>
                <div className={styles.pickerHideBtn}
                    onClick={() => { setImgShown(false) }}>
                    <HideIcon />
                </div>
                <div className={`${styles.pickerContent}`}>
                    <div className={styles.inputRow}>
                        <input
                            className={styles.pickerColorAlfaSelector}
                            type="text"
                            placeholder="Ссылка на картинку"
                            onChange={(imgEv) => {
                                setInputValue(`url('${imgEv.currentTarget.value}')`)
                            }} />
                    </div>
                </div>
            </div>
            <input type="text" hidden ref={inputRef} value={inputValue} onChange={() => { }} />
        </div>
    }
}

function getAlfaFromString(value: string) {
    let alfa = "ff"
    let val = value;
    const valNumber = Number(val);
    if (val?.length > 0) {
        if (valNumber >= 16) {
            alfa = Number(val).toString(16);
        } else {
            if (valNumber < 10) {
                alfa = `0${val}`
            } else {
                alfa = val
            }
        }
    }
    return alfa
}