import { MMKV } from 'react-native-mmkv'
import stringifySafe from 'json-stringify-safe'
import { isObject } from 'lodash'

export const storage = new MMKV({
    id: `LeaderBoard-storage`,
    encryptionKey: 'hunter2'
})

export const setStorage = (key, value) => {
    try {
        if (isObject(value)) {
            storage.set(key, stringifySafe(value));
        } else {
            storage.set(key, value);
        }
    } catch (error) {
        console.error('ERROR-setStorage', error);
    }
};

export const getStorage = (key, type = 'string') => {
    try {
        let value;
        switch (type) {
            case 'number':
                value = storage.getNumber(key);
                break;
            case 'boolean':
                value = storage.getBoolean(key);
                break;
            case 'string':
            case 'object':
            default:
                value = storage.getString(key);
                break;
        }
        if (value !== null && value !== undefined) {
            if (type === 'object') {
                return JSON.parse(value);
            }
            return value;
        }
    } catch (error) {
        console.error(`ERROR-getStorage-${type}`, error);
    }
}

export const hasStorageKey = (key) => {
    try {
        return storage.contains(key)
    } catch (error) {
        console.error('ERROR-hasStorageKey', error)
    }
}

export const getStorageAllKeys = () => {
    try {
        return storage.getAllKeys()
    } catch (error) {
        console.error('ERROR-getStorageAllKeys', error)
    }
}

export const deleteStorage = (key) => {
    try {
        return storage.delete(key)
    } catch (error) {
        console.error('ERROR-deleteStorage', error)
    }
}

export const clearAllStorage = () => {
    try {
        return storage.clearAll()
    } catch (error) {
        console.error('ERROR-clearAllStorage', error)
    }
}

export const moods = [
    { id: 'happy', label: '😄' },
    { id: 'sad', label: '😢' },
    { id: 'angry', label: '😠' },
    { id: 'calm', label: '😌' },
    { id: 'confused', label: '😕' },
];