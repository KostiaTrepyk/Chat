import { useState } from "react";

/**
 * Returns value type of boolean and it's toggler
 */
export default function useToggle(
    initialValue: boolean
): [boolean, (value?: boolean) => void] {
    const [value, setValue] = useState<boolean>(initialValue);

    function toggle(newValue?: boolean) {
        if (newValue) setValue(newValue);
        else setValue(!value);
    }

    return [value, toggle];
}
