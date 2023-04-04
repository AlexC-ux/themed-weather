import { createContext, useEffect, useState } from "react";


export const locationContext = createContext({ location: { longitude: 37.61556, latitude: 55.75222, name: "Москва" }, setLocation: (e: { longitude: number, latitude: number, name: string }) => { } });

export function LocationContextWrapper(props: { children: any }) {
    const [locState, setLocState] = useState({ longitude: 37.61556, latitude: 55.75222, name: "Москва" });

    useEffect(() => {
        const city = window.localStorage.getItem("last_city")
        if (!!city) {
            setLocState({latitude:Number(city.split("_")[0]), longitude:Number(city.split("_")[1]), name:city.split("_")[2]})
        }
    })

    return <locationContext.Provider value={{ location: locState, setLocation: setLocState }}>
        {props.children}
    </locationContext.Provider>
}