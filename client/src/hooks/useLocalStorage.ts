import { useEffect, useState } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [unknown, React.Dispatch<React.SetStateAction<T>>] {
    const storage = () => {
        const storageData = localStorage.getItem(key);
        if (storageData) {
            try {
                return JSON.parse(storageData);
            } catch (error) {
                localStorage.setItem(key, JSON.stringify(initialValue));
                console.log(error, 'useLocalStorage hook!');
            }
        }
        return initialValue;
    };

    const [value, setValue] = useState<T>(storage);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}
