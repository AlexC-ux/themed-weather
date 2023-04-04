import { MdOutlineSettings } from "react-icons/md"
import { CitySearch } from "../CitySearch"
import styles from "./menu.module.scss"
import { createRef, useState } from "react"


export function Menu() {

    const [menuShown, setMenuShow] = useState(false);

    const [iconClasses, setIconClasses] = useState(`${styles.menuIcon}`)

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

                </div>
        </div>
    </div>
}