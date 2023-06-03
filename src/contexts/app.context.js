import React, { createContext, useContext, useEffect, useState } from "react";
import { isUndefined } from "lodash";
import { setStorage, getStorage, hasStorageKey, getStorageAllKeys, deleteStorage, clearAllStorage } from '../helpers/common';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        runLocalStorage()
    }, [])

    const runLocalStorage = async () => {
        try {
            const data = await getStorage(`data`, 'object')

            setData(!isUndefined(data) ? data : null)
        } catch (error) {
            console.error('ERROR-runLocalStorage-app', error)
        }
    }

    const providerMethods = {
        getData: data,
        setData: (data) => {
            setData(data);
            if (data === null) {
                deleteStorage(`data`);
            } else {
                setStorage(`data`, data);
            }
        },
    }

    return <AppContext.Provider value={providerMethods}>{children}</AppContext.Provider>

}

export const useApp = () => useContext(AppContext)