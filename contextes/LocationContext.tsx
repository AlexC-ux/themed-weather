import { createContext, useEffect, useState } from "react";


export const locationContext = createContext({ location: { longitude: 37.61556, latitude: 55.75222, name: "Москва" }, setLocation: (e: { longitude: number, latitude: number, name: string }) => { } });

export function LocationContextWrapper(props: { children: any }) {
    const [locState, setLocState] = useState({ longitude: 37.61556, latitude: 55.75222, name: "Москва" });

    return <locationContext.Provider value={{ location: locState, setLocation: setLocState }}>
        {props.children}
    </locationContext.Provider>
}