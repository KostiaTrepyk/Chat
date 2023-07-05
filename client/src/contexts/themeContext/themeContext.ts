import { createContext } from "react";

export type ThemeContextData = {
    theme: "light" | "dark" | undefined;
    setTheme:
        | React.Dispatch<React.SetStateAction<"light" | "dark">>
        | undefined;
    switchTheme: (() => void) | undefined;
};

const initialData: ThemeContextData = {
    theme: undefined,
    setTheme: undefined,
    switchTheme: undefined,
};

export const ThemeContext = createContext<ThemeContextData>(initialData);
