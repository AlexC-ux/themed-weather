import { ChangeEvent, RefObject, createRef, useEffect, useState } from "react"
import styles from "./colorpicker.module.scss"

import { MdOutlineHideSource as HideIcon } from "react-icons/md";

export function ColorPicker(paramName: string) {
    const inputRef = createRef<HTMLInputElement>();

    const [inputValue, setInputValue] = useState("");

    const [sectionsShown, setSectionsShown] = useState(false);

    const [colorShown, setColorShown] = useState(false)
    const [gradShown, setGradShown] = useState(false)

    const gradVal1Ref = createRef<HTMLInputElement>();
    const gradVal2Ref = createRef<HTMLInputElement>();
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
            const matches = [...inputValue.matchAll(/(#\w*\d*)/g)]!;

            let matchColor = undefined;
            let matchColor2 = undefined;
            if (Array.isArray(matches[0])) {
                matchColor = matches[0][0]
                if (matches.length > 1) {
                    matchColor2 = matches[1][0]
                }
            } else {
                matchColor = matches[0]
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
                style={{background:getValueByType('color')}}>
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
                    onClick={() => { setColorShown(!colorShown); setSectionsShown(false); }}>
                    Цвет
                </div>
                <div className={styles.pickerSection}
                    onClick={() => { setGradShown(!gradShown); setSectionsShown(false); }}>
                    Градиент
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
                        onChange={(colorEv) => {
                            setInputValue(colorEv.currentTarget.value)
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
                    <input
                        ref={gradVal1Ref}
                        className={styles.pickerColorSelector}
                        type="color"
                        value={getValueByType('grad1')}
                        onChange={(colorEv) => {
                            setInputValue(`linear-gradient(${gradValDegrRef.current!.value.length > 0 ? `${gradValDegrRef.current!.value}deg, ` : "0deg, "}${colorEv.currentTarget.value}, ${gradVal2Ref.current!.value})`)
                        }} />
                    <input
                        ref={gradVal2Ref}
                        className={styles.pickerColorSelector}
                        type="color"
                        value={getValueByType('grad2')}
                        onChange={(colorEv) => {
                            setInputValue(`linear-gradient(${gradValDegrRef.current!.value.length > 0 ? `${gradValDegrRef.current!.value}deg, ` : "0deg, "}${gradVal1Ref.current!.value}, ${colorEv.currentTarget.value})`)
                        }} />
                    <input
                        ref={gradValDegrRef}
                        className={styles.pickerColorSelector}
                        type="number"
                        placeholder="90"
                        onChange={(gradEv) => {
                            console.log({ gradEv })
                            gradEv.currentTarget.value = gradEv.currentTarget.value;
                            setInputValue(`linear-gradient(${gradEv.currentTarget.value.length > 0 ? `${gradValDegrRef.current!.value}deg, ` : "0deg, "}${gradVal1Ref.current!.value}, ${gradVal2Ref.current!.value})`)
                        }} />
                </div>
            </div>
            <input type="text" hidden ref={inputRef} value={inputValue} onChange={() => { }} />
        </div>
    }
}