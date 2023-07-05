import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";

import ThemeContextProvider from "./contexts/themeContext/themeContextProvide";
import AppRouter from "./AppRouter";

import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ThemeContextProvider>
                    <AppRouter />
                </ThemeContextProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
