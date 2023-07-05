import { PropsWithChildren, useLayoutEffect } from "react";
import { ThemeContext, ThemeContextData } from "./themeContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const initialTheme = "light";
type Themes = "light" | "dark";

export default function ThemeContextProvider({ children }: PropsWithChildren) {
    const [theme, setTheme] = useLocalStorage<Themes>("theme", initialTheme);

    useLayoutEffect(() => {
        if (theme !== "light" && theme !== "dark") {
            setTheme(() => initialTheme);
        }
    }, [setTheme, theme]);

    function switchTheme() {
        if (theme === "light") {
            setTheme(() => "dark");
        } else {
            setTheme(() => "light");
        }
    }

    const value: ThemeContextData = {
        theme: theme as Themes,
        setTheme,
        switchTheme,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}
