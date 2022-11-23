import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
          const item = window.localStorage.getItem(key);
          return item ? JSON.parse(item) : initialValue;
        } catch (errors) {
          console.warn('Setting localStorage went wrong: ', errors);
          return initialValue;
        }
    });
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (errors) {
            console.error(errors);
        }
    }
    return [storedValue, setValue];
}

export default useLocalStorage;
